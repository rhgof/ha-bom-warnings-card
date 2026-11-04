import { LitElement, css, html } from "lit";

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
}

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string }[];
  }
}

export class BomWarningsCard extends LitElement {
  // Declared this way, not with decorators, so the build needs no decorator settings.
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass?: Hass;
  _config?: Config;

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
    return 2;
  }

  render() {
    const entityId = this._config?.entity;
    if (!entityId) {
      return html``;
    }
    const entity = this.hass?.states[entityId];
    if (!entity) {
      return html`<ha-card><div class="body">Entity not found: ${entityId}</div></ha-card>`;
    }
    const name = (entity.attributes.friendly_name as string | undefined) ?? entityId;
    return html`<ha-card header="BoM Warnings">
      <div class="body"><span class="name">${name}</span>: <span class="state">${entity.state}</span></div>
    </ha-card>`;
  }

  static styles = css`
    .body {
      padding: 0 16px 16px;
    }
    ha-card:not([header]) .body {
      padding-top: 16px;
    }
  `;
}

customElements.define("bom-warnings-card", BomWarningsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bom-warnings-card",
  name: "BoM Warnings",
  description: "Current Bureau of Meteorology warnings for a location.",
});
