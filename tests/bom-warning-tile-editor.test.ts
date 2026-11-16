import { beforeAll, expect, it } from "vitest";
import { removeCardHelpers } from "./helpers";

interface CardClass {
  getConfigElement(): Promise<HTMLElement>;
}

// This file never defines hui-tile-card, as in a Home Assistant that has not loaded it, so the
// editor has nothing to wait for unless it gets the tile from the card helpers.
beforeAll(async () => {
  removeCardHelpers();
  await import("../src/bom-warning-tile");
});

it("says so when the card helpers are missing, instead of waiting for a tile that never comes", async () => {
  const cls = customElements.get("bom-warning-tile") as unknown as CardClass;

  await expect(cls.getConfigElement()).rejects.toThrow(/card helpers/i);
});
