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

interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

interface Config {
  type: string;
  entity: string;
  title?: string;
  show_headline?: boolean;
  show_area?: boolean;
  show_summary?: boolean;
  show_level?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

type Gesture = "tap" | "hold" | "double_tap";

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string }[];
  }
}

const ENDED = ["final", "cancelled"];
const NONE: ActionConfig = { action: "none" };
// The same timings as Home Assistant's own cards.
const HOLD_MS = 500;
const DOUBLE_TAP_MS = 250;

export class BomWarningsCard extends LitElement {
  // Declared this way, not with decorators, so the build needs no decorator settings.
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass?: Hass;
  _config?: Config;
  _holdTimer?: ReturnType<typeof setTimeout>;
  _tapTimer?: ReturnType<typeof setTimeout>;
  _held = false;

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
  }

  getCardSize(): number {
    return 3;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._holdTimer);
    clearTimeout(this._tapTimer);
    this._tapTimer = undefined;
  }

  // What Home Assistant's action handler reads from a card: the entity and the three actions.
  _actions() {
    const config = this._config!;
    return {
      entity: config.entity,
      tap_action: config.tap_action ?? { action: "more-info" },
      hold_action: config.hold_action ?? NONE,
      double_tap_action: config.double_tap_action ?? NONE,
    };
  }

  _isOn(gesture: Gesture): boolean {
    return this._actions()[`${gesture}_action`].action !== "none";
  }

  // Home Assistant listens for this above the card and carries the action out, as it does for its
  // own cards, so navigation, more-info, calling a service and the rest all work.
  _fire(gesture: Gesture): void {
    if (!this._isOn(gesture)) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: this._actions(), action: gesture },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _down = (): void => {
    this._held = false;
    clearTimeout(this._holdTimer);
    if (this._isOn("hold")) {
      this._holdTimer = setTimeout(() => {
        this._held = true;
        this._fire("hold");
      }, HOLD_MS);
    }
  };

  _release = (): void => {
    clearTimeout(this._holdTimer);
  };

  _click = (): void => {
    if (this._held) {
      // The press already did its work as a hold.
      this._held = false;
      return;
    }
    if (!this._isOn("double_tap")) {
      this._fire("tap");
      return;
    }
    if (this._tapTimer !== undefined) {
      clearTimeout(this._tapTimer);
      this._tapTimer = undefined;
      this._fire("double_tap");
      return;
    }
    // A second tap may be on its way, so a single tap waits to find out.
    this._tapTimer = setTimeout(() => {
      this._tapTimer = undefined;
      this._fire("tap");
    }, DOUBLE_TAP_MS);
  };

  _key = (event: KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._fire("tap");
    }
  };

  // The keyboard and a screen reader only treat the card as a button while a tap does something.
  _shell(header: string, body: unknown, interactive: boolean) {
    const tappable = interactive && this._isOn("tap");
    return html`<ha-card
      header=${header}
      class=${tappable ? "tappable" : ""}
      role=${tappable ? "button" : nothing}
      tabindex=${tappable ? "0" : nothing}
      @click=${interactive ? this._click : nothing}
      @pointerdown=${interactive ? this._down : nothing}
      @pointerup=${interactive ? this._release : nothing}
      @pointercancel=${interactive ? this._release : nothing}
      @pointerleave=${interactive ? this._release : nothing}
      @keydown=${tappable ? this._key : nothing}
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
      return this._shell(header, html`<div class="note">${entity.state}</div>`, true);
    }
    const warnings = (entity.attributes.warnings as Warning[] | undefined) ?? [];
    return this._shell(
      header,
      warnings.length === 0
        ? html`<div class="note">No warnings for this location.</div>`
        : html`<div class="list">${warnings.map((w) => this._row(w, config))}</div>`,
      true,
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
        ${config.show_summary !== false && w.summary
          ? html`<div class="summary">${w.summary}</div>`
          : nothing}
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
    ha-card.tappable {
      cursor: pointer;
    }
    ha-card.tappable:focus-visible {
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
