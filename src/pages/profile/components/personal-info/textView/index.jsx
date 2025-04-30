import PaperClip from "./images/PaperClip";
import styles from "./index.module.css";

export default function TextView(props) {
  const { title, text } = props;
  return (
    <>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>
        {text.length === 0 && <div>-</div>}
        {typeof text === "string" ? (
          text
        ) : (
          <>
            {text.map((value, index) => {
              return (
                <div key={index} className={styles.text}>
                  {title ? (
                    value
                  ) : (
                    <div className={styles.download}>
                      <div>
                        <PaperClip />
                      </div>
                      <div className={styles.downloadText}>{value}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
