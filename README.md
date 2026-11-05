# BoM Warnings Card

Two Lovelace cards for the [BoM Warnings](https://github.com/rhgof/ha-bom-warnings) integration,
which brings Bureau of Meteorology warnings into Home Assistant:

- **BoM Warnings** (`custom:bom-warnings-card`) lists the warnings for a location, most severe
  first, each with an icon in the colour of its severity.
- **BoM Warning Tile** (`custom:bom-warning-tile`) is one warning type as a tile, with its icon in
  the colour of the current severity.

| Light | Dark |
| --- | --- |
| ![Ranked warning list, light theme](docs/images/ranked-list-light.png) | ![Ranked warning list, dark theme](docs/images/ranked-list-dark.png) |

## Contents

- [Key features](#key-features)
- [Install](#install)
- [BoM Warnings card](#bom-warnings-card-1): the ranked list, its options and the editor
- [Warning tile](#warning-tile): one warning type as a tile
- [Development](#development)

## Key features

- **The worst warning first.** The list is in the integration's own order, so what matters most to
  your location is at the top. The card does not re-sort.
- **Severity you can read at a glance.** Each warning has an icon in the colour of its level, in
  light and dark themes.
- **Says which area a warning is for.** Each warning shows the names of your location's areas it
  covers (for example `Illawarra`), so a warning for the next district over looks different from
  one for yours.
- **Choose what each row shows.** The headline, the areas, the summary, and the level and phase can
  each be switched off.
- **Tap for the history.** Tapping the card opens the sensor's history and activity, like the
  built-in cards. Hold and double tap can do something else.
- **Ended warnings are dimmed.** A warning that has gone `final` or `cancelled` (if you keep those in
  the integration's options) says so instead of looking current. With no warnings the card says so.
- **A tile for each warning type**, for a compact row of thunderstorm, flood, fire weather and so on.
  It is Home Assistant's own tile, so tapping opens the sensor's history and you keep all of the
  tile's options.
- **Set up from the dashboard.** Pick the card from the card picker and choose a location. No YAML
  or template is needed.
- **Starts on a warning.** A new card chooses a sensor that has a warning, not whichever is listed
  first.

## Install

You need the [BoM Warnings integration](https://github.com/rhgof/ha-bom-warnings) set up first:
the card reads its warning count sensor.

1. In HACS, open the menu, choose **Custom repositories**, add
   `https://github.com/rhgof/ha-bom-warnings-card` with the category **Dashboard**.
2. Download **BoM Warnings Card**, then hard-refresh the browser. The card's file is cached for a
   long time, so a page opened before an update keeps the old card until you do.

To update later, open the card in HACS, choose **Update information** from its menu, then
**Update**.

## BoM Warnings card

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
| `show_headline` | `true` | Set to `false` to leave out each warning's headline. |
| `show_area` | `true` | Set to `false` to leave out the names of the areas each warning covers. |
| `show_summary` | `true` | Set to `false` to leave out each warning's summary. Cards made before the other `show_` options keep working. |
| `show_level` | `true` | Set to `false` to leave out each warning's level and phase, for example `(moderate, final)`. An ended warning is still dimmed. |
| `tap_action` | `more-info` | What a tap does. |
| `hold_action` | `none` | What pressing and holding for half a second does. |
| `double_tap_action` | `none` | What tapping twice does. |

The event name and icon always show. Each option is in the card's editor too, so none of them needs
YAML.

### Tap, hold and double tap

A tap opens the more-info dialog of the warning count sensor, with its history, activity and
settings. The three actions are Home Assistant's own, so the editor offers the usual choices:
more-info, navigate, call a service, open a URL or do nothing. For example, to jump to a weather
page on a hold:

```yaml
type: custom:bom-warnings-card
entity: sensor.home_warning_count
hold_action:
  action: navigate
  navigation_path: /lovelace/weather
```

Setting a double tap action makes a single tap wait a quarter of a second, to see whether a second
tap follows. Leave it unset and a tap acts at once. With the tap action set to `none` the card
is not a button, so it does not take keyboard focus.

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

The tile is Home Assistant's own, so everything a tile has is there: tapping opens the sensor's
history and activity, and the editor has the tile's own name, icon, state content (add the
headline, summary or area), layout, interactions and features.

- **Colour.** While a warning is active its severity colour is used, even if the tile's **Colour**
  option is set. With no warning, that option (or the tile's default) applies.
- **Hide when there is no warning.** Use the editor's **Visibility** tab and show the card only when
  the state is not `none`.
- **Home Assistant versions.** It was checked on Home Assistant 2026.10.4 only, so check the tile
  after an upgrade. Why it is sensitive to upgrades is in [docs/development.md](docs/development.md).

## Development

Building, testing and how the card relates to the integration are in
[docs/development.md](docs/development.md).
