import { StarShape } from "@/components/art/Illustrations";

type Sparkle = {
  left: string;
  top: string;
  size: number;
  tone: "orange" | "navy" | "yellow" | "blue";
  kind: "star" | "dot";
};

// Fixed positions keep the server and client markup identical.
const sparkles: Sparkle[] = [
  { left: "7%", top: "3%", size: 28, tone: "orange", kind: "star" },
  { left: "90%", top: "6%", size: 22, tone: "navy", kind: "star" },
  { left: "17%", top: "9%", size: 9, tone: "blue", kind: "dot" },
  { left: "82%", top: "12%", size: 15, tone: "yellow", kind: "star" },
  { left: "27%", top: "5%", size: 7, tone: "orange", kind: "dot" },
  { left: "72%", top: "3%", size: 8, tone: "yellow", kind: "dot" },
  { left: "3%", top: "16%", size: 14, tone: "yellow", kind: "star" },
  { left: "96%", top: "18%", size: 9, tone: "orange", kind: "dot" },
  { left: "12%", top: "24%", size: 8, tone: "blue", kind: "dot" },
  { left: "88%", top: "26%", size: 17, tone: "blue", kind: "star" },
  { left: "5%", top: "31%", size: 12, tone: "orange", kind: "star" },
  { left: "94%", top: "34%", size: 13, tone: "yellow", kind: "star" },
  { left: "22%", top: "29%", size: 7, tone: "navy", kind: "dot" },
  { left: "78%", top: "37%", size: 8, tone: "orange", kind: "dot" },
  { left: "9%", top: "41%", size: 16, tone: "navy", kind: "star" },
  { left: "92%", top: "44%", size: 10, tone: "blue", kind: "dot" },
  { left: "31%", top: "40%", size: 11, tone: "yellow", kind: "star" },
  { left: "66%", top: "43%", size: 7, tone: "blue", kind: "dot" }
];

export function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={`${sparkle.left}-${sparkle.top}`}
          className={`sparkle sparkle--${sparkle.tone} sparkle--${sparkle.kind}`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size
          }}
        >
          {sparkle.kind === "star" ? <StarShape /> : null}
        </span>
      ))}
    </div>
  );
}
