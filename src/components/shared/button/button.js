import "./button.scss";

// variant: "primary" (green fill) | "secondary" (outlined)
export default function Button({ children, onClick, href, type = "button", variant = "primary" }) {
  const className = `btn btn--${variant}`;

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
