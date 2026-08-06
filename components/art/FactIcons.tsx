const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  role: "presentation" as const,
  focusable: "false" as const
};

export function CalendarIcon() {
  return (
    <svg {...base}>
      <rect x="3.2" y="5" width="17.6" height="16" rx="3.2" />
      <path d="M3.2 10h17.6M8.4 3v4M15.6 3v4" />
      <circle cx="8.6" cy="14.6" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 7.2V12l3.4 2.2" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg {...base}>
      <path d="M12 21.2c4.2-4.6 6.3-8 6.3-10.6a6.3 6.3 0 1 0-12.6 0c0 2.6 2.1 6 6.3 10.6Z" />
      <circle cx="12" cy="10.4" r="2.5" />
    </svg>
  );
}

export function ShirtIcon() {
  return (
    <svg {...base}>
      <path d="M9 3.4 5 5.6c-.9.5-1.4 1.5-1.2 2.5l.6 2.9 2.4-.6V20a1 1 0 0 0 1 1h8.4a1 1 0 0 0 1-1v-9.6l2.4.6.6-2.9c.2-1-.3-2-1.2-2.5l-4-2.2" />
      <path d="M9 3.4a3 3 0 0 0 6 0" />
    </svg>
  );
}

export function GiftIcon() {
  return (
    <svg {...base}>
      <rect x="3.4" y="9.6" width="17.2" height="11.4" rx="2.4" />
      <path d="M3.4 13.8h17.2M12 9.6V21" />
      <path d="M12 9.6C10.4 6.4 9.2 4.8 7.6 4.8a2.2 2.2 0 0 0 0 4.4M12 9.6c1.6-3.2 2.8-4.8 4.4-4.8a2.2 2.2 0 0 1 0 4.4" />
    </svg>
  );
}
