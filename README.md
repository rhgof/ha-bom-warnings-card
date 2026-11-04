# BoM Warnings Card

Two Lovelace cards for the [BoM Warnings](https://github.com/rhgof/ha-bom-warnings) integration:

- **BoM Warnings** (`custom:bom-warnings-card`) lists the Bureau of Meteorology warnings for a
  location, most severe first, each with an icon in the colour of its severity.
- **BoM Warning Tile** (`custom:bom-warning-tile`) is one warning type as a tile, with its icon in
  the colour of the current severity. See [Warning tile](#warning-tile).

| Light | Dark |
| --- | --- |
| ![Ranked warning list, light theme](docs/images/ranked-list-light.png) | ![Ranked warning list, dark theme](docs/images/ranked-list-dark.png) |

Each warning shows its event, level, headline, the names of your location's areas it covers, and a
short summary. A warning that has ended (`final` or `cancelled`, if you keep those in the
integration's options) is dimmed and says so. With no warnings the card says so.

## Install

You need the [BoM Warnings integration](https://github.com/rhgof/ha-bom-warnings) set up first:
the card reads its warning count sensor.

1. In HACS, open the menu, choose **Custom repositories**, add
   `https://github.com/rhgof/ha-bom-warnings-card` with the category **Dashboard**.
2. Download **BoM Warnings Card**, then hard-refresh the browser. The card's file is cached for a
   long time, so a page opened before an update keeps the old card until you do.

To update later, open the card in HACS, choose **Update information** from its menu, then
**Update**.

## Use

Edit a dashboard, choose **Add card**, open the **By card** tab and pick **BoM Warnings**. The
editor starts with one of your warning count sensors already chosen.

![The card's editor in Home Assistant](docs/images/editor.png)

Or write it in YAML:

```yaml
type: custom:bom-warnings-card
entity: sensor.home_warning_count
```

| Option | Default | |
| --- | --- | --- |
| `entity` | required | The integration's warning count sensor. For an entry titled `Home` it is `sensor.home_warning_count`. |
| `title` | `Warnings` | The card's header. |
| `show_summary` | `true` | Set to `false` to leave out each warning's summary. |

The order is the integration's own ranking. The card does not re-sort.

If you would rather not install a card, the integration's
[dashboard guide](https://github.com/rhgof/ha-bom-warnings/blob/main/docs/dashboard.md) has a
ready-made section built from Home Assistant's own cards.

## Warning tile

One warning type (thunderstorm, flood, marine wind and so on) as a tile, with the icon in the colour
of the sensor's current severity. A type with no warning keeps the tile's usual colour.

| Light | Dark |
| --- | --- |
| ![Warning tiles, light theme](docs/images/warning-tile-light.png) | ![Warning tiles, dark theme](docs/images/warning-tile-dark.png) |

Edit a dashboard, choose **Add card**, open the **By card** tab and pick **BoM Warning Tile**, or:

```yaml
type: custom:bom-warning-tile
entity: sensor.home_thunderstorm_warning
```

`entity` is one of the integration's per-type warning sensors (`sensor.<title>_<type>_warning`). The
integration must be recent enough for those sensors to have a `color` attribute.

The card is Home Assistant's own tile with its colour set from the sensor, so everything a tile has
is there: tapping opens the sensor's history and activity, and the editor has the tile's own name,
icon, state content (add the headline, summary or area), layout, interactions and features.

- **Colour.** While a warning is active its severity colour is used, even if the tile's **Colour**
  option is set. With no warning, that option (or the tile's default) applies.
- **Hide when there is no warning.** Use the editor's **Visibility** tab and show the card only when
  the state is not `none`. The card has no options of its own, because the tile's editor rejects
  settings it does not know.
- **Home Assistant versions.** It relies on two internals of the frontend, `loadCardHelpers()` and
  the tile card's editor. It was checked on Home Assistant 2026.10.4 only, so check it after an
  upgrade.

## Develop

```sh
npm install
npm test
npm run build   # writes dist/bom-warnings-card.js, which HACS serves, so commit it
```

`tests/fixtures/states.json` is a copy of the integration's
`tests/fixtures/dashboard/states.json`, the shared description of the attributes the card reads.
The integration's own tests check that file against what it really produces, and this repo's CI
fails if the copy falls behind. Copy it again when the integration's attributes change.
