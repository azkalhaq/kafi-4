export function localDateToIcs(dateString: string) {
  const date = new Date(dateString);
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
    "T",
    String(date.getUTCHours()).padStart(2, "0"),
    String(date.getUTCMinutes()).padStart(2, "0"),
    "00Z"
  ].join("");
}

export function escapeIcs(value: string) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

export function buildCalendarFile(params: {
  childName: string;
  intro: string;
  venueName: string;
  venueAddress: string;
  startDateTime: string;
  endDateTime: string;
}) {
  const start = localDateToIcs(params.startDateTime);
  const end = localDateToIcs(params.endDateTime);
  const stamp = localDateToIcs(new Date().toISOString());

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Birthday Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@birthday-invitation`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(`${params.childName}'s Birthday Celebration`)}`,
    `DESCRIPTION:${escapeIcs(params.intro)}`,
    `LOCATION:${escapeIcs(`${params.venueName}, ${params.venueAddress}`)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

export function formatGuestName(raw: string | null | undefined) {
  if (!raw) return "";
  const cleaned = raw.trim().replace(/\+/g, " ").replace(/\s+/g, " ");
  if (!cleaned) return "";
  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
