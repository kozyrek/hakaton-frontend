import { useEffect, useState, createRef } from "react";
import TeamRating from "../team-rating/teamRating";

import styles from "./teamInfo.module.css";

export default function TeamInfo({obj, arr}) {
    const [isCompleteText, setIsCompleteText]= useState(false);
    const [readMore, setReadMore] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const refList = createRef();

    useEffect(() => {
        if (arr.steps?.length > 0) {
            console.log(arr.step.length)
            const height = refList.current.getBoundingClientRect().height;
            console.log("xbn", height)
            if (height > 704) {
                setShowButton(true);
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (arr) {
            const addText = () => {
                const arr1 = [];
                arr.forEach((item) => {
                    if (item.text) {
                        arr1.push(item.text)
                    }
                    // console.log("текст добавлен", arr1.length > 0)
                    setIsCompleteText(arr1.length > 0)
                })
            }
            addText();
        }
    }, [arr])

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            {obj && <>
                <div>
                    <h2 className={`titleH2 ${styles.title}`}>Команда {obj.name}</h2>
                    {isCompleteText 
                    ? <ul 
                        ref={refList}
                        className={`${styles.textList} ${!readMore ? styles.isCutText : ""}`}
                    >
                        {arr.sort((a, b) => {return a.stepNumber - b.stepNumber}).map((item) => (
                            item.text && <li key={item.id}>
                                <p className="text1">{JSON.parse(item.text).text}</p>
                            </li>
                        ))}
                    </ul>
                    : <p className="text1">Вы&nbsp;пока не&nbsp;загрузили текст</p>}
                    
                    {!showButton && <button 
                        className={`text2 ${styles.buttonMore}`}
                        onClick={() => setReadMore(!readMore)}>
                        {readMore ? "Скрыть подробности" : "Читать полностью"}
                    </button>}
                </div>         
                <TeamRating arr={arr} />
            </>}
            {!obj && <p className="text1">Команда ещё не назначена</p>}
        </div>
    )
}