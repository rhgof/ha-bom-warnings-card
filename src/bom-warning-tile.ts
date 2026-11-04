import { LitElement, css, nothing } from "lit";

// Wraps Home Assistant's own tile card and sets its colour from the sensor's `color` attribute.
// The tile gives the rest for free: tapping opens the entity's more-info (history and activity),
// and its editor has every option a tile has. Two Home Assistant internals are relied on,
// `loadCardHelpers()` and the `hui-tile-card` element with its `getConfigElement()`, so a Home
// Assistant upgrade is a reason to check this card.

interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

interface Hass {
  states: Record<string, HassState | undefined>;
}

interface TileElement extends HTMLElement {
  hass?: Hass;
  setConfig(config: Record<string, unknown>): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): Record<string, unknown>;
}

interface Config {
  type: string;
  entity: string;
  [option: string]: unknown;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{
      createCardElement(config: Record<string, unknown>): TileElement;
    }>;
    customCards?: { type: string; name: string; description: string }[];
  }
}

// A sensor's state is its level. `none` and anything else (unavailable, unknown) rank lowest.
const LEVEL_RANK: Record<string, number> = { extreme: 4, severe: 3, moderate: 2, unrated: 2, minor: 1 };

// The tile's own default size, used until the tile exists to say.
const DEFAULT_GRID = { columns: 6, rows: 1 };

export class BomWarningTile extends LitElement {
  // Declared this way, not with decorators, so the build needs no decorator settings.
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _tile: { state: true },
  };

  hass?: Hass;
  _config?: Config;
  _tile?: TileElement;

  private _last = "";
  private _making?: Promise<void>;

  // The tile's editor, so the card has every option the tile has. It rejects config keys it does
  // not know, so this card has no options of its own.
  static async getConfigElement(): Promise<HTMLElement> {
    const helpers = await window.loadCardHelpers?.();
    helpers?.createCardElement({ type: "tile", entity: "sensor.x" });
    await customElements.whenDefined("hui-tile-card");
    const tile = customElements.get("hui-tile-card") as unknown as {
      getConfigElement(): Promise<HTMLElement>;
    };
    return tile.getConfigElement();
  }

  // A new card starts on the most severe sensor that has a warning, so there is something to see,
  // and on the first sensor when none has. Home Assistant lists entities in no useful order, so
  // "first" alone would start every card on the same, arbitrary location.
  static getStubConfig(hass?: Hass): Partial<Config> {
    const sensors = Object.entries(hass?.states ?? {}).filter(
      ([id, state]) =>
        id.startsWith("sensor.") &&
        id.endsWith("_warning") &&
        !id.endsWith("_most_severe_warning") &&
        state?.attributes.level !== undefined &&
        Array.isArray(state.attributes.warnings),
    );
    const rank = (state?: HassState) => LEVEL_RANK[state?.state ?? ""] ?? 0;
    const [best] = [...sensors].sort(([, a], [, b]) => rank(b) - rank(a));
    return { entity: best?.[0] ?? "" };
  }

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("Set an entity, such as sensor.home_thunderstorm_warning");
    }
    this._config = config;
  }

  getCardSize(): number {
    const size = this._tile?.getCardSize?.();
    return typeof size === "number" ? size : 1;
  }

  getGridOptions(): Record<string, unknown> {
    return this._tile?.getGridOptions?.() ?? DEFAULT_GRID;
  }

  updated(): void {
    void this._sync();
  }

  // The tile config the card wants now: whatever the editor set, with the sensor's colour on top
  // while a warning is active. With no colour the tile keeps the editor's, or its own default.
  private _tileConfig(config: Config, hass: Hass): Record<string, unknown> {
    const colour = hass.states[config.entity]?.attributes.color;
    return { ...config, type: "tile", ...(typeof colour === "string" && colour ? { color: colour } : {}) };
  }

  private async _sync(): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    if (!config || !hass) {
      return;
    }
    if (!this._tile) {
      this._making ??= this._make(this._tileConfig(config, hass));
      await this._making;
    }
    const tile = this._tile;
    if (!tile) {
      return;
    }
    const tileConfig = this._tileConfig(config, hass);
    const key = JSON.stringify(tileConfig);
    if (key !== this._last) {
      this._last = key;
      tile.setConfig(tileConfig);
    }
    tile.hass = hass;
  }

  private async _make(tileConfig: Record<string, unknown>): Promise<void> {
    const helpers = await window.loadCardHelpers?.();
    if (!helpers) {
      return;
    }
    this._last = JSON.stringify(tileConfig);
    this._tile = helpers.createCardElement(tileConfig);
  }

  render() {
    return this._tile ?? nothing;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}

customElements.define("bom-warning-tile", BomWarningTile);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bom-warning-tile",
  name: "BoM Warning Tile",
  description: "One warning type as a tile, with its icon in the colour of the current severity.",
});
