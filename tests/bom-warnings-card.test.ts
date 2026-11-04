import { beforeAll, describe, expect, it } from "vitest";
import states from "./fixtures/states.json";

type Entity = { state: string; attributes: Record<string, unknown> };
type Scenario = Record<string, Entity>;
const SCENARIOS = states as Record<string, Scenario>;
const COUNT = "sensor.home_warning_count";

interface Card extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass: unknown;
  updateComplete: Promise<boolean>;
}

beforeAll(async () => {
  await import("../src/bom-warnings-card");
});

async function mount(scenario: Scenario, config: Record<string, unknown> = {}): Promise<Card> {
  const card = document.createElement("bom-warnings-card") as Card;
  card.setConfig({ type: "custom:bom-warnings-card", entity: COUNT, ...config });
  card.hass = { states: scenario };
  document.body.append(card);
  await card.updateComplete;
  return card;
}

const text = (el: Node | null | undefined) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
const rows = (card: Card) => [...card.shadowRoot!.querySelectorAll(".warning")];
const colour = (value: string) => {
  const probe = document.createElement("div");
  probe.style.color = value;
  return probe.style.color;
};
const warnings = (name: string) =>
  SCENARIOS[name][COUNT].attributes.warnings as Record<string, string>[];

describe("the ranked list", () => {
  it("shows one row per warning, in the order the integration ranked them", async () => {
    const card = await mount(SCENARIOS.active);

    expect(rows(card).map((r) => text(r.querySelector(".event")))).toEqual(
      warnings("active").map((w) => w.event),
    );
  });

  it("gives each row its icon, and the colour of its level", async () => {
    const card = await mount(SCENARIOS.active);

    expect(rows(card)).toHaveLength(warnings("active").length);
    rows(card).forEach((row, i) => {
      const icon = row.querySelector("ha-icon") as HTMLElement;
      expect(icon.getAttribute("icon")).toBe(warnings("active")[i].icon);
      expect(icon.style.color).toBe(colour(warnings("active")[i].color));
    });
  });

  it("shows the level, the headline and the area names", async () => {
    const card = await mount(SCENARIOS.active);
    const wind = rows(card)[1];

    expect(text(wind.querySelector(".level"))).toContain("moderate");
    expect(text(wind.querySelector(".headline"))).toContain("Strong Wind Warning");
    expect(text(wind.querySelector(".area"))).toBe("Illawarra Coast; Sydney Coast; Hunter Coast");
  });

  it("marks a final warning as ended, and says so", async () => {
    const card = await mount(SCENARIOS.active);
    const [heat, , flood] = rows(card);

    expect(flood.classList.contains("ended")).toBe(true);
    expect(text(flood.querySelector(".level"))).toContain("final");
    expect(heat.classList.contains("ended")).toBe(false);
    expect(text(heat.querySelector(".level"))).not.toContain("update");
  });

  it("shows the summary unless show_summary is off", async () => {
    const on = await mount(SCENARIOS.active);
    const off = await mount(SCENARIOS.active, { show_summary: false });

    expect(text(rows(on)[0].querySelector(".summary"))).toContain("severe heatwave is expected");
    expect(rows(on)[2].querySelector(".summary")).toBeNull();
    expect(off.shadowRoot!.querySelector(".summary")).toBeNull();
  });

  it("copes with a warning that has no colour or icon", async () => {
    const bare: Scenario = {
      [COUNT]: { state: "1", attributes: { warnings: [{ event: "Wind", headline: "h", level: "x", phase: "update" }] } },
    };
    const card = await mount(bare);

    expect(text(rows(card)[0].querySelector(".event"))).toBe("Wind");
  });
});

describe("the card around the list", () => {
  it("says so when there are no warnings", async () => {
    const card = await mount(SCENARIOS.none);

    expect(rows(card)).toHaveLength(0);
    expect(text(card.shadowRoot)).toContain("No warnings for this location.");
  });

  it.each([
    [{}, "Warnings"],
    [{ title: "Home" }, "Home"],
  ])("titles it from the config %j", async (config, title) => {
    const card = await mount(SCENARIOS.active, config);

    expect(card.shadowRoot!.querySelector("ha-card")!.getAttribute("header")).toBe(title);
  });

  it.each(["unavailable", "unknown"])("shows an %s sensor as that, not as no warnings", async (state) => {
    const card = await mount({ [COUNT]: { state, attributes: {} } });

    expect(text(card.shadowRoot)).toContain(state);
    expect(text(card.shadowRoot)).not.toContain("No warnings");
  });

  it("says when the entity does not exist", async () => {
    const card = await mount({}, { entity: "sensor.nope" });

    expect(text(card.shadowRoot)).toContain("sensor.nope");
    expect(text(card.shadowRoot).toLowerCase()).toContain("not found");
  });

  it("refuses a config with no entity", () => {
    const card = document.createElement("bom-warnings-card") as Card;

    expect(() => card.setConfig({ type: "custom:bom-warnings-card" })).toThrow(/entity/i);
  });

  it("is listed in the card picker", () => {
    const cards = (window as unknown as { customCards: { type: string }[] }).customCards;

    expect(cards.map((c) => c.type)).toContain("bom-warnings-card");
  });
});
