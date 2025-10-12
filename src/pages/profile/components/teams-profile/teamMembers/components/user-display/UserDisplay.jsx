import DeleteButton from "../../../../../ui/deleteBtn/deleteButton";
import styles from "./UserDisplay.module.css";

export default function UserDisplay({ item, onSubmit, onCheckboxChange, isChecked, disabled }) {
  return (
    <li key={item.id} className={`${styles.participantItem}`}>
      <input
        type="checkbox"
        name="policy"
        id={`policy-${item.id}`}
        className={styles.consentCheckBox}
        checked={isChecked || false}
        onChange={(e) => onCheckboxChange && onCheckboxChange(e.target.checked)}
        disabled={disabled}
      />
      <div className={`${styles.participantInfo}`}>
        {item.lastName} &nbsp;
        {item.firstName} &nbsp;
        {item.patronymic}
      </div>
      <div>
        <DeleteButton
          className={styles.removeButton}
          onClick={() => onSubmit(item)}
          disabled={disabled}
        >
          Добавить
        </DeleteButton>
      </div>
    </li>
  );
}