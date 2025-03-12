import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./button.module.css";

export default function Button(props) {
    const { text, path, large, white, addClass, bigmenu, menu, onClick, isActive, disabled } = props;

    const className = cn(addClass, {
        [styles.button]: !bigmenu && !menu, 
        [styles.menuButton]: bigmenu || menu, 
        [styles.bigMenuButton]: bigmenu, 
        [styles.menuBtn]: menu, 
        [styles.active]: isActive && (bigmenu || menu),
        ...(!(bigmenu || menu) && {
          [styles.buttonLarge]: large,
          [styles.buttonSmall]: !large,
          [styles.buttonWhite]: white,
          [styles.buttonBlue]: !white,
          [styles.disabled]: path && disabled,
        })
    });

    return path ? (
        <Link to={path} className={className}>{text}</Link>
    ) : (
        <button className={className} onClick={onClick} disabled={disabled}>{text}</button>
    );
}
