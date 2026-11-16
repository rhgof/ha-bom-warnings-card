import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  SCENARIOS,
  makeHass,
  mount as mountCard,
  scenario,
  stubCardHelpers,
  text as textOf,
  type Mountable,
  type Scenario,
} from "./helpers";

const THUNDER = "sensor.home_thunderstorm_warning";
const MARINE = "sensor.home_marine_wind_warning";

interface Card extends Mountable {
  getCardSize(): number;
  getGridOptions(): Record<string, unknown>;
}

beforeAll(async () => {
  stubCardHelpers();
  await import("../src/bom-warning-tile");
});

beforeEach(stubCardHelpers);

const mount = (states: Scenario, entity = THUNDER): Promise<Card> =>
  mountCard<Card>("bom-warning-tile", { entity }, makeHass(states));

const text = (card: Card, selector: string): string => textOf(card.shadowRoot, selector);

// A copy of the thunderstorm scenario with its sensor's attributes changed.
const thunder = (change: (attrs: Record<string, unknown>) => void, name = "thunderstorm"): Scenario =>
  scenario(name, (copy) => change(copy[THUNDER].attributes));

describe("a current warning whose sensor asks for the detail layout", () => {
  it("is its own tile, titled with the title the sensor sends and never an unrated level", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    expect(card.shadowRoot?.querySelector(".detail-tile")).not.toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).toBeNull();
    expect(text(card, ".title")).toBe("Severe thunderstorm warning");
    expect(card.shadowRoot?.textContent).not.toMatch(/unrated/i);
  });

  it("says Detailed for a detailed warning, and names the hazards in words", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    expect(text(card, ".badges")).toBe("Detailed");
    expect(text(card, ".hazards")).toBe("Damaging winds · Large hail");
  });

  it("shows the whole summary of the detailed warning, where the storm is heading", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    expect(text(card, ".summary")).toMatch(/Hexham by 3:10 pm\.$/);
  });

  it("says when the next warning is due, in the user's own time zone", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    expect(text(card, ".footer")).toBe("Update due by 3:10 pm · +1 more warning");
  });

  it("says Very dangerous for the tier, and has no more-warnings note when it is the only one", async () => {
    const card = await mount(SCENARIOS.thunderstorm_very_dangerous as Scenario);

    expect(text(card, ".badges")).toBe("Very dangerous");
    expect(text(card, ".hazards")).toBe("Damaging winds · Large hail");
    expect(text(card, ".footer")).toBe("Update due by 5:40 pm");
  });

  it("takes the sensor's colour and icon", async () => {
    const card = await mount(
      thunder((a) => {
        a.icon = "mdi:weather-lightning-rainy";
      }),
    );

    const icon = card.shadowRoot?.querySelector("ha-icon");
    expect(icon?.getAttribute("style")).toContain("#FF6F00");
    expect(icon?.getAttribute("icon")).toBe("mdi:weather-lightning-rainy");
  });

  it("is drawn for any event whose sensor asks for it, since the card never checks the event", async () => {
    const marine = scenario("active", (copy) => {
      Object.assign(copy[MARINE].attributes, {
        layout: "detail",
        title: "Moderate Marine wind warning",
        badges: ["Gale"],
      });
    });
    const card = await mount(marine, MARINE);

    expect(card.shadowRoot?.querySelector(".detail-tile")).not.toBeNull();
    expect(text(card, ".title")).toBe("Moderate Marine wind warning");
    expect(text(card, ".badges")).toBe("Gale");
  });

  it("leaves out each line the sensor gives nothing for", async () => {
    const card = await mount(
      thunder((a) => {
        delete a.hazards;
        delete a.summary;
        delete a.next_issue;
        a.badges = [];
        a.current = 1;
      }),
    );

    expect(card.shadowRoot?.querySelector(".hazards")).toBeNull();
    expect(card.shadowRoot?.querySelector(".summary")).toBeNull();
    expect(card.shadowRoot?.querySelector(".footer")).toBeNull();
    expect(card.shadowRoot?.querySelector(".badges")).toBeNull();
    expect(text(card, ".title")).toBe("Severe thunderstorm warning");
  });

  it.each(["constructor", "toString", "__proto__", "hasOwnProperty"])(
    "ignores a hazard named like an Object property, %j",
    async (name) => {
      const card = await mount(thunder((a) => (a.hazards = [name, "wind"])));

      expect(text(card, ".hazards")).toBe("Damaging winds");
    },
  );

  it("leaves out the hazards line when every hazard is unknown", async () => {
    const card = await mount(thunder((a) => (a.hazards = ["constructor", "tornado"])));

    expect(card.shadowRoot?.querySelector(".hazards")).toBeNull();
  });

  it("falls back to the secondary text colour and a plain alert icon when the sensor sends neither", async () => {
    const card = await mount(
      thunder((a) => {
        delete a.color;
        delete a.icon;
      }),
    );
    const icon = card.shadowRoot?.querySelector("ha-icon");

    expect(icon?.getAttribute("icon")).toBe("mdi:alert-circle");
    expect(icon?.getAttribute("style")).toContain("var(--secondary-text-color)");
  });

  it("shows the tile as usual when the colour is not a colour", async () => {
    const card = await mount(thunder((a) => (a.color = "not a colour")));

    expect(text(card, ".title")).toBe("Severe thunderstorm warning");
    expect(card.shadowRoot?.querySelector(".detail-tile")).not.toBeNull();
  });

  it("leaves out the due time when next_issue is not a time, and keeps the rest of the footer", async () => {
    const card = await mount(thunder((a) => (a.next_issue = "soon")));

    expect(text(card, ".footer")).toBe("+1 more warning");
  });

  it.each(["many", null, "2x", {}, -3, 0])(
    "has no more-warnings note when the current count is %j",
    async (current) => {
      const card = await mount(
        thunder((a) => {
          delete a.next_issue;
          a.current = current;
        }),
      );

      expect(card.shadowRoot?.querySelector(".footer")).toBeNull();
    },
  );

  it("says how many more warnings there are, in the plural too", async () => {
    const card = await mount(
      thunder((a) => {
        delete a.next_issue;
        a.current = 3;
      }),
    );

    expect(text(card, ".footer")).toBe("+2 more warnings");
  });

  it("opens the entity's more-info when tapped, and from the keyboard", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);
    const opened: unknown[] = [];
    card.addEventListener("hass-more-info", (e) => opened.push((e as CustomEvent).detail));
    const tile = card.shadowRoot?.querySelector<HTMLElement>(".detail-tile");

    tile?.click();
    tile?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(opened).toEqual([{ entityId: THUNDER }, { entityId: THUNDER }]);
    expect(tile?.getAttribute("role")).toBe("button");
  });

  it("is taller than a one-row tile", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    expect(card.getCardSize()).toBeGreaterThan(1);
    expect(card.getGridOptions()).toMatchObject({ rows: "auto" });
  });
});

