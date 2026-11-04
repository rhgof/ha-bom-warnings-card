import { beforeAll, describe, expect, it } from "vitest";
import states from "./fixtures/states.json";

type Scenario = Record<string, { state: string; attributes: Record<string, unknown> }>;
const COUNT = "sensor.home_warning_count";

interface Card extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass: unknown;
  updateComplete: Promise<boolean>;
}

beforeAll(async () => {
  await import("../src/bom-warnings-card");
});

async function mount(scenario: Scenario, config: Record<string, unknown>): Promise<string> {
  const card = document.createElement("bom-warnings-card") as Card;
  card.setConfig(config);
  card.hass = { states: scenario };
  document.body.append(card);
  await card.updateComplete;
  return (card.shadowRoot?.textContent ?? "").replace(/\s+/g, " ").trim();
}

describe("bom-warnings-card", () => {
  it.each([
    ["active", "3"],
    ["none", "0"],
  ])("shows the entity state with the %s fixture", async (name, count) => {
    const text = await mount((states as Record<string, Scenario>)[name], {
      type: "custom:bom-warnings-card",
      entity: COUNT,
    });

    expect(text).toContain(count);
  });

  it("says when the entity does not exist", async () => {
    const text = await mount({}, { type: "custom:bom-warnings-card", entity: "sensor.nope" });

    expect(text).toContain("sensor.nope");
    expect(text.toLowerCase()).toContain("not found");
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
