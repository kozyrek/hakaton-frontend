import styles from "./teamRating.module.css";

export default function TeamRating({value}) {
    return (
        <div className={styles.wrapper}>
            <span>Общая оценка команды</span>
            <span className={styles.rating}>{value}</span>
            <span>
                {value === 1 && "балл"}
                {value >=2 && value <= 4 && "балла"}
                {value >= 5 && "баллов"}
            </span>
        </div>
    )
}