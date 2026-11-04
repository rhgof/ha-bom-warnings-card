import { beforeAll, describe, expect, it } from "vitest";

interface Editor extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass: unknown;
  updateComplete: Promise<boolean>;
}

interface CardClass {
  getConfigElement(): HTMLElement;
  getStubConfig(hass: unknown): Record<string, unknown>;
}

const hass = {
  states: {
    "sensor.home_warning_count": { state: "2", attributes: {} },
    "sensor.cairns_warning_count": { state: "0", attributes: {} },
    // The integration's other sensors must not be offered as the card's entity.
    "sensor.home_marine_wind_warning": { state: "none", attributes: {} },
    "sensor.home_fire_danger_today": { state: "high", attributes: {} },
    "light.kitchen": { state: "on", attributes: {} },
  },
};

type Field = { name: string; required?: boolean; selector: Record<string, unknown> };

beforeAll(async () => {
  await import("../src/bom-warnings-card");
});

async function mount(config: Record<string, unknown> = {}): Promise<Editor> {
  const editor = document.createElement("bom-warnings-card-editor") as Editor;
  editor.setConfig({ type: "custom:bom-warnings-card", ...config });
  editor.hass = hass;
  document.body.append(editor);
  await editor.updateComplete;
  return editor;
}

const form = (editor: Editor) =>
  editor.shadowRoot!.querySelector("ha-form") as HTMLElement & {
    schema: Field[];
    data: Record<string, unknown>;
    computeLabel: (field: { name: string }) => string;
  };

function change(editor: Editor, value: Record<string, unknown>): Record<string, unknown>[] {
  const emitted: Record<string, unknown>[] = [];
  editor.addEventListener("config-changed", (e) => emitted.push((e as CustomEvent).detail.config));
  form(editor).dispatchEvent(new CustomEvent("value-changed", { detail: { value } }));
  return emitted;
}

describe("the card's editor", () => {
  it("is what the dashboard asks the card for", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;

    expect(card.getConfigElement().tagName.toLowerCase()).toBe("bom-warnings-card-editor");
  });

  it("offers the entity, the title and the summary switch", async () => {
    const schema = form(await mount()).schema;

    expect(schema.map((f) => f.name)).toEqual(["entity", "title", "show_summary"]);
    expect(schema[0].required).toBe(true);
    expect(Object.keys(schema[0].selector)).toEqual(["entity"]);
    expect(Object.keys(schema[2].selector)).toEqual(["boolean"]);
  });

  it("offers only the warning count sensors as the entity", async () => {
    const entity = form(await mount()).schema[0].selector.entity as { include_entities: string[] };

    expect([...entity.include_entities].sort()).toEqual([
      "sensor.cairns_warning_count",
      "sensor.home_warning_count",
    ]);
  });

  it("shows the current config, with the summary on by default", async () => {
    const data = form(await mount({ entity: "sensor.home_warning_count", title: "Home" })).data;

    expect(data).toMatchObject({ entity: "sensor.home_warning_count", title: "Home", show_summary: true });
  });

  it("gives every field a label a person can read", async () => {
    const f = form(await mount());

    for (const name of ["entity", "title", "show_summary"]) {
      expect(f.computeLabel({ name })).not.toBe(name);
    }
  });

  it("reports a change as the whole config, keeping the card's type", async () => {
    const editor = await mount({ entity: "sensor.home_warning_count" });

    const [config] = change(editor, { entity: "sensor.cairns_warning_count", title: "Cairns", show_summary: false });

    expect(config).toEqual({
      type: "custom:bom-warnings-card",
      entity: "sensor.cairns_warning_count",
      title: "Cairns",
      show_summary: false,
    });
  });

  it("leaves out what is at its default, so the saved config stays short", async () => {
    const editor = await mount({ entity: "sensor.home_warning_count" });

    const [config] = change(editor, { entity: "sensor.home_warning_count", title: "", show_summary: true });

    expect(config).toEqual({ type: "custom:bom-warnings-card", entity: "sensor.home_warning_count" });
  });
});

describe("the stub config a new card starts from", () => {
  it("picks the first warning count sensor", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;

    expect(card.getStubConfig(hass).entity).toBe("sensor.home_warning_count");
  });

  it("is blank, not an error, when there is none", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;

    expect(card.getStubConfig({ states: {} }).entity).toBe("");
  });
});
