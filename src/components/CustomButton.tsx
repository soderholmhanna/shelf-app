import { Link } from "react-router-dom";

type Props = {
  textValue: string;
  hasIcon: boolean;
  classes: string;
  iconSrc?: string;
  iconLeading?: boolean;
  to?: string;
  onClick?: () => void;
};

const CustomButton = (props: Props) => {
  const { textValue, hasIcon, iconLeading, classes, iconSrc, to, onClick } = props;

  const combinedClassName = `btn ${classes}`;
  const renderIcon = () => hasIcon && iconSrc && <img src={iconSrc} alt="icon" className="icon" />;

  if (to) {
    return (
      <Link className={combinedClassName} to={to}>
        {iconLeading && renderIcon()}
        {textValue}
        {!iconLeading && renderIcon()}
      </Link>
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

export default CustomButton;
