import { LitElement, html, nothing } from "lit";

interface Hass {
  states: Record<string, unknown>;
}

interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

interface Config {
  type: string;
  entity?: string;
  title?: string;
  show_headline?: boolean;
  show_area?: boolean;
  show_summary?: boolean;
  show_level?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

const LABELS: Record<string, string> = {
  entity: "Warning count sensor",
  title: "Title",
  show_headline: "Show each warning's headline",
  show_area: "Show the areas each warning covers",
  show_summary: "Show each warning's summary",
  show_level: "Show each warning's level and phase",
  tap_action: "Tap action",
  hold_action: "Hold action",
  double_tap_action: "Double tap action",
};

const HELPERS: Record<string, string> = {
  entity: "The sensor named ... warning count from the BoM Warnings integration.",
  title: "Leave empty for the default, Warnings.",
};

// Each of these shows a part of every row, and is on unless the person switches it off.
const SHOW = ["show_headline", "show_area", "show_summary", "show_level"] as const;

// What each action does when none is set. Only a choice that differs is saved.
const ACTIONS = {
  tap_action: "more-info",
  hold_action: "none",
  double_tap_action: "none",
} as const;

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
      ...SHOW.map((name) => ({ name, selector: { boolean: {} } })),
      ...Object.entries(ACTIONS).map(([name, defaultAction]) => ({
        name,
        selector: { ui_action: { default_action: defaultAction } },
      })),
    ];
  }

  _computeLabel = (field: { name: string }): string => LABELS[field.name] ?? field.name;

  _computeHelper = (field: { name: string }): string => HELPERS[field.name] ?? "";

  _changed(event: CustomEvent<{ value: Partial<Config> }>): void {
    const value = event.detail.value;
    // Defaults are left out, so the saved config shows only what the person chose.
    const config: Config = {
      type: this._config?.type ?? "custom:bom-warnings-card",
      ...(value.entity ? { entity: value.entity } : {}),
      ...(value.title ? { title: value.title } : {}),
    };
    for (const name of SHOW) {
      if (value[name] === false) {
        config[name] = false;
      }
    }
    for (const [name, defaultAction] of Object.entries(ACTIONS) as [keyof typeof ACTIONS, string][]) {
      const chosen = value[name];
      const plainDefault = chosen?.action === defaultAction && Object.keys(chosen).length === 1;
      if (chosen && !plainDefault) {
        config[name] = chosen;
      }
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  render() {
    if (!this._config) {
      return nothing;
    }
    const data = {
      show_headline: true,
      show_area: true,
      show_summary: true,
      show_level: true,
      tap_action: { action: "more-info" },
      hold_action: { action: "none" },
      double_tap_action: { action: "none" },
      ...this._config,
    };
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
