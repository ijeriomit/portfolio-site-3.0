import { useMemo } from "react";
import "./matrix-background.scss";

const COLUMNS_DESKTOP = [
  [4,  "1"], [8,  "3"], [12, "2"], [16, "6"], [18, "3"],
  [20, ""],  [24, "2"], [28, "7"], [32, "1"], [36, "5"],
  [40, "2"], [44, ""],  [48, "5"], [52, "3"], [56, "6"],
  [60, ""],  [64, "7"], [66, ""],  [68, "3"], [72, "4"],
  [76, "2"], [80, "5"], [84, "1"], [86, "2"], [88, "6"],
  [92, "4"], [96, "3"], [100,"1"],
];

const COLUMNS_MOBILE = [
  [4,  "1"], [12, "3"], [24, "2"], [36, "6"],
  [48, ""],  [60, "5"], [72, "3"], [84, "7"],
  [92, "2"], [100,"4"],
];

export default function MatrixBackground({ className }) {
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches,
    []
  );
  const columns = isMobile ? COLUMNS_MOBILE : COLUMNS_DESKTOP;

  return (
    <div className={(className ? className + " " : "") + "matrix-bg"}>
      <div className="section-bg-gradient">
        {columns.map(([left, variant], i) => (
          <span
            key={i}
            className={"binary-code rain-animation" + (variant ? "-" + variant : "")}
            style={{ left: `${left}%` }}
          />
        ))}
      </div>
      <div className="section-bg"></div>
    </div>
  );
}
