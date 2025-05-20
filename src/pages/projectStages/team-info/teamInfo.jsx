import { useEffect, useState } from "react";
import TeamRating from "../team-rating/teamRating";

import styles from "./teamInfo.module.css";

export default function TeamInfo({obj, arr}) {
    const [isCompleteText, setIsCompleteText]= useState(false);
    const [overallRating, setOverallRating] = useState(0);

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

    useEffect(() => {
        if (arr) {
            setOverallRating(
                arr.reduce((prev, item) => {
                    const sum = prev + item.score;
                    // console.log('рейтинг команды', sum)
                    return sum;
                }, 0)
            );
        }
    }, [arr])

    return (
        <div className={`contentBox ${styles.wrapper}`}>
            {obj && <>
                <div>
                    <h2 className={`titleH2 ${styles.title}`}>Команда {obj.name}</h2>
                    {isCompleteText 
                    ? <ul >
                        {arr.map((item) => (
                            item.text && <li key={item.id}>
                                <p className="text1">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                    : <p className="text1">Вы&nbsp;пока не&nbsp;загрузили текст</p>}
                </div>         
                <TeamRating value={overallRating}/>
            </>}
            {!obj && <p className="text1">Команда ещё не назначена</p>}
        </div>
    )
}