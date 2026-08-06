export function RocketArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 372" role="presentation" focusable="false">
      <defs>
        <linearGradient id="rocket-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="55%" stopColor="#f6ecd9" />
          <stop offset="100%" stopColor="#e6d8c1" />
        </linearGradient>
        <linearGradient id="rocket-nose" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#f8896a" />
          <stop offset="60%" stopColor="#ef6f4e" />
          <stop offset="100%" stopColor="#d8583a" />
        </linearGradient>
        <radialGradient id="rocket-glass" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#dbe8ff" />
          <stop offset="45%" stopColor="#9fbdf3" />
          <stop offset="100%" stopColor="#6b91dd" />
        </radialGradient>
        <linearGradient id="rocket-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd45f" />
          <stop offset="55%" stopColor="#ff9d3c" />
          <stop offset="100%" stopColor="#f4653a" />
        </linearGradient>
      </defs>

      <g className="rocket-flame">
        <path
          d="M100 372c-18-27-30-48-30-66 0-15 13-27 30-31 17 4 30 16 30 31 0 18-12 39-30 66Z"
          fill="url(#rocket-flame)"
        />
        <path
          d="M100 352c-9-17-15-30-15-40 0-8 7-14 15-16 8 2 15 8 15 16 0 10-6 23-15 40Z"
          fill="#ffe89a"
        />
      </g>

      <g fill="url(#rocket-nose)" stroke="#21365c" strokeWidth="5" strokeLinejoin="round">
        <path d="M53 178c-24 24-37 57-35 94 13-10 26-19 35-25Z" />
        <path d="M147 178c24 24 37 57 35 94-13-10-26-19-35-25Z" />
      </g>

      <path
        d="M100 12c27 33 49 92 49 165v83H51v-83c0-73 22-132 49-165Z"
        fill="url(#rocket-body)"
        stroke="#21365c"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d="M100 12c13 16 23 38 30 64H70c7-26 17-48 30-64Z"
        fill="url(#rocket-nose)"
        stroke="#21365c"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <rect
        x="48"
        y="243"
        width="104"
        height="30"
        rx="10"
        fill="#2f4670"
        stroke="#21365c"
        strokeWidth="5"
      />
      <path
        d="M63 273h74l-8 26H71Z"
        fill="#2f4670"
        stroke="#21365c"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d="M100 222c11 20 11 62 0 84-11-22-11-64 0-84Z"
        fill="url(#rocket-nose)"
        stroke="#21365c"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <circle cx="100" cy="142" r="37" fill="#2f4670" stroke="#21365c" strokeWidth="5" />
      <circle cx="100" cy="142" r="27" fill="url(#rocket-glass)" />
      <path
        d="M87 133c3-6 8-10 14-11-7 4-11 9-12 15-1 4-4 4-3 0 0-1 0-3 1-4Z"
        fill="#ffffff"
        opacity="0.85"
      />
      <g fill="#21365c" opacity="0.45">
        <circle cx="100" cy="108" r="3" />
        <circle cx="126" cy="124" r="3" />
        <circle cx="126" cy="160" r="3" />
        <circle cx="100" cy="176" r="3" />
        <circle cx="74" cy="160" r="3" />
        <circle cx="74" cy="124" r="3" />
      </g>
    </svg>
  );
}

const craters = [
  { cx: 62, cy: 58, r: 17 },
  { cx: 128, cy: 44, r: 10 },
  { cx: 156, cy: 92, r: 21 },
  { cx: 78, cy: 128, r: 24 },
  { cx: 44, cy: 104, r: 11 },
  { cx: 116, cy: 156, r: 13 },
  { cx: 150, cy: 148, r: 8 },
  { cx: 100, cy: 92, r: 7 },
  { cx: 90, cy: 176, r: 9 },
  { cx: 36, cy: 148, r: 6 }
];

