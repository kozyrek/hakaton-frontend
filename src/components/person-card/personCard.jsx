import styles from "./personCard.module.css";

export default function PersonCard({ item }) {
    return (
        <>
            <div className={styles.imageWrapper}>
                <img src={item.url} alt="Фотография руководителя"></img>
            </div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.description}>{item.description}</p>
        </>
    )
}