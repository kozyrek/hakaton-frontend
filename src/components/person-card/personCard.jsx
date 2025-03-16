import styles from "./personCard.module.css";

export default function PersonCard({ item }) {
    return (
        <>
            <div className={styles.imageWrapper}>
                <img src={item.url} alt="Фотография руководителя"></img>
            </div>
            <p className={`text3 ${styles.name}`}>{item.name}</p>
            <p className={`text1 ${styles.description}`}>{item.description}</p>
        </>
    )
}