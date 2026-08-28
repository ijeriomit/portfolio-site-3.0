import "./statistics-row.scss";

const STATS = [
  { icon: "</>", value: "7+",  label: "Years Experience"   },
  { icon: "▦",   value: "3", label: "Engineers Mentored" },
  { icon: ">_",  value: "10+", label: "Technologies"       },
];

export default function StatisticsRow() {
  return (
    <div className="statistics-row" role="list">
      {STATS.map((stat) => (
        <div className="statistics-row__item" key={stat.label} role="listitem">
          <span className="statistics-row__icon" aria-hidden="true">{stat.icon}</span>
          <div className="statistics-row__text">
            <span className="statistics-row__value">{stat.value}</span>
            <span className="statistics-row__label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
