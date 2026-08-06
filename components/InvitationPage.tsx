"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { invitation } from "@/lib/invitation";
import { buildCalendarFile, formatGuestName } from "@/lib/calendar";
import { MapEmbed } from "@/components/MapEmbed";
import { Toast, useToast } from "@/components/Toast";

const LAUNCH_MS = 900;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = formatGuestName(searchParams.get("to"));
  const { message, visible, showToast } = useToast();
  const [isLaunching, setIsLaunching] = useState(false);
  const hasLaunchedRef = useRef(false);
  const launchTimerRef = useRef<number | null>(null);

  const rsvpHref = useMemo(() => {
    const personalNote = guestName
      ? `Hello! This is ${guestName}. We would love to attend ${invitation.childName}'s birthday celebration.`
      : invitation.rsvpMessage;
    return `https://wa.me/${invitation.rsvpPhone}?text=${encodeURIComponent(personalNote)}`;
  }, [guestName]);

  const scrollToInvitation = useCallback((behavior: ScrollBehavior = "smooth") => {
    const target = document.getElementById("invitation");
    if (!target) return;
    target.scrollIntoView({ behavior, block: "start" });
    target.focus({ preventScroll: true });
  }, []);

  const launchRocket = useCallback(
    (shouldScroll: boolean) => {
      if (hasLaunchedRef.current) {
        if (shouldScroll) scrollToInvitation();
        return;
      }

      hasLaunchedRef.current = true;

      if (prefersReducedMotion()) {
        setIsLaunching(true);
        if (shouldScroll) scrollToInvitation("auto");
        return;
      }

      setIsLaunching(true);

      if (!shouldScroll) return;

      if (launchTimerRef.current) window.clearTimeout(launchTimerRef.current);
      launchTimerRef.current = window.setTimeout(() => {
        scrollToInvitation();
      }, LAUNCH_MS * 0.45);
    },
    [scrollToInvitation]
  );

  useEffect(() => {
    function onScroll() {
      if (hasLaunchedRef.current) return;
      const hero = document.getElementById("hero");
      if (!hero) return;
      const threshold = hero.offsetTop + hero.offsetHeight * 0.42;
      if (window.scrollY > threshold) {
        launchRocket(false);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (launchTimerRef.current) window.clearTimeout(launchTimerRef.current);
    };
  }, [launchRocket]);

  function downloadCalendarEvent() {
    const calendar = buildCalendarFile({
      childName: invitation.childName,
      intro: invitation.intro,
      venueName: invitation.venueName,
      venueAddress: invitation.venueAddress,
      startDateTime: invitation.startDateTime,
      endDateTime: invitation.endDateTime
    });

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

  return (
    <>
      <a className="skip-link" href="#invitation">
        Skip to invitation details
      </a>

      <div className="page-shell">
        <div className="decor decor-star decor-star-one" aria-hidden="true">
          ✦
        </div>
        <div className="decor decor-star decor-star-two" aria-hidden="true">
          ✦
        </div>
        <div className="decor decor-balloon decor-balloon-one" aria-hidden="true" />
        <div className="decor decor-balloon decor-balloon-two" aria-hidden="true" />

        <header
          className="hero"
          id="hero"
          aria-labelledby="party-title"
        >
          {guestName ? (
            <p className="guest-greeting">Dear {guestName},</p>
          ) : (
            <p className="eyebrow">A little celebration is coming</p>
          )}

          <h1 id="party-title">
            <span>{invitation.childName}</span>&apos;s
            <span className="title-highlight">Birthday Adventure</span>
          </h1>

          <p className="hero-copy">{invitation.intro}</p>

          <div
            className={`hero-illustration${isLaunching ? " is-launching" : ""}`}
          >
            <div className="sun" aria-hidden="true" />
            <div className="cloud cloud-left" aria-hidden="true" />
            <div className="cloud cloud-right" aria-hidden="true" />
            <div className="rocket" aria-hidden="true">
              <div className="rocket-window" />
              <div className="rocket-fin rocket-fin-left" />
              <div className="rocket-fin rocket-fin-right" />
              <div className="rocket-flame" />
              <div className="rocket-smoke rocket-smoke-one" />
              <div className="rocket-smoke rocket-smoke-two" />
              <div className="rocket-smoke rocket-smoke-three" />
            </div>
            <div className="planet" aria-hidden="true">
              <div className="planet-ring" />
            </div>

            <button
              className="launch-button"
              type="button"
              onClick={() => launchRocket(true)}
              aria-label="Launch rocket and view invitation"
            >
              <span className="launch-button-ring" aria-hidden="true" />
              <span className="launch-button-core">
                <span className="launch-button-arrow" aria-hidden="true">
                  ▲
                </span>
                <span className="launch-button-label">
                  <span className="launch-button-kicker">Ready for liftoff</span>
                  <span className="launch-button-title">Launch</span>
                </span>
              </span>
            </button>
          </div>
        </header>

        <main id="invitation" tabIndex={-1}>
          <section className="invitation-card" aria-labelledby="details-title">
            <div className="card-heading">
              <p className="mini-label">
                {guestName ? `${guestName}, you are invited` : "You are invited"}
              </p>
              <h2 id="details-title">Come celebrate with us!</h2>
            </div>

            <dl className="event-grid">
              <div className="event-item">
                <dt>
                  <span className="icon" aria-hidden="true">
                    📅
                  </span>
                  Date
                </dt>
                <dd>{invitation.dateLabel}</dd>
              </div>

              <div className="event-item">
                <dt>
                  <span className="icon" aria-hidden="true">
                    ⏰
                  </span>
                  Time
                </dt>
                <dd>{invitation.timeLabel}</dd>
              </div>

              <div className="event-item event-item-wide">
                <dt>
                  <span className="icon" aria-hidden="true">
                    📍
                  </span>
                  Venue
                </dt>
                <dd>
                  <strong>{invitation.venueName}</strong>
                  <span>{invitation.venueAddress}</span>
                </dd>
              </div>

              <div className="event-item event-item-wide">
                <dt>
                  <span className="icon" aria-hidden="true">
                    👕
                  </span>
                  Dress code
                </dt>
                <dd>{invitation.dressCode}</dd>
              </div>
            </dl>

            <MapEmbed
              query={invitation.mapQuery}
              venueName={invitation.venueName}
              mapUrl={invitation.mapUrl}
            />

            <div
              className={`action-grid${invitation.showRsvp ? "" : " action-grid--no-rsvp"}`}
              aria-label="Invitation actions"
            >
              {invitation.showRsvp ? (
                <a
                  className="button button-primary"
                  href={rsvpHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`RSVP for ${invitation.childName}'s birthday using WhatsApp`}
                >
                  RSVP now
                </a>
              ) : null}
              <a
                className={`button ${invitation.showRsvp ? "button-secondary" : "button-primary"}`}
                href={invitation.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open a map for ${invitation.venueName} in a new tab`}
              >
                Open map
              </a>
              <button
                className="button button-secondary"
                type="button"
                onClick={downloadCalendarEvent}
              >
                Add to calendar
              </button>
            </div>

            {invitation.showRsvp ? (
              <p className="rsvp-note">
                Please RSVP by <strong>{invitation.rsvpBy}</strong>. We would
                love to celebrate with you.
              </p>
            ) : null}
          </section>

          <section className="message-card" aria-labelledby="message-title">
            <p className="mini-label">A note from our family</p>
            <h2 id="message-title">Your presence is the best present</h2>
            <p>{invitation.familyMessage}</p>
            <p className="signature">
              With love, <span>{invitation.hostFamily}</span>
            </p>
          </section>
        </main>

        <footer>
          <p>
            Made with joy for {invitation.childName}&apos;s special day ✨
          </p>
        </footer>
      </div>

      <Toast message={message} visible={visible} />
    </>
  );
}

export function InvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="page-shell">
          <header className="hero">
            <p className="eyebrow">Loading invitation…</p>
          </header>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