export function MoonArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="presentation" focusable="false">
      <defs>
        <radialGradient id="moon-face" cx="0.34" cy="0.26" r="0.85">
          <stop offset="0%" stopColor="#ffe694" />
          <stop offset="55%" stopColor="#fbcc5c" />
          <stop offset="100%" stopColor="#eda92f" />
        </radialGradient>
        <clipPath id="moon-clip">
          <circle cx="100" cy="100" r="98" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#moon-face)" />
      <g clipPath="url(#moon-clip)">
        {craters.map((crater) => (
          <g key={`${crater.cx}-${crater.cy}`}>
            <circle cx={crater.cx} cy={crater.cy} r={crater.r} fill="#e2a02c" opacity="0.55" />
            <circle
              cx={crater.cx}
              cy={crater.cy - crater.r * 0.18}
              r={crater.r * 0.82}
              fill="#ffd970"
              opacity="0.45"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function RingedPlanetArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 200" role="presentation" focusable="false">
      <defs>
        <radialGradient id="planet-face" cx="0.34" cy="0.26" r="0.9">
          <stop offset="0%" stopColor="#d5f5e4" />
          <stop offset="45%" stopColor="#93dcc1" />
          <stop offset="100%" stopColor="#4fb59b" />
        </radialGradient>
        <linearGradient id="planet-ring-grad" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#93aede" />
          <stop offset="50%" stopColor="#6d8ecb" />
          <stop offset="100%" stopColor="#8aa6d8" />
        </linearGradient>
        <clipPath id="planet-clip">
          <circle cx="110" cy="96" r="72" />
        </clipPath>
      </defs>

      <g transform="rotate(-16 110 104)">
        <ellipse
          cx="110"
          cy="104"
          rx="104"
          ry="31"
          fill="none"
          stroke="url(#planet-ring-grad)"
          strokeWidth="14"
        />
      </g>

      <circle cx="110" cy="96" r="72" fill="url(#planet-face)" />
      <g clipPath="url(#planet-clip)" fill="#5fc3a6" opacity="0.55">
        <path d="M20 60c60-14 130-10 180 4v13c-52-13-122-17-180-3Z" />
        <path d="M20 100c60-14 130-10 180 4v14c-52-13-122-17-180-4Z" />
        <path d="M28 140c56-13 120-9 168 3v14c-50-12-114-16-168-3Z" />
      </g>

      <g transform="rotate(-16 110 104)">
        <path
          d="M6 104a104 31 0 0 0 208 0"
          fill="none"
          stroke="url(#planet-ring-grad)"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function CloudBand({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3e6d6" />
        </linearGradient>
      </defs>
      <g fill="url(#cloud-grad)">
        <path
          opacity="0.75"
          d="M0 148c74 0 92-46 152-46 44 0 62 26 104 26 40 0 56-34 106-34 46 0 66 30 112 30 44 0 64-32 116-32 50 0 70 34 118 34 44 0 62-26 104-26 58 0 82 44 156 44v76H0Z"
        />
        <path d="M0 182c66 0 84-38 140-38 42 0 60 22 98 22 38 0 54-28 100-28 44 0 62 26 106 26 42 0 60-26 110-26 46 0 66 28 110 28 42 0 60-20 100-20 54 0 78 36 148 36v38H0Z" />
      </g>
    </svg>
  );
}

export function OrbitArc({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" role="presentation" focusable="false">
      <path
        d="M128 10C56 34 18 92 34 170"
        fill="none"
        stroke="#e9a184"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="9 13"
      />
    </svg>
  );
}

export function StarShape({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" focusable="false">
      <path d="M12 1.6c.4 0 .8.25 1 .63l2.4 4.9 5.4.78c.42.06.77.35.9.75.13.4.02.84-.28 1.13l-3.9 3.8.92 5.37c.07.42-.1.84-.45 1.09-.35.25-.8.28-1.18.08L12 17.6l-4.8 2.5c-.38.2-.83.17-1.18-.08-.35-.25-.52-.67-.45-1.09l.92-5.37-3.9-3.8c-.3-.29-.41-.73-.28-1.13.13-.4.48-.69.9-.75l5.4-.78 2.4-4.9c.2-.38.6-.63 1-.63Z" />
    </svg>
  );
}

export function HeartShape({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" focusable="false">
      <path d="M12 21S3.5 15.4 3.5 9.6A5.1 5.1 0 0 1 12 6.3a5.1 5.1 0 0 1 8.5 3.3C20.5 15.4 12 21 12 21Z" />
    </svg>
  );
}

export function RocketGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      focusable="false"
    >
      <path d="M12 2c3 3 4.6 7 4.6 11.3L12 17l-4.6-3.7C7.4 9 9 5 12 2Z" />
      <path d="M7.4 12.4 4.6 14l.7 4.2 3-1.7M16.6 12.4l2.8 1.6-.7 4.2-3-1.7" />
      <circle cx="12" cy="9.6" r="1.7" />
    </svg>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
      focusable="false"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
