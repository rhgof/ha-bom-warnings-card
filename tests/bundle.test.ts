import { expect, it } from "vitest";

it("ships both cards, and both are in the card picker", async () => {
  await import("../src/index");

  for (const tag of ["bom-warnings-card", "bom-warning-tile"]) {
    expect(customElements.get(tag), tag).toBeDefined();
  }
  const cards = (window as unknown as { customCards: { type: string }[] }).customCards;
  expect(cards.map((c) => c.type)).toEqual(
    expect.arrayContaining(["bom-warnings-card", "bom-warning-tile"]),
  );
});
