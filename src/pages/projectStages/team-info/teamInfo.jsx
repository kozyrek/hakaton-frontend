import TeamRating from "../team-rating/teamRating";

import styles from "./teamInfo.module.css";

export default function TeamInfo({obj}) {
    return (
        <div className={`contentBox ${styles.wrapper}`}>
            <div>
                <h2 className={`titleH2 ${styles.title}`}>Команда {obj.title}</h2>
                <p className="text1">{obj.description ? obj.description : "Вы\u00A0пока не\u00A0загрузили текст"}</p>
            </div>
            <TeamRating value={obj.overallRating}/>
        </div>
    )
}