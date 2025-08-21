import { FormSelect } from "react-bootstrap";
import styles from "./select.module.css";
import SvgDelete from "../inputs/images/SvgDelete";

/**
 * Компонент Select
 * @param options - obj { name: string; id: string }
 */
export default function Select({ selectedValue, onChange, placeholder, options, label, name, isClearable, id, ...other }) {
    return (
        <div className={`${styles.wrapper}`}>
            {label &&
                <label
                    htmlFor={other.id || name}
                    className={styles.label}
                >
                    {label}
                </label>
            }
            <FormSelect
                id={id || name}
                name={name}
                className={`${styles.select} ${!selectedValue && styles.placeholder}`}
                value={selectedValue}
                onChange={(el) => {
                    onChange(el.target.value, name);
                }}
                {...other}
            >
                {!selectedValue &&
                    <option value="" disabled selected hidden>{placeholder}</option>
                }
                {options.map((option) => {
                    return <option key={option.id} value={option.id}>{option.name}</option>;
                })}
            </FormSelect>
            {isClearable &&
                <button
                    className={`${styles.delete} ${label ? styles.top30 : styles.top6}`}
                    onClick={() => onChange("", name)}
                >
                    <SvgDelete />
                </button>
            }
        </div>
    )
}
