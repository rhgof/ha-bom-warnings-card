import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import states from "./fixtures/states.json";

type Entity = { state: string; attributes: Record<string, unknown> };
type Scenario = Record<string, Entity>;
const ACTIVE = (states as Record<string, Scenario>).active;
const NONE = (states as Record<string, Scenario>).none;

const MARINE = "sensor.home_marine_wind_warning"; // moderate, #FB8C00
const HEAT = "sensor.home_extreme_heat_warning"; // severe, #D32F2F
const THUNDER = "sensor.home_thunderstorm_warning"; // none, no colour

interface Tile extends HTMLElement {
  config?: Record<string, unknown>;
  hass?: unknown;
  setConfig(config: Record<string, unknown>): void;
}

interface Card extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass: unknown;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
  getGridOptions(): Record<string, unknown>;
}

interface CardClass {
  getConfigElement(): Promise<HTMLElement>;
  getStubConfig(hass: unknown): Record<string, unknown>;
}

// What Home Assistant provides: a tile card, and a way to make one. A stand-in records what the
// card does to it.
const made: Tile[] = [];
const EDITOR = document.createElement("div");

class FakeTile extends HTMLElement {
  config?: Record<string, unknown>;
  hass?: unknown;
  setConfig(config: Record<string, unknown>): void {
    this.config = config;
  }
  getCardSize(): number {
    return 1;
  }
  getGridOptions(): Record<string, unknown> {
    return { columns: 6, rows: 1 };
  }
  static async getConfigElement(): Promise<HTMLElement> {
    return EDITOR;
  }
}

beforeAll(async () => {
  customElements.define("hui-tile-card", FakeTile);
  (window as unknown as Record<string, unknown>).loadCardHelpers = async () => ({
    createCardElement: (config: Record<string, unknown>) => {
      const tile = document.createElement("hui-tile-card") as Tile;
      tile.setConfig(config);
      made.push(tile);
      return tile;
    },
  });
  await import("../src/bom-warning-tile");
});

beforeEach(() => {
  made.length = 0;
});

async function mount(
  scenario: Scenario,
  config: Record<string, unknown> = {},
  hass: Record<string, unknown> = {},
): Promise<{ card: Card; tile: Tile }> {
  const card = document.createElement("bom-warning-tile") as Card;
  card.setConfig({ type: "custom:bom-warning-tile", entity: MARINE, ...config });
  card.hass = { states: scenario, ...hass };
  document.body.append(card);
  await vi.waitFor(() => expect(made.length).toBeGreaterThan(0));
  const tile = made[made.length - 1];
  await card.updateComplete;
  return { card, tile };
}

describe("the wrapped tile", () => {
  it("is the built-in tile for the same entity", async () => {
    const { tile } = await mount(ACTIVE);

    expect(tile.config).toMatchObject({ type: "tile", entity: MARINE });
  });

  it("passes the tile's own options straight through", async () => {
    const { tile } = await mount(ACTIVE, { name: "Wind", icon: "mdi:flag", vertical: true, hide_state: true });

    expect(tile.config).toMatchObject({ name: "Wind", icon: "mdi:flag", vertical: true, hide_state: true });
  });

  it("gets Home Assistant's state, so it can show and open the entity", async () => {
    const { tile, card } = await mount(ACTIVE);

    expect(tile.hass).toBe(card.hass);
  });

  it("sits inside the card, not beside it", async () => {
    const { card, tile } = await mount(ACTIVE);

    expect(card.shadowRoot!.contains(tile) || card.contains(tile)).toBe(true);
  });
});

