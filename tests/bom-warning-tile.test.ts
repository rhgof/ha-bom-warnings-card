import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  EDITOR,
  SCENARIOS,
  made,
  makeHass,
  removeCardHelpers,
  mount as mountCard,
  stubCardHelpers,
  type Mountable,
  type Scenario,
  type Tile,
} from "./helpers";

const ACTIVE = SCENARIOS.active as Scenario;
const NONE = SCENARIOS.none as Scenario;

const MARINE = "sensor.home_marine_wind_warning"; // moderate, #FB8C00
const HEAT = "sensor.home_extreme_heat_warning"; // severe, #D32F2F
const THUNDER = "sensor.home_thunderstorm_warning"; // none, no colour

// The tile's Name field set to Entity only, so the location's name is not in front of it.
const ENTITY_NAME = { type: "entity" };

interface Card extends Mountable {
  getCardSize(): number;
  getGridOptions(): Record<string, unknown>;
}

interface CardClass {
  getConfigElement(): Promise<HTMLElement>;
  getStubConfig(hass: unknown): Record<string, unknown>;
}

beforeAll(async () => {
  stubCardHelpers();
  await import("../src/bom-warning-tile");
});

beforeEach(stubCardHelpers);

async function mount(
  scenario: Scenario,
  config: Record<string, unknown> = {},
): Promise<{ card: Card; tile: Tile }> {
  const card = await mountCard<Card>(
    "bom-warning-tile",
    { entity: MARINE, ...config },
    makeHass(scenario),
  );
  return { card, tile: made[made.length - 1] };
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

describe("the title", () => {
  // The integration sends the title with the level in front, so the card only has to show it.
  const sensor = (state: string, attributes: Record<string, unknown> = {}): Scenario => ({
    [HEAT]: { state, attributes: { warnings: [], level: state, ...attributes } },
  });

  // A fire danger rating has levels of its own. It is titled only when the sensor sends a title.
  const FIRE = "sensor.home_fire_danger_today";
  const rating = (state: string): Scenario => ({
    [FIRE]: {
      state,
      attributes: { level: state, color: "#FEDD3A", friendly_name: "Home Fire danger today" },
    },
  });

  it.each(["no_rating", "moderate", "high", "extreme", "catastrophic"])(
    "leaves a fire danger rating of %s untitled when it sends no title, but still coloured",
    async (state) => {
      const { tile } = await mount(rating(state), { entity: FIRE });

      expect(tile.config?.name).toEqual(ENTITY_NAME);
      expect(tile.config?.color).toBe("#FEDD3A");
    },
  );

  it.each([
    ["sensor.home_fire_danger_today", "High Fire Danger Today", "#FEDD3A"],
    ["sensor.home_fire_danger_tomorrow", "Extreme Fire Danger Tomorrow", "#F78100"],
  ])("names the fire danger tile %s from its title, in the rating's colour", async (entity, name, colour) => {
    const { tile } = await mount(ACTIVE, { entity });

    expect(tile.config?.name).toBe(name);
    expect(tile.config?.color).toBe(colour);
  });

  it("gives a rating with no level the plain title", async () => {
    const { tile } = await mount(NONE, { entity: "sensor.home_fire_danger_today" });

    expect(tile.config?.name).toBe("Fire Danger Today");
  });

  it.each(["Severe Heatwave warning", "Severe weather warning", "Moderate Frost warning"])(
    "names the tile %j, the title the sensor sends",
    async (title) => {
      const { tile } = await mount(sensor("severe", { title }), { entity: HEAT });

      expect(tile.config?.name).toBe(title);
    },
  );

  it.each(["none", "unavailable", "unknown"])(
    "adds nothing for the state %j, when the sensor sends no title",
    async (state) => {
      const { tile } = await mount(sensor(state, { title: null }), { entity: HEAT });

      expect(tile.config?.name).toEqual(ENTITY_NAME);
    },
  );

  it("keeps a name set in the editor", async () => {
    const { tile } = await mount(sensor("severe", { title: "Severe Heatwave warning" }), {
      entity: HEAT,
      name: "Heat",
    });

    expect(tile.config?.name).toBe("Heat");
  });

  it("follows the sensor as the title changes, and drops it when the warning ends", async () => {
    const { card, tile } = await mount(sensor("moderate", { title: "Moderate Heatwave warning" }), {
      entity: HEAT,
    });
    expect(tile.config?.name).toBe("Moderate Heatwave warning");

    card.hass = makeHass(sensor("extreme", { title: "Extreme Heatwave warning" }));
    await card.updateComplete;
    expect(tile.config?.name).toBe("Extreme Heatwave warning");

    card.hass = makeHass(sensor("none", { title: null }));
    await card.updateComplete;
    expect(tile.config?.name).toEqual(ENTITY_NAME);
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

    card.hass = makeHass(ACTIVE);
    await card.updateComplete;
    expect(tile.config?.color).toBe("#FB8C00");
  });

  it("does not reconfigure the tile when nothing about it changed, but still hands it the new hass", async () => {
    const { card, tile } = await mount(ACTIVE);
    const spy = vi.spyOn(tile, "setConfig");
    const next = makeHass({ ...ACTIVE });

    card.hass = makeHass({ ...ACTIVE });
    await card.updateComplete;
    card.hass = next;
    await card.updateComplete;

    expect(spy).not.toHaveBeenCalled();
    expect(tile.hass).toBe(next);
  });

  it("still makes the tile when the entity is missing, and gives it no colour", async () => {
    const { tile } = await mount({}, { entity: "sensor.nope" });

    expect(tile.config).toMatchObject({ type: "tile", entity: "sensor.nope" });
    expect(tile.config).not.toHaveProperty("color");
  });
});

describe("the tile's default name and content", () => {
  const MOST = "sensor.home_most_severe_warning";
  const FIRE = "sensor.home_fire_danger_today";
  const typeSensor = (state: string, attributes: Record<string, unknown> = {}): Scenario => ({
    [HEAT]: { state, attributes: { warnings: [], level: state, ...attributes } },
  });

  it("names a tile by its entity alone, so the location's name is not in front of it", async () => {
    const { tile } = await mount(typeSensor("none"), { entity: HEAT });

    expect(tile.config?.name).toEqual(ENTITY_NAME);
  });

  it("still shows the title when the name is the Entity default", async () => {
    const { tile } = await mount(
      typeSensor("severe", { title: "Severe Heatwave warning" }),
      { entity: HEAT, name: ENTITY_NAME },
    );

    expect(tile.config?.name).toBe("Severe Heatwave warning");
  });

  it.each([
    ["a text name", "Heat"],
    ["the device's name", { type: "device" }],
    ["the entity's name and its device's", [{ type: "device" }, { type: "entity" }]],
  ])("keeps %s that was chosen in the editor", async (_label, name) => {
    const { tile } = await mount(typeSensor("severe"), { entity: HEAT, name });

    expect(tile.config?.name).toEqual(name);
  });

  it("shows the state and the headline on a warning sensor", async () => {
    const { tile } = await mount(typeSensor("severe"), { entity: HEAT });

    expect(tile.config?.state_content).toEqual(["state", "headline"]);
  });

  it("shows the headline while there is no warning too, so the content does not change shape", async () => {
    const { tile } = await mount(typeSensor("none", { headline: null }), { entity: HEAT });

    expect(tile.config?.state_content).toEqual(["state", "headline"]);
  });

  it("keeps content chosen in the editor", async () => {
    const { tile } = await mount(typeSensor("severe"), {
      entity: HEAT,
      state_content: ["state", "expires"],
    });

    expect(tile.config?.state_content).toEqual(["state", "expires"]);
  });

  it("leaves a fire danger rating with the tile's own content, which has no headline", async () => {
    const { tile } = await mount(
      { [FIRE]: { state: "high", attributes: { level: "high" } } },
      { entity: FIRE },
    );

    expect(tile.config).not.toHaveProperty("state_content");
  });

  it("treats the most severe sensor like any other warning sensor, since its state is a level", async () => {
    const { tile } = await mount(
      {
        [MOST]: {
          state: "severe",
          attributes: { warnings: [], level: "severe", title: "Severe Heatwave warning" },
        },
      },
      { entity: MOST },
    );

    expect(tile.config?.state_content).toEqual(["state", "headline"]);
    expect(tile.config?.name).toBe("Severe Heatwave warning");
  });

  it("starts a new card with both defaults, so the editor shows them", () => {
    const cls = customElements.get("bom-warning-tile") as unknown as CardClass;

    expect(cls.getStubConfig({ states: { [MARINE]: ACTIVE[MARINE] } })).toEqual({
      entity: MARINE,
      name: ENTITY_NAME,
      state_content: ["state", "headline"],
    });
  });
});

describe("when Home Assistant's card helpers are not there yet", () => {
  const failWith = (message: string) => {
    (window as unknown as Record<string, unknown>).loadCardHelpers = async () => {
      throw new Error(message);
    };
  };

  it("makes the tile on a later update once the helpers have loaded", async () => {
    removeCardHelpers();
    const { card } = await mount(ACTIVE);
    expect(made).toHaveLength(0);

    stubCardHelpers();
    card.hass = makeHass(ACTIVE);
    await card.updateComplete;

    expect(made).toHaveLength(1);
    expect(made[0].config).toMatchObject({ type: "tile", entity: MARINE });
  });

  it("makes the tile on a later update when loading the helpers failed", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    failWith("helpers are not ready");
    const { card } = await mount(ACTIVE);
    expect(made).toHaveLength(0);

    stubCardHelpers();
    card.hass = makeHass(ACTIVE);
    await card.updateComplete;

    expect(made).toHaveLength(1);
  });

  it("says why the tile is missing when the helpers fail, since nothing else shows it", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    failWith("helpers are not ready");

    await mount(ACTIVE);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining("helpers are not ready"));
  });

  it("finishes updating and tries again later when making the tile throws", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    (window as unknown as Record<string, unknown>).loadCardHelpers = async () => ({
      createCardElement: () => {
        throw new Error("no such card");
      },
    });
    const { card } = await mount(ACTIVE);
    await expect(card.updateComplete).resolves.toBe(true);
    expect(made).toHaveLength(0);

    stubCardHelpers();
    card.hass = makeHass(ACTIVE);
    await card.updateComplete;

    expect(made).toHaveLength(1);
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
    // The integration's rank is None while there is no warning, and 2 for an unrated one.
    const RANKS: Record<string, number> = { minor: 1, moderate: 2, unrated: 2, severe: 3, extreme: 4 };
    const sensor = (state: string) => ({
      state,
      attributes: { level: state, warnings: [], rank: RANKS[state] ?? null },
    });
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

    it("can start on the Most severe sensor, which is a level sensor like the others", () => {
      expect(
        stub({
          "sensor.a_wind_warning": sensor("minor"),
          "sensor.a_most_severe_warning": sensor("extreme"),
        }),
      ).toBe("sensor.a_most_severe_warning");
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
