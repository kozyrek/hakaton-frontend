import styles from "./textarea.module.css";
import SvgDelete from "../inputs/images/SvgDelete";

export default function Textarea({value, maxLength, onChange, placeholder, ...other}) {
    const handleClick = () => {
    }
    return (
        <div className={`${styles.textareaWrapper}`}>
            <textarea
                className={`${styles.textarea} ${other.addClass}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                {...other}
            ></textarea>
            <div className={styles.length}>
                {value.length || 0}/{maxLength}
            </div>
            {!other.disabled && <button
                className={styles.buttonDelete}
                onClick={() => handleClick}
            >
                <SvgDelete />
            </button>}
        </div>
    )
}