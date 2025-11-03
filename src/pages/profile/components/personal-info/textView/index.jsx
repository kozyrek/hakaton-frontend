import PaperClip from "./images/PaperClip";
import styles from "./index.module.css";

export default function TextView({ title, text, documents }) {
  // Режим отображения документов
  if (documents && Array.isArray(documents)) {
    return (
      <div className={styles.textView}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.documentsContainer}>
          {documents.length === 0 ? (
            <div className={styles.noDocuments}>Нет загруженных документов</div>
          ) : (
            documents.map((doc, index) => (
              <div key={doc?.id || index} className={styles.documentItem}>
                <div className={styles.documentIcon}>
                  <PaperClip />
                </div>
                <div className={styles.documentInfo}>
                  <a 
                    href={doc?.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.documentName}
                  >
                    {doc?.name || `Документ ${index + 1}`}
                  </a>
                  <div className={styles.documentMeta}>
                    {/* {doc?.size && (
                      <span className={styles.fileSize}>
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    )} */}
                    {doc?.mimetype && (
                      <span className={styles.fileType}>
                        {doc.mimetype.split('/')[1]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Режим отображения обычного текста
  return (
    <div className={styles.textView}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.text}>
        {!text || text.toString().trim() === '' ? (
          <div className={styles.emptyText}>—</div>
        ) : (
          text
        )}
      </div>
    </div>
  );
}