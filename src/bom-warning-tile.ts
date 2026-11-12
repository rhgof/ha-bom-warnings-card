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
  // The registry's display entries. `name` is the entity's own name, without its device's.
  entities?: Record<string, { name?: string } | undefined>;
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

// How a level reads at the front of a tile's name. Only these states are levels: `none` and the
// like have no warning to describe, and the Most severe sensor's state is a headline.
const LEVEL_WORDS: Record<string, string> = {
  minor: "Minor",
  moderate: "Moderate",
  unrated: "Unrated",
  severe: "Severe",
  extreme: "Extreme",
};

// The tile's Name field set to "Entity": the sensor's own name, without the location's name that the
// tile puts in front of it when left alone. A single non-text item is stored as the item itself.
const ENTITY_NAME = { type: "entity" };

// What a warning sensor's tile shows beside its level: the headline of the warning.
const WARNING_CONTENT = ["state", "headline"];

// Whether a name is the Entity default, which the level may still be put in front of, rather than
// one the user chose (their own text, or a device or area name), which is shown as it is.
function isEntityName(name: unknown): boolean {
  if (name === undefined) {
    return true;
  }
  const item = name as { type?: unknown };
  return typeof name === "object" && name !== null && !Array.isArray(name) &&
    item.type === "entity" && Object.keys(item).length === 1;
}

// A per-type warning sensor lists its warnings and has a level. The Most severe sensor has no level,
// and a fire danger rating has no warnings list, and neither has a headline of its own to show.
function isTypeSensor(state: HassState | undefined): boolean {
  return Array.isArray(state?.attributes.warnings) && state?.attributes.level !== undefined;
}

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
    if (!best) {
      return { entity: "" };
    }
    // The defaults are in the config as well as applied at display time, so the editor shows them.
    return { entity: best[0], name: ENTITY_NAME, state_content: WARNING_CONTENT };
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

  // The name with the level in front, such as "Severe Heatwave warning", so the title says how bad
  // the warning is where the colour alone cannot. Nothing when the sensor has no level or no name
  // to build on, and never over a name the editor set.
  private _title(config: Config, hass: Hass): string | undefined {
    const state = hass.states[config.entity];
    // Only a warning sensor, which lists its warnings, has a warning level for a state. A fire
    // danger rating has its own words, and two of them, moderate and extreme, look like levels.
    const level = Array.isArray(state?.attributes.warnings) ? LEVEL_WORDS[state?.state ?? ""] : undefined;
    const friendly = state?.attributes.friendly_name;
    const name = hass.entities?.[config.entity]?.name || (typeof friendly === "string" ? friendly : "");
    return level && name ? `${level} ${name}` : undefined;
  }

  // The tile config the card wants now. Defaults come first so anything the editor set wins: the
  // name is the entity's alone, and a warning sensor shows its headline. On top go the sensor's
  // colour and, while a warning is active, the level in the name.
  private _tileConfig(config: Config, hass: Hass): Record<string, unknown> {
    const state = hass.states[config.entity];
    const colour = state?.attributes.color;
    const title = isEntityName(config.name) ? this._title(config, hass) : undefined;
    return {
      name: ENTITY_NAME,
      ...(isTypeSensor(state) ? { state_content: WARNING_CONTENT } : {}),
      ...config,
      type: "tile",
      ...(typeof colour === "string" && colour ? { color: colour } : {}),
      ...(title ? { name: title } : {}),
    };
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
