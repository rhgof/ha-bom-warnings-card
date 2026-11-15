import { beforeAll, describe, expect, it, vi } from "vitest";
import states from "./fixtures/states.json";

type Entity = { state: string; attributes: Record<string, unknown> };
type Scenario = Record<string, Entity>;
const SCENARIOS = states as Record<string, Scenario>;

const THUNDER = "sensor.home_thunderstorm_warning";
const MARINE = "sensor.home_marine_wind_warning";

interface Card extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass: unknown;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
  getGridOptions(): Record<string, unknown>;
}

class FakeTile extends HTMLElement {
  setConfig(): void {}
  getCardSize(): number {
    return 1;
  }
  getGridOptions(): Record<string, unknown> {
    return { columns: 6, rows: 1 };
  }
}

beforeAll(async () => {
  customElements.define("hui-tile-card", FakeTile);
  (window as unknown as Record<string, unknown>).loadCardHelpers = async () => ({
    createCardElement: () => document.createElement("hui-tile-card"),
  });
  await import("../src/bom-warning-tile");
});

// Home Assistant's own settings for a user in Sydney, which the footer's time is shown in.
const SYDNEY = { locale: { language: "en-AU" }, config: { time_zone: "Australia/Sydney" } };

async function mount(
  scenario: string,
  entity = THUNDER,
  hass: Record<string, unknown> = SYDNEY,
): Promise<Card> {
  const card = document.createElement("bom-warning-tile") as Card;
  card.setConfig({ type: "custom:bom-warning-tile", entity });
  card.hass = { states: SCENARIOS[scenario], ...hass };
  document.body.append(card);
  await card.updateComplete;
  await vi.waitFor(() => expect(card.shadowRoot?.children.length).toBeGreaterThan(0));
  return card;
}

const text = (card: Card, selector: string): string =>
  (card.shadowRoot?.querySelector(selector)?.textContent ?? "").replace(/\s+/g, " ").trim();

const mutated = (scenario: string, change: (attrs: Record<string, unknown>) => void): void => {
  const copy = structuredClone(SCENARIOS[scenario]);
  change(copy[THUNDER].attributes);
  SCENARIOS.mutated = copy;
};

describe("a current thunderstorm warning", () => {
  it("is its own tile, titled for the kind of warning and never for an unrated level", async () => {
    const card = await mount("thunderstorm");

    expect(card.shadowRoot?.querySelector(".thunderstorm")).not.toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).toBeNull();
    expect(text(card, ".title")).toBe("Severe thunderstorm");
    expect(card.shadowRoot?.textContent).not.toMatch(/unrated/i);
  });

  it("says Detailed for a detailed warning, and names the hazards in words", async () => {
    const card = await mount("thunderstorm");

    expect(text(card, ".badges")).toBe("Detailed");
    expect(text(card, ".hazards")).toBe("Damaging winds · Large hail");
  });

  it("shows the whole summary of the detailed warning, where the storm is heading", async () => {
    const card = await mount("thunderstorm");

    expect(text(card, ".summary")).toMatch(/Hexham by 3:10 pm\.$/);
  });

  it("says when the next warning is due, in the user's own time zone", async () => {
    const card = await mount("thunderstorm");

    expect(text(card, ".footer")).toBe("Update due by 3:10 pm · +1 more warning");
  });

  it("says Very dangerous for the tier, and has no more-warnings note when it is the only one", async () => {
    const card = await mount("thunderstorm_very_dangerous");

    expect(text(card, ".badges")).toBe("Very dangerous");
    expect(text(card, ".hazards")).toBe("Damaging winds · Large hail");
    expect(text(card, ".footer")).toBe("Update due by 5:40 pm");
  });

  it("takes the sensor's colour for its icon", async () => {
    const card = await mount("thunderstorm");

    const icon = card.shadowRoot?.querySelector("ha-icon");
    expect(icon?.getAttribute("style")).toContain("#FF6F00");
    expect(icon?.getAttribute("icon")).toBe("mdi:weather-lightning-rainy");
  });

  it("leaves out each line the sensor gives nothing for", async () => {
    mutated("thunderstorm", (a) => {
      delete a.hazards;
      delete a.summary;
      delete a.next_issue;
      delete a.detailed;
      a.current = 1;
    });
    const card = await mount("mutated");

    expect(card.shadowRoot?.querySelector(".hazards")).toBeNull();
    expect(card.shadowRoot?.querySelector(".summary")).toBeNull();
    expect(card.shadowRoot?.querySelector(".footer")).toBeNull();
    expect(card.shadowRoot?.querySelector(".badges")).toBeNull();
    expect(text(card, ".title")).toBe("Severe thunderstorm");
  });

  it("says how many more warnings there are, in the plural too", async () => {
    mutated("thunderstorm", (a) => {
      delete a.next_issue;
      a.current = 3;
    });
    const card = await mount("mutated");

    expect(text(card, ".footer")).toBe("+2 more warnings");
  });

  it("opens the entity's more-info when tapped, and from the keyboard", async () => {
    const card = await mount("thunderstorm");
    const opened: unknown[] = [];
    card.addEventListener("hass-more-info", (e) => opened.push((e as CustomEvent).detail));
    const tile = card.shadowRoot?.querySelector<HTMLElement>(".thunderstorm");

    tile?.click();
    tile?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(opened).toEqual([{ entityId: THUNDER }, { entityId: THUNDER }]);
    expect(tile?.getAttribute("role")).toBe("button");
  });

  it("is taller than a one-row tile", async () => {
    const card = await mount("thunderstorm");

    expect(card.getCardSize()).toBeGreaterThan(1);
    expect(card.getGridOptions()).toMatchObject({ rows: "auto" });
  });
});

describe("everything else stays the built-in tile", () => {
  it("shows the built-in tile when there is no thunderstorm warning", async () => {
    const card = await mount("none");

    expect(card.shadowRoot?.querySelector(".thunderstorm")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });

  it("shows the built-in tile for another type, even with a thunderstorm sensor active", async () => {
    const card = await mount("active", MARINE);

    expect(card.shadowRoot?.querySelector(".thunderstorm")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });

  it("goes back to the built-in tile when the warning ends", async () => {
    const card = await mount("thunderstorm");

    card.hass = { states: SCENARIOS.none, ...SYDNEY };
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector(".thunderstorm")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });
});
