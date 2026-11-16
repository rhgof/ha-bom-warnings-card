import { beforeAll, describe, expect, it } from "vitest";
import { SCENARIOS as FIXTURE, makeHass, mount as mountCard, type Mountable, type Scenario } from "./helpers";

const SCENARIOS = FIXTURE as Record<string, Scenario>;
const COUNT = "sensor.home_warning_count";

type Card = Mountable;

beforeAll(async () => {
  await import("../src/bom-warnings-card");
});

const mount = (scenario: Scenario, config: Record<string, unknown> = {}): Promise<Card> =>
  mountCard<Card>("bom-warnings-card", { entity: COUNT, ...config }, makeHass(scenario));

const haCard = (card: Card) => card.shadowRoot!.querySelector("ha-card") as HTMLElement;
const summaries = (card: Card) => card.shadowRoot!.querySelectorAll(".summary").length;
const withSummary = (scenario: Scenario) =>
  (scenario[COUNT].attributes.warnings as { summary?: string }[]).filter((w) => w.summary).length;

async function tap(card: Card): Promise<void> {
  haCard(card).dispatchEvent(new Event("click", { bubbles: true }));
  await card.updateComplete;
}

async function press(card: Card, key: string): Promise<void> {
  haCard(card).dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  await card.updateComplete;
}

describe("tapping the card to show or hide the summaries", () => {
  it("hides every summary on a tap, and shows them again on the next", async () => {
    const card = await mount(SCENARIOS.active);
    const shown = withSummary(SCENARIOS.active);
    expect(shown).toBeGreaterThan(0);
    expect(summaries(card)).toBe(shown);

    await tap(card);
    expect(summaries(card)).toBe(0);

    await tap(card);
    expect(summaries(card)).toBe(shown);
  });

  it("starts hidden when show_summary is off, and a tap shows them", async () => {
    const card = await mount(SCENARIOS.active, { show_summary: false });
    expect(summaries(card)).toBe(0);

    await tap(card);

    expect(summaries(card)).toBe(withSummary(SCENARIOS.active));
  });

  it("leaves the other parts of each row as they were", async () => {
    const card = await mount(SCENARIOS.active);
    const before = [".event", ".headline", ".area", ".level"].map(
      (part) => card.shadowRoot!.querySelectorAll(part).length,
    );

    await tap(card);

    const after = [".event", ".headline", ".area", ".level"].map(
      (part) => card.shadowRoot!.querySelectorAll(part).length,
    );
    expect(after).toEqual(before);
  });

  it("keeps the choice when the warnings refresh", async () => {
    const card = await mount(SCENARIOS.active);
    await tap(card);

    card.hass = makeHass({ ...SCENARIOS.active });
    await card.updateComplete;

    expect(summaries(card)).toBe(0);
  });

  it("goes back to what the config says when the config changes, so the editor still works", async () => {
    const card = await mount(SCENARIOS.active);
    await tap(card);

    card.setConfig({ type: "custom:bom-warnings-card", entity: COUNT, show_summary: true });
    await card.updateComplete;

    expect(summaries(card)).toBe(withSummary(SCENARIOS.active));
  });

  it("does not change another card", async () => {
    const first = await mount(SCENARIOS.active);
    const second = await mount(SCENARIOS.active);

    await tap(first);

    expect(summaries(first)).toBe(0);
    expect(summaries(second)).toBe(withSummary(SCENARIOS.active));
  });

  it("toggles from the keyboard with Enter or Space, and no other key", async () => {
    const card = await mount(SCENARIOS.active);

    await press(card, "a");
    expect(summaries(card)).toBe(withSummary(SCENARIOS.active));
    await press(card, "Enter");
    expect(summaries(card)).toBe(0);
    await press(card, " ");
    expect(summaries(card)).toBe(withSummary(SCENARIOS.active));
  });

  it("only shows or hides the summaries, and does not open more-info", async () => {
    const card = await mount(SCENARIOS.active);
    const seen: string[] = [];
    card.addEventListener("hass-more-info", () => seen.push("hass-more-info"));

    await tap(card);

    expect(seen).toEqual([]);
  });
});

describe("when the card is a button", () => {
  it("is one, saying whether the summaries are open, while a warning has a summary", async () => {
    const card = await mount(SCENARIOS.active);

    expect(haCard(card).getAttribute("role")).toBe("button");
    expect(haCard(card).getAttribute("tabindex")).toBe("0");
    expect(haCard(card).getAttribute("aria-expanded")).toBe("true");

    await tap(card);

    expect(haCard(card).getAttribute("aria-expanded")).toBe("false");
  });

  const bare: Scenario = {
    [COUNT]: { state: "1", attributes: { warnings: [{ event: "Wind", headline: "h", level: "x" }] } },
  };

  it.each([
    ["there are no warnings", SCENARIOS.none],
    ["no warning has a summary", bare],
    ["the sensor is unavailable", { [COUNT]: { state: "unavailable", attributes: {} } }],
    ["the entity does not exist", {}],
  ])("is not one when %s, because a tap would show nothing", async (_why, scenario) => {
    const card = await mount(scenario as Scenario);

    expect(haCard(card).getAttribute("role")).toBeNull();
    expect(haCard(card).getAttribute("tabindex")).toBeNull();
    expect(haCard(card).getAttribute("aria-expanded")).toBeNull();
    await tap(card);
    expect(summaries(card)).toBe(0);
  });
});
