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

  it("offers the entity, the title and what each row shows", async () => {
    const schema = form(await mount()).schema;

    expect(schema.map((f) => f.name)).toEqual([
      "entity",
      "title",
      "show_headline",
      "show_area",
      "show_summary",
      "show_level",
    ]);
    expect(schema[0].required).toBe(true);
    expect(Object.keys(schema[0].selector)).toEqual(["entity"]);
    for (const field of schema.slice(2)) {
      expect(Object.keys(field.selector), field.name).toEqual(["boolean"]);
    }
  });

  it("says that the summary switch is where the card starts, since a tap toggles it", async () => {
    const f = form(await mount());

    expect(f.computeLabel({ name: "show_summary" }).toLowerCase()).toContain("start");
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

    expect(data).toMatchObject({
      entity: "sensor.home_warning_count",
      title: "Home",
      show_headline: true,
      show_area: true,
      show_summary: true,
      show_level: true,
    });
  });

  it("shows an older config that only has show_summary as it always looked", async () => {
    const data = form(await mount({ entity: "sensor.home_warning_count", show_summary: false })).data;

    expect(data).toMatchObject({ show_summary: false, show_headline: true, show_area: true, show_level: true });
  });

  it("gives every field a label a person can read", async () => {
    const f = form(await mount());

    for (const { name } of f.schema) {
      expect(f.computeLabel({ name }), name).not.toBe(name);
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

  it.each(["show_headline", "show_area", "show_summary", "show_level"])(
    "saves %s only when it is switched off",
    async (option) => {
      const editor = await mount({ entity: "sensor.home_warning_count" });

      const [off] = change(editor, { entity: "sensor.home_warning_count", [option]: false });
      const [on] = change(editor, { entity: "sensor.home_warning_count", [option]: true });

      expect(off).toMatchObject({ [option]: false });
      expect(on).not.toHaveProperty(option);
    },
  );

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

  it("prefers a location that has a warning over one listed first that has none", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;
    const states = {
      "sensor.cairns_warning_count": { state: "0", attributes: {} },
      "sensor.home_warning_count": { state: "3", attributes: {} },
    };

    expect(card.getStubConfig({ states }).entity).toBe("sensor.home_warning_count");
  });

  it("prefers the location with the most warnings among those that have one", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;
    const states = {
      "sensor.cairns_warning_count": { state: "1", attributes: {} },
      "sensor.warwick_warning_count": { state: "0", attributes: {} },
      "sensor.home_warning_count": { state: "3", attributes: {} },
      "sensor.other_warning_count": { state: "3", attributes: {} },
    };

    // A tie goes to the one listed first.
    expect(card.getStubConfig({ states }).entity).toBe("sensor.home_warning_count");
  });

  it("falls back to the first when no location has a warning", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;
    const states = {
      "sensor.cairns_warning_count": { state: "0", attributes: {} },
      "sensor.home_warning_count": { state: "0", attributes: {} },
    };

    expect(card.getStubConfig({ states }).entity).toBe("sensor.cairns_warning_count");
  });

  it("does not count an unavailable sensor as having a warning", () => {
    const card = customElements.get("bom-warnings-card") as unknown as CardClass;
    const states = {
      "sensor.cairns_warning_count": { state: "0", attributes: {} },
      "sensor.home_warning_count": { state: "unavailable", attributes: {} },
    };

    expect(card.getStubConfig({ states }).entity).toBe("sensor.cairns_warning_count");
  });
});
