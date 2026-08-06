/*
  EDIT ONLY THIS OBJECT to customise the invitation.
  The site is a static Next.js export, so it works under:
  https://username.github.io/kafi-4/?to=GuestName
*/
export const invitation = {
  childName: "Kafi",
  pageTitle: "Kafi's Birthday Invitation",
  intro:
    "Kafi is turning 4! Pack your biggest smile and join us.",

  dateLabel: "Saturday, 8 August 2026",
  timeLabel: "14:00 AM – 16:00 PM",
  venueName: "John Reserve Playground",
  venueAddress: "35 McLean St, Brunswick West VIC 3055",
  dressCode: "Ready to play at the park",

  // Use local time in YYYY-MM-DDTHH:MM format.
  startDateTime: "2026-08-22T14:00",
  endDateTime: "2026-08-22T16:00",

  // Set to false to hide the RSVP button and RSVP deadline note.
  showRsvp: false,
  rsvpBy: "15 August 2026",
  rsvpPhone: "6281234567890",
  rsvpMessage:
    "Hello! We would love to attend Kafi's birthday celebration.",
  mapUrl: "https://maps.app.goo.gl/5prATXFWg1ypZdvPA",
  mapQuery: "John Reserve Playground, 35 McLean St, Brunswick West VIC 3055, Australia",

  hostFamily: "Kafi's Family",
  familyMessage:
    "We are excited to share this special day with the people who make our son's world brighter. Thank you for being part of his happy memories."
} as const;

export type Invitation = typeof invitation;
