# BoM Warnings Card

A Lovelace card for the [BoM Warnings](https://github.com/rhgof/ha-bom-warnings) integration, which
shows Bureau of Meteorology warnings for a location.

**Status: early.** This version only shows one sensor's state, to prove the install path. The
ranked warning list, with a coloured icon per severity, comes next.

## Install

1. In HACS, open the menu, choose **Custom repositories**, add
   `https://github.com/rhgof/ha-bom-warnings-card` with the category **Dashboard**.
2. Download **BoM Warnings Card**, then reload the browser.

## Use

Add a card of type `custom:bom-warnings-card`, or pick **BoM Warnings** from the card picker:

```yaml
type: custom:bom-warnings-card
entity: sensor.home_warning_count
```

`entity` is the integration's warning count sensor. For an entry titled `Home` it is
`sensor.home_warning_count`.

## Develop

```sh
npm install
npm test
npm run build   # writes dist/bom-warnings-card.js, which HACS serves, so commit it
```

`tests/fixtures/states.json` is a copy of the integration's
`tests/fixtures/dashboard/states.json`, the shared description of the attributes the card reads.
Copy it again when the integration's attributes change.
