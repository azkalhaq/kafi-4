import { StarShape } from "@/components/art/Illustrations";

type Sparkle = {
  left: string;
  top: string;
  size: number;
  tone: "orange" | "navy" | "yellow" | "blue" | "mint" | "pink";
  kind: "star" | "dot" | "cross" | "orb";
  motion?: "twinkle" | "drift" | "spin";
};

function CrossShape() {
  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        d="M10.2 2.4h3.6v7.8h7.8v3.6h-7.8v7.8h-3.6v-7.8H2.4v-3.6h7.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Fixed positions keep the server and client markup identical.
const sparkles: Sparkle[] = [
  // Top / hero
  { left: "7%", top: "3%", size: 28, tone: "orange", kind: "star", motion: "twinkle" },
  { left: "90%", top: "6%", size: 22, tone: "navy", kind: "star", motion: "spin" },
  { left: "17%", top: "9%", size: 9, tone: "blue", kind: "dot", motion: "twinkle" },
  { left: "82%", top: "12%", size: 15, tone: "yellow", kind: "star", motion: "twinkle" },
  { left: "27%", top: "5%", size: 7, tone: "orange", kind: "dot", motion: "twinkle" },
  { left: "72%", top: "3%", size: 8, tone: "yellow", kind: "dot", motion: "twinkle" },
  { left: "3%", top: "16%", size: 14, tone: "yellow", kind: "star", motion: "drift" },
  { left: "96%", top: "18%", size: 9, tone: "orange", kind: "dot", motion: "twinkle" },
  { left: "12%", top: "24%", size: 8, tone: "blue", kind: "dot", motion: "twinkle" },
  { left: "88%", top: "26%", size: 17, tone: "blue", kind: "star", motion: "twinkle" },
  { left: "5%", top: "31%", size: 12, tone: "orange", kind: "star", motion: "spin" },
  { left: "94%", top: "34%", size: 13, tone: "yellow", kind: "star", motion: "drift" },
  { left: "22%", top: "29%", size: 7, tone: "navy", kind: "dot", motion: "twinkle" },
  { left: "78%", top: "37%", size: 8, tone: "orange", kind: "dot", motion: "twinkle" },
  { left: "9%", top: "41%", size: 16, tone: "navy", kind: "star", motion: "twinkle" },
  { left: "92%", top: "44%", size: 10, tone: "blue", kind: "dot", motion: "twinkle" },
  { left: "31%", top: "40%", size: 11, tone: "yellow", kind: "star", motion: "drift" },
  { left: "66%", top: "43%", size: 7, tone: "blue", kind: "dot", motion: "twinkle" },

  // Mid / invitation card area
  { left: "4%", top: "52%", size: 18, tone: "yellow", kind: "star", motion: "twinkle" },
  { left: "95%", top: "54%", size: 14, tone: "orange", kind: "cross", motion: "spin" },
  { left: "8%", top: "58%", size: 10, tone: "mint", kind: "orb", motion: "drift" },
  { left: "91%", top: "60%", size: 12, tone: "blue", kind: "star", motion: "twinkle" },
  { left: "14%", top: "63%", size: 8, tone: "pink", kind: "dot", motion: "twinkle" },
  { left: "86%", top: "65%", size: 16, tone: "navy", kind: "star", motion: "drift" },
  { left: "3%", top: "68%", size: 11, tone: "orange", kind: "cross", motion: "twinkle" },
  { left: "97%", top: "70%", size: 9, tone: "yellow", kind: "dot", motion: "twinkle" },

  // Bottom / message + footer
  { left: "6%", top: "76%", size: 22, tone: "blue", kind: "star", motion: "drift" },
  { left: "93%", top: "78%", size: 18, tone: "orange", kind: "star", motion: "twinkle" },
  { left: "11%", top: "82%", size: 12, tone: "yellow", kind: "cross", motion: "spin" },
  { left: "88%", top: "83%", size: 14, tone: "mint", kind: "orb", motion: "drift" },
  { left: "18%", top: "86%", size: 8, tone: "navy", kind: "dot", motion: "twinkle" },
  { left: "80%", top: "87%", size: 20, tone: "yellow", kind: "star", motion: "twinkle" },
  { left: "5%", top: "90%", size: 15, tone: "pink", kind: "star", motion: "drift" },
  { left: "94%", top: "91%", size: 11, tone: "blue", kind: "cross", motion: "twinkle" },
  { left: "24%", top: "93%", size: 10, tone: "orange", kind: "orb", motion: "drift" },
  { left: "76%", top: "94%", size: 9, tone: "mint", kind: "dot", motion: "twinkle" },
  { left: "48%", top: "96%", size: 13, tone: "yellow", kind: "star", motion: "twinkle" },
  { left: "62%", top: "88%", size: 7, tone: "orange", kind: "dot", motion: "twinkle" },
  { left: "35%", top: "79%", size: 8, tone: "blue", kind: "dot", motion: "twinkle" }
];

export function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={`${sparkle.kind}-${sparkle.left}-${sparkle.top}`}
          className={`sparkle sparkle--${sparkle.tone} sparkle--${sparkle.kind} sparkle-motion--${sparkle.motion ?? "twinkle"}`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size
          }}
        >
          {sparkle.kind === "star" ? <StarShape /> : null}
          {sparkle.kind === "cross" ? <CrossShape /> : null}
        </span>
      ))}
    </div>
  );
}
