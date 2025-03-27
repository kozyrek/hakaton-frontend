import { Link } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./button.module.css";

export default function Button({
  text,
  path,
  large,
  white,
  addClass,
  bigmenu,
  menu,
  onClick,
  isActive,
  disabled = false,
  ...restProps
}) {
  const className = cn(addClass, {
    [styles.button]: !bigmenu && !menu,
    [styles.menuButton]: bigmenu || menu,
    [styles.bigMenuButton]: bigmenu,
    [styles.menuBtn]: menu,
    [styles.active]: isActive && (bigmenu || menu),
    [styles.buttonLarge]: large && !(bigmenu || menu),
    [styles.buttonSmall]: !large && !(bigmenu || menu),
    [styles.buttonWhite]: white && !(bigmenu || menu),
    [styles.buttonBlue]: !white && !(bigmenu || menu),
    [styles.disabled]: disabled,
  });

  if (disabled && path) {
    return (
      <span
        className={cn(className, styles.disabledLink)}
        aria-disabled="true"
        {...restProps}
      >
        {text}
      </span>
    );
  }

  return path ? (
    <Link
      to={path}
      className={className}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      aria-disabled={disabled}
      {...restProps}
    >
      {text}
    </Link>
  ) : (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.node.isRequired,
  path: PropTypes.string,
  large: PropTypes.bool,
  white: PropTypes.bool,
  addClass: PropTypes.string,
  bigmenu: PropTypes.bool,
  menu: PropTypes.bool,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
};
