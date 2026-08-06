"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { invitation } from "@/lib/invitation";
import { buildCalendarFile, formatGuestName } from "@/lib/calendar";
import { MapEmbed } from "@/components/MapEmbed";
import { Toast, useToast } from "@/components/Toast";
import { SparkleField } from "@/components/art/Sparkles";
import {
  ChevronRight,
  CloudBand,
  HeartShape,
  MoonArt,
  OrbitArc,
  RingedPlanetArt,
  RocketArt,
  RocketGlyph,
  StarShape
} from "@/components/art/Illustrations";
import {
  CalendarIcon,
  ClockIcon,
  GiftIcon,
  PinIcon,
  ShirtIcon
} from "@/components/art/FactIcons";

const LAUNCH_MS = 900;

type Fact = {
  key: string;
  label: string;
  value: string;
  detail?: string;
  tone: string;
  icon: ReactNode;
};

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

  const facts = useMemo<Fact[]>(() => {
    const items: Fact[] = [
      {
        key: "date",
        label: "Date",
        value: invitation.dateLabel,
        tone: "peach",
        icon: <CalendarIcon />
      },
      {
        key: "time",
        label: "Time",
        value: invitation.timeLabel,
        tone: "sky",
        icon: <ClockIcon />
      },
      {
        key: "location",
        label: "Location",
        value: invitation.venueName,
        detail: invitation.venueAddress,
        tone: "mint",
        icon: <PinIcon />
      },
      {
        key: "dress",
        label: "Dress code",
        value: invitation.dressCode,
        tone: "sun",
        icon: <ShirtIcon />
      }
    ];

    if (invitation.showRsvp) {
      items.push({
        key: "rsvp",
        label: "RSVP",
        value: `By ${invitation.rsvpBy}`,
        tone: "blush",
        icon: <GiftIcon />
      });
    }

    return items;
  }, []);

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
        <SparkleField />

        <header className="hero" id="hero" aria-labelledby="party-title">
          {guestName ? (
            <p className="guest-greeting">Dear {guestName},</p>
          ) : (
            <p className="eyebrow">A little celebration is coming</p>
          )}

          <p className="ornament" aria-hidden="true">
            <span className="ornament-rule" />
            <StarShape className="ornament-star" />
            <span className="ornament-rule" />
          </p>

          <h1 id="party-title">
            <span className="title-name">{invitation.childName}&apos;s</span>
            <span className="title-highlight">Birthday Adventure</span>
          </h1>

          <p className="hero-copy">{invitation.intro}</p>

          <div className={`hero-scene${isLaunching ? " is-launching" : ""}`}>
            <span className="scene-glow" aria-hidden="true" />
            <OrbitArc className="scene-orbit scene-orbit--left" />
            <OrbitArc className="scene-orbit scene-orbit--right" />
            <MoonArt className="scene-moon" />
            <RingedPlanetArt className="scene-planet" />

            <div className="rocket">
              <RocketArt className="rocket-art" />
              <span className="rocket-smoke rocket-smoke-one" aria-hidden="true" />
              <span className="rocket-smoke rocket-smoke-two" aria-hidden="true" />
              <span className="rocket-smoke rocket-smoke-three" aria-hidden="true" />
            </div>

            <CloudBand className="scene-clouds" />

            <button
              className="launch-button"
              type="button"
              onClick={() => launchRocket(true)}
              aria-label="Launch the rocket and view the invitation details"
            >
              <span className="launch-pulse" aria-hidden="true" />
              <span className="launch-core">
                <span className="launch-badge" aria-hidden="true">
                  <RocketGlyph />
                </span>
                <span className="launch-text">
                  <span className="launch-kicker">Ready for liftoff</span>
                  <span className="launch-title">Launch</span>
                </span>
                <ChevronRight className="launch-chevron" />
              </span>
            </button>
          </div>
        </header>

        <main id="invitation" tabIndex={-1}>
          <section className="invitation-card" aria-labelledby="details-title">
            <p className="ornament" aria-hidden="true">
              <span className="ornament-rule" />
              <StarShape className="ornament-star" />
              <span className="ornament-rule" />
            </p>

            <div className="card-heading">
              <p className="mini-label">
                {guestName ? `${guestName}, you are invited` : "You are invited"}
              </p>
              <h2 id="details-title">Come celebrate with us!</h2>
              <HeartShape className="card-heart" />
            </div>

            <dl className="quick-facts">
              {facts.map((fact) => (
                <div className="fact" key={fact.key}>
                  <dt>
                    <span className={`fact-icon fact-icon--${fact.tone}`} aria-hidden="true">
                      {fact.icon}
                    </span>
                    {fact.label}
                  </dt>
                  <dd>
                    <strong>{fact.value}</strong>
                    {fact.detail ? <span>{fact.detail}</span> : null}
                  </dd>
                </div>
              ))}
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
          <p>Made with joy for {invitation.childName}&apos;s special day</p>
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