describe("the level in the title", () => {
  // A sensor in a given state, with the name Home Assistant knows it by.
  const sensor = (state: string, friendlyName?: string): Scenario => ({
    [HEAT]: { state, attributes: friendlyName ? { friendly_name: friendlyName } : {} },
  });
  const registry = (name: string) => ({ entities: { [HEAT]: { entity_id: HEAT, name } } });

  it.each([
    ["minor", "Minor Heatwave warning"],
    ["moderate", "Moderate Heatwave warning"],
    ["unrated", "Unrated Heatwave warning"],
    ["severe", "Severe Heatwave warning"],
    ["extreme", "Extreme Heatwave warning"],
  ])("puts the level %s in front of the sensor's own name", async (state, name) => {
    const { tile } = await mount(sensor(state), { entity: HEAT }, registry("Heatwave warning"));

    expect(tile.config?.name).toBe(name);
  });

  it("uses the entity's own name from the registry, not the one with the location in front", async () => {
    const { tile } = await mount(
      sensor("severe", "Cairns Heatwave warning"),
      { entity: HEAT },
      registry("Heatwave warning"),
    );

    expect(tile.config?.name).toBe("Severe Heatwave warning");
  });

  it("falls back to the friendly name when the registry has none", async () => {
    const { tile } = await mount(sensor("severe", "Cairns Heatwave warning"), { entity: HEAT });

    expect(tile.config?.name).toBe("Severe Cairns Heatwave warning");
  });

  it("leaves the name alone when the sensor has no name to build on", async () => {
    const { tile } = await mount(sensor("severe"), { entity: HEAT });

    expect(tile.config).not.toHaveProperty("name");
  });

  it.each(["none", "unavailable", "unknown", "Strong Wind Warning for Sydney Coast"])(
    "adds nothing for the state %j, which is not a level",
    async (state) => {
      const { tile } = await mount(sensor(state), { entity: HEAT }, registry("Heatwave warning"));

      expect(tile.config).not.toHaveProperty("name");
    },
  );

  it("keeps a name set in the editor", async () => {
    const { tile } = await mount(
      sensor("severe"),
      { entity: HEAT, name: "Heat" },
      registry("Heatwave warning"),
    );

    expect(tile.config?.name).toBe("Heat");
  });

  it("follows the sensor as its level changes, and drops the level when the warning ends", async () => {
    const hass = registry("Heatwave warning");
    const { card, tile } = await mount(sensor("moderate"), { entity: HEAT }, hass);
    expect(tile.config?.name).toBe("Moderate Heatwave warning");

    card.hass = { states: sensor("extreme"), ...hass };
    await vi.waitFor(() => expect(tile.config?.name).toBe("Extreme Heatwave warning"));

    card.hass = { states: sensor("none"), ...hass };
    await vi.waitFor(() => expect(tile.config).not.toHaveProperty("name"));
  });
});

describe("the severity colour", () => {
  it.each([
    [MARINE, "#FB8C00"],
    [HEAT, "#D32F2F"],
  ])("takes the colour of %s from the sensor", async (entity, colour) => {
    const { tile } = await mount(ACTIVE, { entity });

    expect(tile.config?.color).toBe(colour);
  });

  it("leaves the colour out when the sensor has none, so the tile keeps its own", async () => {
    const { tile } = await mount(ACTIVE, { entity: THUNDER });

    expect(tile.config).not.toHaveProperty("color");
  });

  it("wins over a colour set in the editor while a warning is active", async () => {
    const { tile } = await mount(ACTIVE, { color: "blue" });

    expect(tile.config?.color).toBe("#FB8C00");
  });

  it("lets the editor's colour apply when there is no warning", async () => {
    const { tile } = await mount(ACTIVE, { entity: THUNDER, color: "blue" });

    expect(tile.config?.color).toBe("blue");
  });

  it("follows the sensor when its level changes", async () => {
    const { card, tile } = await mount(NONE, { entity: MARINE });
    expect(tile.config).not.toHaveProperty("color");

    card.hass = { states: ACTIVE };
    await vi.waitFor(() => expect(tile.config?.color).toBe("#FB8C00"));
  });

  it("does not reconfigure the tile when nothing about it changed", async () => {
    const { card, tile } = await mount(ACTIVE);
    const spy = vi.spyOn(tile, "setConfig");

    card.hass = { states: { ...ACTIVE } };
    card.hass = { states: { ...ACTIVE } };
    await card.updateComplete;

    expect(spy).not.toHaveBeenCalled();
  });

  it("still makes the tile when the entity is missing, and gives it no colour", async () => {
    const { tile } = await mount({}, { entity: "sensor.nope" });

    expect(tile.config).toMatchObject({ type: "tile", entity: "sensor.nope" });
    expect(tile.config).not.toHaveProperty("color");
  });
});

