import { NavLink } from "react-router-dom";

type Props = {
  textValue: string;
  hasIcon: boolean;
  bg: string;
  iconSrc?: string;
  iconLeading?: boolean;
  to?: string;
  end?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  const { textValue, hasIcon, iconLeading, bg, iconSrc, to, end, onClick } = props;

  const combinedClassName = `btn ${bg}`;
  const renderIcon = () => hasIcon && iconSrc && <img src={iconSrc} alt="icon" className="icon" />;

  if (to) {
    return (
      <NavLink className={combinedClassName} to={to} end={end}>
        {iconLeading && renderIcon()}
        {textValue}
        {!iconLeading && renderIcon()}
      </NavLink>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick}>
      {iconLeading && renderIcon()}
      {textValue}
      {!iconLeading && renderIcon()}
    </button>
  );
};

export default Button;
