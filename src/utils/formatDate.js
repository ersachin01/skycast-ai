export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(unixSec, offsetSec) {
  const d = new Date((unixSec + offsetSec) * 1000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function getDayLabel(unixSec) {
  return new Date(unixSec * 1000).toLocaleDateString("en", { weekday: "short" });
}

export function getDateLabel(unixSec) {
  return new Date(unixSec * 1000).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
  });
}

export function getHourLabel(unixSec) {
  const d = new Date(unixSec * 1000);
  const h = d.getHours();
  return `${h}:00`;
}

export function getDayLength(sunrise, sunset) {
  const diff = sunset - sunrise;
  const h = Math.floor(diff / 3600);
  const m = Math.round((diff % 3600) / 60);
  return `${h}h ${m}m`;
}
