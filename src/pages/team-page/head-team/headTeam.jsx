import { useEffect, useState } from "react";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import Input from "../../../components/inputs/inputs";
import Button from "../../../components/button/button";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import { useResize } from "../../../hooks/useResize";
import updateTeam from "../../../api/team/updateTeam";
import { getMentor } from "../../../api/getMentor";
import profilePhotoAvatar from "../../../assests/images/photo/profilePhotoAvatar.svg"; // ДОБАВЛЕНО: импорт заглушки

import styles from "./headTeam.module.css";

export default function HeadTeam({ team, onTeamUpdate }) {
    const [isOpenChangeTeam, setIsOpenChangeTeam] = useState(false);
    const [mentor, setMentor] = useState(null);
    const [formData, setFormData] = useState({
        teamName: { value: "", type: "text" },
    });
    const [formError, setFormError] = useState({
        teamName: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isMentorLoading, setIsMentorLoading] = useState(false);

    const width = useResize();

    // Эффект для загрузки данных ментора
    useEffect(() => {
        const fetchMentor = async () => {
            if (team && team.mentorId) {
                setIsMentorLoading(true);
                try {
                    const mentorData = await getMentor(team.mentorId);
                    setMentor(mentorData);
                } catch (error) {
                    console.error("Ошибка при загрузке данных ментора:", error);
                    setMentor(null);
                } finally {
                    setIsMentorLoading(false);
                }
            } else {
                setMentor(null);
            }
        };

        fetchMentor();
    }, [team?.mentorId]);

    // Установка начального значения названия команды
    useEffect(() => {
        if (team && team.name) {
            setFormData({
                teamName: { value: team.name, type: "text" },
            });
        }
    }, [team]);

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

    // Функция для закрытия модального окна с сбросом ошибок
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
                    {/* ИЗМЕНЕНО: используем заглушку если нет фото ментора */}
                    <img 
                        src={mentor?.photoPath || profilePhotoAvatar} 
                        alt="Фотография ментора"
                        onError={(e) => {
                            // Если фото не загружается, используем заглушку
                            e.target.src = profilePhotoAvatar;
                        }}
                    />
                </div>
                <div className={styles.nameWrapper}>
                    <span className="text3">Ментор команды</span>
                    <br></br>
                    {isMentorLoading ? (
                        <span className="text1">Загрузка...</span>
                    ) : mentor ? (
                        <span className="text1">
                            {mentor.last_name} {mentor.first_name} {mentor.patronymic || ''}
                        </span>
                    ) : (
                        <span className="text1">Ментор не назначен</span>
                    )}
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
                    {/* Отображение ошибок */}
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