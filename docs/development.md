# Development

## Layout

| File | What it is |
| --- | --- |
| `src/index.ts` | Entry point. HACS serves one file, so both cards are bundled into it. |
| `src/bom-warnings-card.ts` | The ranked list, `custom:bom-warnings-card`. Reads the `warnings` attribute of the integration's count sensor. |
| `src/bom-warnings-card-editor.ts` | The visual editor for that card. |
| `src/bom-warning-tile.ts` | The tile, `custom:bom-warning-tile`. Wraps Home Assistant's own tile card and sets its colour from the sensor's `color` attribute. |
| `tests/` | Vitest tests, one file per source file, plus `bundle.test.ts` for the built file. |
| `tests/fixtures/states.json` | A copy of the integration's `tests/fixtures/dashboard/states.json`. See below. |
| `dist/bom-warnings-card.js` | The built bundle. HACS serves this committed file. |

## Commands

```sh
npm install
npm run typecheck
npm test
npm run build   # writes dist/bom-warnings-card.js, which HACS serves, so commit it
```

CI (`.github/workflows/ci.yml`) runs the three checks above, then fails if `dist` differs from what
the source builds, so a stale build cannot be merged. It also runs the HACS check.

## The fixture and the integration

`tests/fixtures/states.json` is the shared description of the attributes the card reads. The
integration's own tests check that file against what it really produces, and this repo's CI fails
if the copy falls behind the one on the integration's `main`. When the integration's attributes
change, copy its `tests/fixtures/dashboard/states.json` over this one, run the tests, rebuild and
commit both.

The card has no settings that tune the integration. Its only inputs are the entity ids and
attributes in the fixture: the count sensor's `warnings` list (`event`, `headline`, `level`,
`phase`, `icon`, `color`, `area`, `summary`), and the per-type sensors' state and `color`.

## Home Assistant internals

The tile relies on two internals of the Home Assistant frontend: `loadCardHelpers()` and the tile
card's own editor (`hui-tile-card` and its `getConfigElement()`). Neither is a public API, so a
Home Assistant upgrade is a reason to check the tile. The tile's editor rejects settings it does
not know, which is why this card has no options of its own: hiding it when there is no warning is
done with the editor's **Visibility** tab.

Only Home Assistant 2026.10.4 has been checked.
