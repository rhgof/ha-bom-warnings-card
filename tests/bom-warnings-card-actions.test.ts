import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
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

type Action = { action: string; config: Record<string, unknown> };

beforeAll(async () => {
  await import("../src/bom-warnings-card");
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

async function mount(scenario: Scenario, config: Record<string, unknown> = {}): Promise<Card> {
  const card = document.createElement("bom-warnings-card") as Card;
  card.setConfig({ type: "custom:bom-warnings-card", entity: COUNT, ...config });
  card.hass = { states: scenario };
  document.body.append(card);
  await card.updateComplete;
  return card;
}

function listen(card: Card): Action[] {
  const seen: Action[] = [];
  card.addEventListener("hass-action", (e) => seen.push((e as CustomEvent).detail));
  return seen;
}

const haCard = (card: Card) => card.shadowRoot!.querySelector("ha-card") as HTMLElement;
const press = (el: HTMLElement) => el.dispatchEvent(new Event("pointerdown", { bubbles: true }));
const release = (el: HTMLElement) => el.dispatchEvent(new Event("pointerup", { bubbles: true }));
const click = (el: HTMLElement) => el.dispatchEvent(new Event("click", { bubbles: true }));
const key = (el: HTMLElement, name: string) =>
  el.dispatchEvent(new KeyboardEvent("keydown", { key: name, bubbles: true }));

describe("tapping the card", () => {
  it("opens the more-info dialog of the entity by default, at once", async () => {
    const card = await mount(SCENARIOS.active);
    const seen = listen(card);

    click(haCard(card));

    expect(seen).toEqual([
      {
        action: "tap",
        config: {
          entity: COUNT,
          tap_action: { action: "more-info" },
          hold_action: { action: "none" },
          double_tap_action: { action: "none" },
        },
      },
    ]);
  });

  it("lets the event reach Home Assistant, which handles it above the card", async () => {
    const card = await mount(SCENARIOS.active);
    const reached: Event[] = [];
    const remember = (e: Event) => reached.push(e);
    document.addEventListener("hass-action", remember);

    click(haCard(card));
    document.removeEventListener("hass-action", remember);

    expect(reached).toHaveLength(1);
    expect(reached[0].composed).toBe(true);
  });

  it("passes on a tap action chosen in the editor", async () => {
    const tap = { action: "navigate", navigation_path: "/lovelace/weather" };
    const card = await mount(SCENARIOS.active, { tap_action: tap });
    const seen = listen(card);

    click(haCard(card));

    expect(seen[0].config.tap_action).toEqual(tap);
  });

  it("does nothing when the tap action is none", async () => {
    const card = await mount(SCENARIOS.active, { tap_action: { action: "none" } });
    const seen = listen(card);

    click(haCard(card));
    vi.advanceTimersByTime(1000);

    expect(seen).toEqual([]);
  });

  it("does nothing when the entity does not exist", async () => {
    const card = await mount({}, { entity: "sensor.nope" });
    const seen = listen(card);

    click(haCard(card));

    expect(seen).toEqual([]);
  });

  it("still opens the dialog for an unavailable sensor, where its history explains why", async () => {
    const card = await mount({ [COUNT]: { state: "unavailable", attributes: {} } });
    const seen = listen(card);

    click(haCard(card));

    expect(seen.map((a) => a.action)).toEqual(["tap"]);
  });

  it("opens it from the keyboard with Enter or Space, and no other key", async () => {
    const card = await mount(SCENARIOS.active);
    const seen = listen(card);

    key(haCard(card), "Enter");
    key(haCard(card), " ");
    key(haCard(card), "a");

    expect(seen.map((a) => a.action)).toEqual(["tap", "tap"]);
  });

  it("is a button to the keyboard and a screen reader only while a tap does something", async () => {
    const live = haCard(await mount(SCENARIOS.active));
    const dead = haCard(await mount(SCENARIOS.active, { tap_action: { action: "none" } }));

    expect(live.getAttribute("role")).toBe("button");
    expect(live.getAttribute("tabindex")).toBe("0");
    expect(dead.getAttribute("role")).toBeNull();
    expect(dead.getAttribute("tabindex")).toBeNull();
  });
});

describe("holding the card", () => {
  const hold = { action: "navigate", navigation_path: "/history" };

  it("fires the hold action after half a second, and not the tap that follows", async () => {
    const card = await mount(SCENARIOS.active, { hold_action: hold });
    const seen = listen(card);

    press(haCard(card));
    vi.advanceTimersByTime(499);
    expect(seen).toEqual([]);
    vi.advanceTimersByTime(1);
    release(haCard(card));
    click(haCard(card));
    vi.advanceTimersByTime(1000);

    expect(seen.map((a) => a.action)).toEqual(["hold"]);
    expect(seen[0].config.hold_action).toEqual(hold);
  });

  it("is a tap when let go sooner", async () => {
    const card = await mount(SCENARIOS.active, { hold_action: hold });
    const seen = listen(card);

    press(haCard(card));
    vi.advanceTimersByTime(300);
    release(haCard(card));
    click(haCard(card));
    vi.advanceTimersByTime(1000);

    expect(seen.map((a) => a.action)).toEqual(["tap"]);
  });

  it("does nothing when no hold action is set, so a long press is still a tap", async () => {
    const card = await mount(SCENARIOS.active);
    const seen = listen(card);

    press(haCard(card));
    vi.advanceTimersByTime(2000);
    release(haCard(card));
    click(haCard(card));

    expect(seen.map((a) => a.action)).toEqual(["tap"]);
  });

  it.each(["pointercancel", "pointerleave"])(
    "does not hold on after the pointer ends with %s",
    async (ending) => {
      const card = await mount(SCENARIOS.active, { hold_action: hold });
      const seen = listen(card);

      press(haCard(card));
      haCard(card).dispatchEvent(new Event(ending, { bubbles: true }));
      vi.advanceTimersByTime(2000);

      expect(seen).toEqual([]);
    },
  );
});

describe("tapping the card twice", () => {
  const twice = { action: "navigate", navigation_path: "/weather" };

  it("fires the double tap action, and not the single tap, when two taps are close", async () => {
    const card = await mount(SCENARIOS.active, { double_tap_action: twice });
    const seen = listen(card);

    click(haCard(card));
    vi.advanceTimersByTime(200);
    click(haCard(card));
    vi.advanceTimersByTime(1000);

    expect(seen.map((a) => a.action)).toEqual(["double_tap"]);
    expect(seen[0].config.double_tap_action).toEqual(twice);
  });

  it("waits to see whether a second tap comes, then fires the single tap", async () => {
    const card = await mount(SCENARIOS.active, { double_tap_action: twice });
    const seen = listen(card);

    click(haCard(card));
    expect(seen).toEqual([]);
    vi.advanceTimersByTime(250);

    expect(seen.map((a) => a.action)).toEqual(["tap"]);
  });

  it("treats two taps far apart as two single taps", async () => {
    const card = await mount(SCENARIOS.active, { double_tap_action: twice });
    const seen = listen(card);

    click(haCard(card));
    vi.advanceTimersByTime(400);
    click(haCard(card));
    vi.advanceTimersByTime(400);

    expect(seen.map((a) => a.action)).toEqual(["tap", "tap"]);
  });
});
