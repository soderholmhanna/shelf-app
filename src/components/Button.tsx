import { NavLink } from "react-router-dom";

type Props = {
  textValue: string;
  hasIcon: boolean;
  bg: string;
  iconSrc?: string;
  to?: string;
  end?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  const { textValue, hasIcon, bg, iconSrc, to, end, onClick } = props;

  const combinedClassName = `btn ${bg}`;

  if (to) {
    return (
      <NavLink className={combinedClassName} to={to} end={end}>
        {hasIcon && iconSrc && <img src={iconSrc} alt="icon" />}
        {textValue}
      </NavLink>
    );
  }

  return (
    <button className={bg} onClick={onClick}>
      {hasIcon && iconSrc && <img src={iconSrc} alt="icon" />}
      {textValue}
    </button>
  );
};

export default Button;
