const noop = () => {};

type SwitchProps = {
  className?: string;
  "aria-label"?: string;
  on?: boolean;
  onClick?: () => void;
};

const defaultProps: SwitchProps = {
  className: "",
  "aria-label": "Toggle",
};

const Switch = (props: SwitchProps) => {
  const {
    on,
    className = "",
    "aria-label": ariaLabel,
    onClick,
    ...rest
  } = props;

  const btnClassName = [
    className,
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label aria-label={ariaLabel || "Toggle"} style={{ display: "block" }}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} {...rest} />
    </label>
  );
};

Switch.defaultProps = defaultProps;

export default Switch;
