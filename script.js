/*
  EDIT ONLY THIS OBJECT to customise the invitation.
  The page uses relative files, so it works under:
  https://username.github.io/invitation-repo/
*/
const invitation = {
  childName: "Kafi",
  pageTitle: "Kafi's Birthday Invitation",
  intro:
    "Pack your biggest smile and join us for games, treats, and a heroic day together.",

  // Human-readable event details shown on the page
  dateLabel: "Saturday, 22 August 2026",
  timeLabel: "10:00 AM – 12:00 PM",
  venueName: "Birthday Party Venue",
  venueAddress: "Add the full venue address here",
  dressCode: "Superhero or space explorer costumes welcome",

  // Use local time in YYYY-MM-DDTHH:MM format.
  // These values are used by the Add to Calendar button.
  startDateTime: "2026-08-22T10:00",
  endDateTime: "2026-08-22T12:00",

  rsvpBy: "15 August 2026",
  rsvpPhone: "6281234567890", // Country code + number, digits only
  rsvpMessage:
    "Hello! We would love to attend Kafi's birthday celebration.",
  mapUrl: "https://maps.google.com/?q=Melbourne",

  hostFamily: "Kafi's Family",
  familyMessage:
    "We are excited to share this special day with the people who make our son's world brighter. Thank you for being part of his happy memories."
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
}

function getGuestNameFromQuery() {
  const raw = new URLSearchParams(window.location.search).get("to");
  if (!raw) return "";

  // Decode, tidy spaces, and keep a short safe display name.
  const cleaned = raw
    .replaceAll("+", " ")
    .replace(/[<>&"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);

  if (!cleaned) return "";

  // Title-case words for nicer links like ?to=alex or ?to=aunt%20maya
  return cleaned
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function applyGuestPersonalisation(guestName) {
  const greeting = document.getElementById("guest-greeting");
  const inviteLabel = document.getElementById("invite-label");

  if (!guestName) {
    if (greeting) greeting.hidden = true;
    return;
  }

  if (greeting) {
    greeting.hidden = false;
    greeting.textContent = `Hey ${guestName}! 🎉 This invite is for you`;
  }

  if (inviteLabel) {
    inviteLabel.textContent = `${guestName}, you’re invited`;
  }

  document.title = `${guestName}, you’re invited to ${invitation.childName}'s birthday`;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      `${guestName}, you are invited to ${invitation.childName}'s birthday celebration.`
    );
}

function localDateToIcs(dateString) {
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

function escapeIcs(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function downloadCalendarEvent() {
  const start = localDateToIcs(invitation.startDateTime);
  const end = localDateToIcs(invitation.endDateTime);
  const stamp = localDateToIcs(new Date().toISOString());

  const calendar = [
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
    `SUMMARY:${escapeIcs(`${invitation.childName}'s Birthday Celebration`)}`,
    `DESCRIPTION:${escapeIcs(invitation.intro)}`,
    `LOCATION:${escapeIcs(`${invitation.venueName}, ${invitation.venueAddress}`)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${invitation.childName.toLowerCase()}-birthday.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast("Calendar event downloaded");
}

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function setupEnvelopeReveal() {
  const sealedView = document.getElementById("sealed-view");
  const inviteView = document.getElementById("invite-view");
  const openButton = document.getElementById("open-envelope");
  const invitationCard = document.getElementById("invitation");
  const tapHint = document.getElementById("tap-hint");
  if (!sealedView || !inviteView || !openButton) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let opened = false;

  const showInvite = () => {
    sealedView.setAttribute("hidden", "");
    sealedView.classList.add("is-gone");
    inviteView.removeAttribute("hidden");
    inviteView.classList.add("is-visible", "is-popping");
    document.body.classList.add("is-opened");
    window.scrollTo(0, 0);
    invitationCard?.focus({ preventScroll: true });
  };

  const openEnvelope = () => {
    if (opened) return;
    opened = true;

    openButton.setAttribute("aria-expanded", "true");
    openButton.disabled = true;
    if (tapHint) tapHint.hidden = true;

    if (prefersReducedMotion) {
      showInvite();
      return;
    }

    openButton.classList.add("is-opening");
    window.setTimeout(showInvite, 480);
  };

  openButton.addEventListener("click", openEnvelope);

  if (prefersReducedMotion) {
    openEnvelope();
  }
}

function initialiseInvitation() {
  const guestName = getGuestNameFromQuery();

  document.title = invitation.pageTitle;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      `You are invited to ${invitation.childName}'s birthday celebration.`
    );

  setText("child-name", invitation.childName);
  setText("footer-name", invitation.childName);
  setText("intro-copy", invitation.intro);
  setText("event-date", invitation.dateLabel);
  setText("event-time", invitation.timeLabel);
  setText("venue-name", invitation.venueName);
  setText("venue-address", invitation.venueAddress);
  setText("dress-code", invitation.dressCode);
  setText("rsvp-date", invitation.rsvpBy);
  setText("host-family", invitation.hostFamily);
  setText("family-message", invitation.familyMessage);

  applyGuestPersonalisation(guestName);

  const rsvpButton = document.getElementById("rsvp-button");
  const rsvpMessage = guestName
    ? `Hi! This is ${guestName}. We would love to attend ${invitation.childName}'s birthday celebration.`
    : invitation.rsvpMessage;
  const message = encodeURIComponent(rsvpMessage);
  rsvpButton.href = `https://wa.me/${invitation.rsvpPhone}?text=${message}`;
  rsvpButton.target = "_blank";
  rsvpButton.setAttribute(
    "aria-label",
    `RSVP for ${invitation.childName}'s birthday using WhatsApp`
  );

  const mapButton = document.getElementById("map-button");
  mapButton.href = invitation.mapUrl;
  mapButton.setAttribute(
    "aria-label",
    `Open a map for ${invitation.venueName} in a new tab`
  );

  document
    .getElementById("calendar-button")
    .addEventListener("click", downloadCalendarEvent);
}

initialiseInvitation();
setupEnvelopeReveal();
