import IconAvatar from "./images/iconAvatar";
import styles from "./personCard.module.css";

export default function PersonCard({ item }) {
    return (
        <>
            {item.url ?
            <div className={styles.imageWrapper}>
                <img src={item.url} alt="Фотография руководителя"></img>
            </div>
            :
            <div className={`${styles.imageWrapper} ${styles.avatar}`}>
                <IconAvatar />
            </div>
            }
            
            <p className={`text3 ${styles.name}`}>{item.name}</p>
            <p className={`text1 ${styles.description}`}>{item.description}</p>
        </>
    )
}