import { useEffect, useState } from "react";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import Input from "../../../components/inputs/inputs";
import Button from "../../../components/button/button";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import { useResize } from "../../../hooks/useResize";

import styles from "./headTeam.module.css";

export default function HeadTeam({team}) {
    const [isOpenChangeTeam, setIsOpenChangeTeam] = useState(false);
    const [mentor, setMentor] = useState("");//-----запрос по mentorId?
    const [formData, setFormData] = useState({
        teamName: { value: "", type: "text" },
    });
    const [formError, setFormError] = useState({
        teamName: "",
    });

    const width = useResize();

// дописать функцию---------------------------
    const handleChangeTeam = () => {

        setIsOpenChangeTeam(false)
    }

    const handleChange = (value, name = "teamName") => {
        setFormData({
        ...formData,
        [name]: { value: value, type: "text" },
        });
    };

    return (
        <section className={styles.wrapper}>
            <div>
                <h1 className="titleH1">Команда {team.name}</h1>
                <button
                className={styles.btnEdit}
                    type="button"
                    onClick={() => setIsOpenChangeTeam(true)}
                >
                    <Pencil 
                        width={width < 769 ? 12 : 18}
                        height={width < 769 ? 12 : 18}
                        aria-hidden="true"
                    />
                </button>
            </div>

            <div className={styles.mentorBlock}>
                <div className={styles.imgWrapper}>
                    {mentor.photoPath && 
                    <img src={mentor.photoPath} alt="Фотография ментора"></img>}
                </div>
                <div className={styles.nameWrapper}>
                    <span className="text3">Ментор команды</span>
                    {/* ---- подставить данные ментора ----*/}
                    <br></br>
                    <span className="text1">{mentor.lastName} {mentor.firstName} TEST TEST</span>
                </div>
            </div>
            
            <ModalWrapper
                isOpen={isOpenChangeTeam}
                onClose={() => setIsOpenChangeTeam(false)}
            >
                <ModalWindow 
                    title="Изменение названия команды"
                    buttonArea={[
                        <Button
                            large
                            text="Изменить"
                            onClick={handleChangeTeam}
                        />,
                        <Button
                            large
                            violet
                            text="Отменить"
                            onClick={() => setIsOpenChangeTeam(false)}
                        />,
                    ]}
                >
                    <Input 
                        name="teamName"
                        type="text"
                        formData={formData}
                        formError={formError}
                        placeholder="Новое название"
                        onChange={handleChange}
                    />
                </ModalWindow>
            </ModalWrapper>
        </section>
    )
}