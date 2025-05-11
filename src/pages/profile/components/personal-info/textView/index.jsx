import PaperClip from "./images/PaperClip";
import styles from "./index.module.css";

export default function TextView(props) {
  const { title, text } = props;
  return (
    <>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.text}>
        {text === null || text?.length === 0 ? (
          <div>-</div>
        ) : typeof text === "string" ? (
          text
        ) : (
          text.map((value, index) => (
            <div
              key={index}
              className={styles.text}
            >
              {title ? (
                value.name
              ) : (
                <div className={styles.download}>
                  <div>
                    <PaperClip />
                  </div>
                  <div className={styles.downloadText}>{value.name}</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
