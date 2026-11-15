// What a warning shows on the detail tile, worked out from the sensor's attributes. Pure, so it is
// tested without a browser. The integration decides which sensors get this tile (`layout`) and
// sends the title, colour, icon and badges, so nothing here depends on the warning's event. The
// integration's tests check the attribute names against the real BoM products (see
// docs/development.md).

interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

export interface Locale {
  locale?: { language?: string };
  config?: { time_zone?: string };
}

export interface DetailView {
  title: string;
  icon: string;
  color?: string;
  badges: string[];
  hazards?: string;
  summary?: string;
  footer?: string;
}

// The integration's hazard categories, in words a person would say.
const HAZARD_WORDS: Record<string, string> = {
  wind: "Damaging winds",
  hail: "Large hail",
  rain: "Heavy rain",
  flood: "Flash flooding",
};

const DEFAULT_ICON = "mdi:alert-circle";

function text(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

function hazardsLine(value: unknown): string | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const words = value.map((h) => HAZARD_WORDS[String(h)]).filter(Boolean);
  return words.length ? words.join(" · ") : undefined;
}

// "3:10 pm" in the user's own zone and language, which Home Assistant knows and the browser may not.
function clock(iso: string, hass: Locale): string | undefined {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return new Intl.DateTimeFormat(hass.locale?.language, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: hass.config?.time_zone,
  }).format(date);
}

function footer(attributes: Record<string, unknown>, hass: Locale): string | undefined {
  const parts: string[] = [];
  const due = text(attributes.next_issue);
  const time = due ? clock(due, hass) : undefined;
  if (time) {
    parts.push(`Update due by ${time}`);
  }
  const more = (Number(attributes.current) || 0) - 1;
  if (more > 0) {
    parts.push(`+${more} more ${more === 1 ? "warning" : "warnings"}`);
  }
  return parts.length ? parts.join(" · ") : undefined;
}

// Undefined unless the sensor asks for the detail layout, which it does only while its type has a
// current warning, so everything else keeps the built-in tile. The Most severe sensor repeats its
// top warning's fields but never sends `layout`, so it always keeps the built-in tile.
export function detailView(state: HassState | undefined, hass: Locale): DetailView | undefined {
  const attributes = state?.attributes;
  const title = text(attributes?.title);
  if (!attributes || attributes.layout !== "detail" || !title) {
    return undefined;
  }
  return {
    title,
    icon: text(attributes.icon) ?? DEFAULT_ICON,
    color: text(attributes.color),
    badges: Array.isArray(attributes.badges) ? attributes.badges.filter((b) => typeof b === "string") : [],
    hazards: hazardsLine(attributes.hazards),
    summary: text(attributes.summary),
    footer: footer(attributes, hass),
  };
}