describe("how the card behaves on a dashboard", () => {
  it("refuses a config with no entity", () => {
    const card = document.createElement("bom-warning-tile") as Card;

    expect(() => card.setConfig({ type: "custom:bom-warning-tile" })).toThrow(/entity/i);
  });

  it("takes its size from the tile", async () => {
    const { card } = await mount(ACTIVE);

    expect(card.getCardSize()).toBe(1);
    expect(card.getGridOptions()).toEqual({ columns: 6, rows: 1 });
  });

  it("uses the tile's own editor, so every tile option is there", async () => {
    const cls = customElements.get("bom-warning-tile") as unknown as CardClass;

    expect(await cls.getConfigElement()).toBe(EDITOR);
  });

  it("starts a new card on one of the per-type sensors", () => {
    const cls = customElements.get("bom-warning-tile") as unknown as CardClass;
    const hass = {
      states: {
        "sensor.home_warning_count": { state: "2", attributes: { warnings: [] } },
        "sensor.home_fire_danger_today": { state: "high", attributes: { level: "high" } },
        "light.kitchen": { state: "on", attributes: {} },
        [MARINE]: ACTIVE[MARINE],
      },
    };

    expect(cls.getStubConfig(hass).entity).toBe(MARINE);
  });

  it("is blank, not an error, when there is no such sensor", () => {
    const cls = customElements.get("bom-warning-tile") as unknown as CardClass;

    expect(cls.getStubConfig({ states: {} }).entity).toBe("");
  });

  describe("choosing the sensor a new card starts on", () => {
    const sensor = (state: string) => ({ state, attributes: { level: state, warnings: [] } });
    const stub = (states: Record<string, unknown>) =>
      (customElements.get("bom-warning-tile") as unknown as CardClass).getStubConfig({ states }).entity;

    it("prefers a sensor with a warning over one listed first that has none", () => {
      expect(
        stub({
          "sensor.cairns_thunderstorm_warning": sensor("none"),
          "sensor.home_marine_wind_warning": sensor("moderate"),
        }),
      ).toBe("sensor.home_marine_wind_warning");
    });

    it("prefers the most severe of the sensors that have a warning", () => {
      expect(
        stub({
          "sensor.a_wind_warning": sensor("minor"),
          "sensor.b_flood_warning": sensor("extreme"),
          "sensor.c_frost_warning": sensor("moderate"),
        }),
      ).toBe("sensor.b_flood_warning");
    });

    it("falls back to the first sensor when none has a warning", () => {
      expect(
        stub({
          "sensor.cairns_thunderstorm_warning": sensor("none"),
          "sensor.home_marine_wind_warning": sensor("none"),
        }),
      ).toBe("sensor.cairns_thunderstorm_warning");
    });

    it("does not count an unavailable sensor as having a warning", () => {
      expect(
        stub({
          "sensor.a_wind_warning": sensor("none"),
          "sensor.b_flood_warning": sensor("unavailable"),
        }),
      ).toBe("sensor.a_wind_warning");
    });

    it("counts an unrated warning as one", () => {
      expect(
        stub({
          "sensor.a_wind_warning": sensor("none"),
          "sensor.b_thunderstorm_warning": sensor("unrated"),
        }),
      ).toBe("sensor.b_thunderstorm_warning");
    });
  });

  it("is listed in the card picker", () => {
    const cards = (window as unknown as { customCards: { type: string }[] }).customCards;

    expect(cards.map((c) => c.type)).toContain("bom-warning-tile");
  });
});
