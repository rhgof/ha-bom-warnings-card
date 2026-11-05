import { LitElement, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import "./bom-warnings-card-editor";

// The shape of a `warnings` item on the integration's count sensor. The integration's tests check
// the shared fixture against what it really produces, so these names cannot drift unnoticed.
interface Warning {
  event: string;
  headline: string;
  level?: string;
  phase?: string;
  icon?: string;
  color?: string;
  area?: string;
  summary?: string;
}

interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

interface Hass {
  states: Record<string, HassState | undefined>;
}

interface Config {
  type: string;
  entity: string;
  title?: string;
  show_headline?: boolean;
  show_area?: boolean;
  show_summary?: boolean;
  show_level?: boolean;
}

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string }[];
  }
}

const ENDED = ["final", "cancelled"];

export class BomWarningsCard extends LitElement {
  // Declared this way, not with decorators, so the build needs no decorator settings.
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _summaries: { state: true },
  };

  hass?: Hass;
  _config?: Config;
  // Whether the summaries are open right now. A tap flips it. It is not saved, so a reload goes
  // back to what `show_summary` says.
  _summaries = true;

  static getConfigElement(): HTMLElement {
    return document.createElement("bom-warnings-card-editor");
  }

  static getStubConfig(hass?: Hass): Partial<Config> {
    // The location with the most warnings, so a new card has something to show, else the first
    // one: the order Home Assistant lists entities in means nothing, so "first" alone is
    // arbitrary. A tie goes to the one listed first.
    const counts = Object.keys(hass?.states ?? {}).filter((id) => id.endsWith("_warning_count"));
    const warnings = (id: string) => Number(hass?.states[id]?.state) || 0;
    const most = counts.reduce<string | undefined>(
      (best, id) => (warnings(id) > (best ? warnings(best) : 0) ? id : best),
      undefined,
    );
    return { entity: most ?? counts[0] ?? "" };
  }

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("Set an entity, such as sensor.home_warning_count");
    }
    this._config = config;
    // A changed config, such as the editor's summary switch, wins over an earlier tap.
    this._summaries = config.show_summary !== false;
  }

  getCardSize(): number {
    return 3;
  }

  // Only a card with a summary to open or close is a button, because a tap on any other would
  // seem to do nothing.
  _warnings(): Warning[] {
    const entity = this._config && this.hass?.states[this._config.entity];
    if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
      return [];
    }
    return (entity.attributes.warnings as Warning[] | undefined) ?? [];
  }

  _toggle = (): void => {
    this._summaries = !this._summaries;
  };

  _key = (event: KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._toggle();
    }
  };

  _shell(header: string, body: unknown, toggles: boolean) {
    return html`<ha-card
      header=${header}
      class=${toggles ? "toggles" : ""}
      role=${toggles ? "button" : nothing}
      tabindex=${toggles ? "0" : nothing}
      aria-expanded=${toggles ? String(this._summaries) : nothing}
      @click=${toggles ? this._toggle : nothing}
      @keydown=${toggles ? this._key : nothing}
      >${body}</ha-card
    >`;
  }

  render() {
    const config = this._config;
    if (!config) {
      return nothing;
    }
    const header = config.title ?? "Warnings";
    const entity = this.hass?.states[config.entity];
    if (!entity) {
      return this._shell(
        header,
        html`<div class="note">Entity not found: ${config.entity}</div>`,
        false,
      );
    }
    if (entity.state === "unavailable" || entity.state === "unknown") {
      return this._shell(header, html`<div class="note">${entity.state}</div>`, false);
    }
    const warnings = this._warnings();
    return this._shell(
      header,
      warnings.length === 0
        ? html`<div class="note">No warnings for this location.</div>`
        : html`<div class="list">${warnings.map((w) => this._row(w, config))}</div>`,
      warnings.some((w) => w.summary),
    );
  }

  _row(w: Warning, config: Config) {
    const ended = ENDED.includes(w.phase ?? "");
    const detail = [w.level, ended ? w.phase : undefined].filter(Boolean).join(", ");
    return html`<div class="warning ${ended ? "ended" : ""}">
      <ha-icon
        icon=${w.icon ?? "mdi:alert"}
        style=${styleMap({ color: w.color ?? "var(--secondary-text-color)" })}
      ></ha-icon>
      <div class="detail">
        <div class="title">
          <span class="event">${w.event}</span>
          ${config.show_level !== false && detail
            ? html`<span class="level">(${detail})</span>`
            : nothing}
        </div>
        ${config.show_headline !== false
          ? html`<div class="headline">${w.headline}</div>`
          : nothing}
        ${config.show_area !== false && w.area ? html`<div class="area">${w.area}</div>` : nothing}
        ${this._summaries && w.summary ? html`<div class="summary">${w.summary}</div>` : nothing}
      </div>
    </div>`;
  }

  static styles = css`
    .list {
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-card.toggles {
      cursor: pointer;
    }
    ha-card.toggles:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .note {
      padding: 0 16px 16px;
      color: var(--secondary-text-color);
    }
    .warning {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .warning.ended {
      opacity: 0.6;
    }
    ha-icon {
      flex: none;
      --mdc-icon-size: 28px;
    }
    .event {
      font-weight: 500;
    }
    .level,
    .area,
    .summary {
      color: var(--secondary-text-color);
    }
    .area,
    .summary {
      font-size: 0.9em;
    }
  `;
}

customElements.define("bom-warnings-card", BomWarningsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bom-warnings-card",
  name: "BoM Warnings",
  description: "Current Bureau of Meteorology warnings for a location, most severe first.",
});
