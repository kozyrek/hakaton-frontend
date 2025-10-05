import { useEffect, useState } from "react";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import Input from "../../../components/inputs/inputs";
import Button from "../../../components/button/button";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import { useResize } from "../../../hooks/useResize";
import updateTeam from "../../../api/team/updateTeam"; // ДОБАВЛЕНО: импорт функции обновления команды

import styles from "./headTeam.module.css";

export default function HeadTeam({ team, onTeamUpdate }) { // ДОБАВЛЕНО: пропс onTeamUpdate для обновления данных после изменения
    const [isOpenChangeTeam, setIsOpenChangeTeam] = useState(false);
    const [mentor, setMentor] = useState("");
    const [formData, setFormData] = useState({
        teamName: { value: "", type: "text" },
    });
    const [formError, setFormError] = useState({
        teamName: "",
    });
    const [isLoading, setIsLoading] = useState(false); // ДОБАВЛЕНО: состояние загрузки
    const [errorMessage, setErrorMessage] = useState(""); // ДОБАВЛЕНО: сообщение об ошибке

    const width = useResize();

    // ДОБАВЛЕНО: установка начального значения названия команды
    useEffect(() => {
        if (team && team.name) {
            setFormData({
                teamName: { value: team.name, type: "text" },
            });
        }
    }, [team]);

    // ДОБАВЛЕНО: функция изменения названия команды
    const handleChangeTeam = async () => {
        const newName = formData.teamName.value.trim();
        
        // Валидация
        if (!newName) {
            setFormError({
                teamName: "Название команды не может быть пустым",
            });
            return;
        }

        if (newName === team.name) {
            setFormError({
                teamName: "Новое название должно отличаться от текущего",
            });
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setFormError({ teamName: "" });

        try {
            // Отправляем запрос на обновление команды
            const response = await updateTeam(team.id, {
                name: newName
            });

            console.log("Команда успешно обновлена:", response);
            
            // Закрываем модальное окно
            setIsOpenChangeTeam(false);
            
            // Обновляем данные команды в родительском компоненте
            if (onTeamUpdate) {
                onTeamUpdate();
            }
            
        } catch (error) {
            console.error("Ошибка при изменении названия команды:", error);
            setErrorMessage(error.message || "Произошла ошибка при изменении названия команды");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (value, name = "teamName") => {
        setFormData({
            ...formData,
            [name]: { value: value, type: "text" },
        });
        // Очищаем ошибку при изменении значения
        if (formError[name]) {
            setFormError({
                ...formError,
                [name]: "",
            });
        }
        setErrorMessage(""); // Очищаем общее сообщение об ошибке
    };

    // ДОБАВЛЕНО: функция для закрытия модального окна с сбросом ошибок
    const handleCloseModal = () => {
        setIsOpenChangeTeam(false);
        setFormError({ teamName: "" });
        setErrorMessage("");
        // Восстанавливаем оригинальное название команды
        setFormData({
            teamName: { value: team.name, type: "text" },
        });
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.titleContainer}>
                <h1 className="titleH1" style={{marginBottom:"0px"}}>Команда {team.name}</h1>
                <button
                    className={styles.btnEdit}
                    type="button"
                    onClick={() => setIsOpenChangeTeam(true)}
                    disabled={isLoading}
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
                    <br></br>
                    <span className="text1">{mentor.lastName} {mentor.firstName} TEST TEST</span>
                </div>
            </div>
            
            <ModalWrapper
                isOpen={isOpenChangeTeam}
                onClose={handleCloseModal}
            >
                <ModalWindow 
                    title="Изменение названия команды"
                    buttonArea={[
                        <Button
                            large
                            text={isLoading ? "Сохранение..." : "Изменить"}
                            onClick={handleChangeTeam}
                            disabled={isLoading}
                        />,
                        <Button
                            large
                            violet
                            text="Отменить"
                            onClick={handleCloseModal}
                            disabled={isLoading}
                        />,
                    ]}
                >
                    {/* ДОБАВЛЕНО: отображение ошибок */}
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                    
                    <Input 
                        name="teamName"
                        type="text"
                        formData={formData}
                        formError={formError}
                        placeholder="Новое название"
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </ModalWindow>
            </ModalWrapper>
        </section>
    )
}