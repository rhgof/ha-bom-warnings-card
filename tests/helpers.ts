import { vi } from "vitest";
import fixture from "./fixtures/states.json";

export type Entity = { state: string; attributes: Record<string, unknown> };
export type Scenario = Record<string, Entity>;

function freeze<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

// Frozen, so a test that changes a shared scenario fails instead of leaking into the next one.
// Use `scenario()` to get a copy to change.
export const SCENARIOS = freeze(structuredClone(fixture)) as unknown as Readonly<
  Record<string, Readonly<Scenario>>
>;

export function scenario(name: string, change?: (copy: Scenario) => void): Scenario {
  const copy = structuredClone(SCENARIOS[name]) as Scenario;
  change?.(copy);
  return copy;
}

// The parts of Home Assistant's `hass` that the cards read, in the shape the real one has. The
// time zone and language are a user in Sydney's, which the detail tile's clock is shown in.
export function makeHass(states: Scenario, overrides: Record<string, unknown> = {}) {
  return {
    states,
    entities: {},
    language: "en-AU",
    locale: { language: "en-AU", number_format: "language", time_format: "language" },
    config: { time_zone: "Australia/Sydney", unit_system: { temperature: "°C" } },
    ...overrides,
  };
}

export interface Tile extends HTMLElement {
  config?: Record<string, unknown>;
  hass?: unknown;
  setConfig(config: Record<string, unknown>): void;
}

// What Home Assistant provides: a tile card with an editor, and a way to make one.
export const EDITOR = document.createElement("div");

export class FakeTile extends HTMLElement {
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

// The tiles the card made, so a test can look at them.
export const made: Tile[] = [];

type Helpers = { loadCardHelpers?: unknown };

export function stubCardHelpers(): void {
  if (!customElements.get("hui-tile-card")) {
    customElements.define("hui-tile-card", FakeTile);
  }
  (window as Helpers).loadCardHelpers = async () => ({
    createCardElement: (config: Record<string, unknown>) => {
      const tile = document.createElement("hui-tile-card") as Tile;
      tile.setConfig(config);
      made.push(tile);
      return tile;
    },
  });
}

export function removeCardHelpers(): void {
  delete (window as Helpers).loadCardHelpers;
}

export interface Mountable extends HTMLElement {
  setConfig(config: Record<string, unknown>): void;
  hass?: unknown;
  updateComplete: Promise<boolean>;
}

const mounted: HTMLElement[] = [];

// Removes what the test put in the document and forgets the tiles it made. Run after each test.
export function cleanup(): void {
  mounted.splice(0).forEach((el) => el.remove());
  made.length = 0;
  vi.restoreAllMocks();
}

// Makes a card, gives it its config and hass, adds it to the document, and waits for the card's
// own update, which for the tile includes making the tile it wraps.
export async function mount<T extends Mountable>(
  tag: string,
  config: Record<string, unknown>,
  hass?: unknown,
): Promise<T> {
  const el = document.createElement(tag) as T;
  el.setConfig({ type: `custom:${tag}`, ...config });
  if (hass !== undefined) {
    el.hass = hass;
  }
  document.body.append(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

// The text of a node, with its whitespace collapsed. With a selector, of the first match.
export function text(root: ParentNode | Node | null | undefined, selector?: string): string {
  const node = selector ? (root as ParentNode | null | undefined)?.querySelector(selector) : root;
  return (node?.textContent ?? "").replace(/\s+/g, " ").trim();
}
