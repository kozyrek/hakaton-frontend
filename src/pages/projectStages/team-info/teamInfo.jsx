import { useEffect, useState, createRef } from "react";
import TeamRating from "../team-rating/teamRating";
import styles from "./teamInfo.module.css";

export default function TeamInfo({ obj, arr }) {
    const [isCompleteText, setIsCompleteText] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const refList = createRef();

    useEffect(() => {
        if (arr && arr.length > 0) {
            const height = refList.current?.getBoundingClientRect().height || 0;
            if (height >= 704) {
                setShowButton(true);
            }
        }
    }, [arr, refList]);

    useEffect(() => {
        if (arr && arr.length > 0) {
            const hasText = arr.some(item => item.text);
            setIsCompleteText(hasText);
        } else {
            setIsCompleteText(false);
        }
    }, [arr]);

    // Если команда не назначена
    if (!obj) {
        return (
            <div className={`contentBox ${styles.wrapper}`}>
                <h2 className={`titleH2 ${styles.title}`}>Команда</h2>
                <p className="text1">Команда не назначена</p>
            </div>
        );
    }

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            <div>
                <h2 className={`titleH2 ${styles.title}`}>Команда {obj.name}</h2>
                {isCompleteText ? (
                    <ul 
                        ref={refList}
                        className={`${styles.textList} ${!readMore ? styles.isCutText : ""}`}
                    >
                        {arr.sort((a, b) => a.stepNumber - b.stepNumber).map((item) => (
                            item.text && (
                                <li key={item.id}>
                                    <p className="text1">{JSON.parse(item.text).text}</p>
                                </li>
                            )
                        ))}
                    </ul>
                ) : (
                    <p className="text1">Вы пока не загрузили текст</p>
                )}
                
                {showButton && (
                    <button 
                        className={`text2 ${styles.buttonMore}`}
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? "Скрыть подробности" : "Читать полностью"}
                    </button>
                )}
            </div>         
            <TeamRating arr={arr} />
        </div>
    );
}