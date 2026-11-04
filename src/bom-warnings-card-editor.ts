import { LitElement, html, nothing } from "lit";

interface Hass {
  states: Record<string, unknown>;
}

interface Config {
  type: string;
  entity?: string;
  title?: string;
  show_summary?: boolean;
}

const LABELS: Record<string, string> = {
  entity: "Warning count sensor",
  title: "Title",
  show_summary: "Show each warning's summary",
};

const HELPERS: Record<string, string> = {
  entity: "The sensor named ... warning count from the BoM Warnings integration.",
  title: "Leave empty for the default, Warnings.",
};

export class BomWarningsCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  hass?: Hass;
  _config?: Config;

  setConfig(config: Config): void {
    this._config = config;
  }

  // Only the count sensor works as this card's entity, so the picker offers only those and not
  // every sensor the integration makes.
  _schema() {
    const counts = Object.keys(this.hass?.states ?? {}).filter((id) => id.endsWith("_warning_count"));
    return [
      { name: "entity", required: true, selector: { entity: { include_entities: counts } } },
      { name: "title", selector: { text: {} } },
      { name: "show_summary", selector: { boolean: {} } },
    ];
  }

  _computeLabel = (field: { name: string }): string => LABELS[field.name] ?? field.name;

  _computeHelper = (field: { name: string }): string => HELPERS[field.name] ?? "";

  _changed(event: CustomEvent<{ value: Partial<Config> }>): void {
    const { entity, title, show_summary } = event.detail.value;
    // Defaults are left out, so the saved config shows only what the person chose.
    const config: Config = {
      type: this._config?.type ?? "custom:bom-warnings-card",
      ...(entity ? { entity } : {}),
      ...(title ? { title } : {}),
      ...(show_summary === false ? { show_summary: false } : {}),
    };
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  render() {
    if (!this._config) {
      return nothing;
    }
    const data = { show_summary: true, ...this._config };
    return html`<ha-form
      .hass=${this.hass}
      .data=${data}
      .schema=${this._schema()}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._changed}
    ></ha-form>`;
  }
}

customElements.define("bom-warnings-card-editor", BomWarningsCardEditor);