describe("everything else stays the built-in tile", () => {
  it("shows the built-in tile when there is no thunderstorm warning", async () => {
    const card = await mount(SCENARIOS.none as Scenario);

    expect(card.shadowRoot?.querySelector(".detail-tile")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });

  it("shows the built-in tile for another type, even with a thunderstorm sensor active", async () => {
    const card = await mount(SCENARIOS.active as Scenario, MARINE);

    expect(card.shadowRoot?.querySelector(".detail-tile")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });

  it("shows the built-in tile for the Most severe sensor, which repeats its top warning's fields", async () => {
    const [top] = SCENARIOS.thunderstorm["sensor.home_warning_count"].attributes
      .warnings as Record<string, unknown>[];
    const mostSevere: Scenario = {
      "sensor.home_most_severe_warning": {
        // Its state is a level, and its attributes are the top warning's, event included, but it
        // never sends `layout`.
        state: "severe",
        attributes: { ...top, level: "severe", warnings: [top] },
      },
    };

    const card = await mount(mostSevere, "sensor.home_most_severe_warning");

    expect(card.shadowRoot?.querySelector(".detail-tile")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });

  it("goes back to the built-in tile when the warning ends", async () => {
    const card = await mount(SCENARIOS.thunderstorm as Scenario);

    card.hass = makeHass(SCENARIOS.none as Scenario);
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector(".detail-tile")).toBeNull();
    expect(card.shadowRoot?.querySelector("hui-tile-card")).not.toBeNull();
  });
});
