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
  show_summary?: boolean;
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
  };

  hass?: Hass;
  _config?: Config;

  static getConfigElement(): HTMLElement {
    return document.createElement("bom-warnings-card-editor");
  }

  static getStubConfig(hass?: Hass): Partial<Config> {
    const count = Object.keys(hass?.states ?? {}).find((id) => id.endsWith("_warning_count"));
    return { entity: count ?? "" };
  }

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new Error("Set an entity, such as sensor.home_warning_count");
    }
    this._config = config;
  }

  getCardSize(): number {
    return 3;
  }

  render() {
    const config = this._config;
    if (!config) {
      return nothing;
    }
    const header = config.title ?? "Warnings";
    const entity = this.hass?.states[config.entity];
    if (!entity) {
      return html`<ha-card header=${header}
        ><div class="note">Entity not found: ${config.entity}</div></ha-card
      >`;
    }
    if (entity.state === "unavailable" || entity.state === "unknown") {
      return html`<ha-card header=${header}><div class="note">${entity.state}</div></ha-card>`;
    }
    const warnings = (entity.attributes.warnings as Warning[] | undefined) ?? [];
    return html`<ha-card header=${header}>
      ${warnings.length === 0
        ? html`<div class="note">No warnings for this location.</div>`
        : html`<div class="list">
            ${warnings.map((w) => this._row(w, config.show_summary !== false))}
          </div>`}
    </ha-card>`;
  }

  _row(w: Warning, showSummary: boolean) {
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
          ${detail ? html`<span class="level">(${detail})</span>` : nothing}
        </div>
        <div class="headline">${w.headline}</div>
        ${w.area ? html`<div class="area">${w.area}</div>` : nothing}
        ${showSummary && w.summary ? html`<div class="summary">${w.summary}</div>` : nothing}
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
