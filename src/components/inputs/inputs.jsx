import ShowPassword from "../../pages/home/auth/images/showPassword";
import SvgDelete from "./images/SvgDelete";
import styles from "./index.module.css";

export default function Inputs(props) {
  const { name, label, type, ...other } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={styles.loginInput}
        {...other}
      />
      <button
        className={styles.delete}
        // onClick={() => setIsShowPassword(!isShowPassword)}
      >
        {type === "password" ? <ShowPassword /> : <SvgDelete />}
      </button>
    </div>
  );
}
