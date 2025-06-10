import DeleteButton from "../../../../../ui/deleteBtn/deleteButton";
import styles from "./UserDisplay.module.css";

export default function UserDisplay({ item, onSubmit }) {
  return (
    <li
      key={item.id}
      className={`${styles.participantItem}`}
    >
      <input
        type="checkbox"
        name="policy"
        id="policy"
        className={styles.consentCheckBox}
        // onChange={() => handleChange(!formData["policy"].value, "policy")}
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
        >
          Добавить
        </DeleteButton>
      </div>
    </li>
  );
}
