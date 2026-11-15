import { LitElement, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { detailView, type DetailView, type Locale } from "./detail-view";

// Wraps Home Assistant's own tile card and sets its colour from the sensor's `color` attribute.
// The tile gives the rest for free: tapping opens the entity's more-info (history and activity),
// and its editor has every option a tile has. Two Home Assistant internals are relied on,
// `loadCardHelpers()` and the `hui-tile-card` element with its `getConfigElement()`, so a Home
// Assistant upgrade is a reason to check this card.

interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

interface Hass extends Locale {
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

// A warning sensor (per-type or Most severe) lists its warnings and has a level. A fire danger
// rating has no warnings list and no headline of its own to show.
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
        state?.attributes.level !== undefined &&
        Array.isArray(state.attributes.warnings),
    );
    // The integration's rank is a number while a warning is in force and absent otherwise.
    const rank = (state?: HassState) =>
      typeof state?.attributes.rank === "number" ? state.attributes.rank : -1;
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

  // A sensor that asks for the detail layout is drawn by this card, because the built-in tile can
  // show an attribute as it is but not build "Damaging winds · Large hail" or "Update due by 3:10
  // pm". Every other sensor, and every state without a warning, is the built-in tile.
  private _detail(): DetailView | undefined {
    const entity = this._config?.entity;
    return entity && this.hass ? detailView(this.hass.states[entity], this.hass) : undefined;
  }

  getCardSize(): number {
    if (this._detail()) {
      return 3;
    }
    const size = this._tile?.getCardSize?.();
    return typeof size === "number" ? size : 1;
  }

  getGridOptions(): Record<string, unknown> {
    if (this._detail()) {
      return { columns: 6, min_columns: 4, rows: "auto" };
    }
    return this._tile?.getGridOptions?.() ?? DEFAULT_GRID;
  }

  private _open = (): void => {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config?.entity },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _key = (event: KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._open();
    }
  };

  private _detailTile(view: DetailView) {
    const color = view.color ?? "var(--secondary-text-color)";
    return html`<ha-card
      class="detail-tile"
      role="button"
      tabindex="0"
      @click=${this._open}
      @keydown=${this._key}
    >
      <div class="body">
        <span
          class="icon"
          style=${styleMap({ background: `color-mix(in srgb, ${color} 20%, transparent)` })}
        >
          <ha-icon icon=${view.icon} style=${styleMap({ color })}></ha-icon>
        </span>
        <div class="detail">
          <div class="heading">
            <span class="title">${view.title}</span>
            ${view.badges.length
              ? html`<span class="badges"
                  >${view.badges.map((b) => html`<span class="badge">${b}</span>`)}</span
                >`
              : nothing}
          </div>
          ${view.hazards ? html`<div class="hazards">${view.hazards}</div>` : nothing}
          ${view.summary ? html`<div class="summary">${view.summary}</div>` : nothing}
          ${view.footer ? html`<div class="footer">${view.footer}</div>` : nothing}
        </div>
      </div>
    </ha-card>`;
  }

  updated(): void {
    void this._sync();
  }

  // The title the integration sends, which has the level in front ("Severe Heatwave warning") and
  // is empty while no warning is in force. Never over a name the editor set.
  private _title(config: Config, hass: Hass): string | undefined {
    const title = hass.states[config.entity]?.attributes.title;
    return typeof title === "string" && title ? title : undefined;
  }

  // The tile config the card wants now. Defaults come first so anything the editor set wins: the
  // name is the entity's alone, and a warning sensor shows its headline. On top go the sensor's
  // colour and, while a warning is active, its title in the name.
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
    const view = this._detail();
    return view ? this._detailTile(view) : (this._tile ?? nothing);
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card.detail-tile {
      cursor: pointer;
      height: 100%;
    }
    ha-card.detail-tile:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .body {
      display: flex;
      gap: 12px;
      padding: 12px;
      align-items: flex-start;
    }
    .icon {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .heading {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 8px;
    }
    .title {
      font-weight: 500;
    }
    .badges {
      display: inline-flex;
      gap: 4px;
    }
    .badge {
      font-size: 0.75em;
      font-weight: 500;
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
    }
    .hazards {
      font-weight: 500;
    }
    .summary,
    .footer {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .footer {
      margin-top: 4px;
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
