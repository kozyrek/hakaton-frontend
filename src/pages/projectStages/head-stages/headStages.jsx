import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import { useResize } from "../../../hooks/useResize";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import Inputs from "../../../components/inputs/inputs";
import updateProject from "../../../api/projects/updateProject";
import getProjectById from "../../../api/projects/getProjectById";

import styles from "./headStages.module.css";

export default function HeadStages({obj, setProject}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isChangeProject, setIsChangeProject] = useState(false);
    const width = useResize();
    const timerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: { value: obj && obj.name, type: "text" },
        description: { value: obj && obj.description, type: "text" },
        document: { value: obj && obj.documentPath, type: "file"},
    });
    const [formError, setFormError] = useState({});

    // console.log(formData.document.value.split('/').at(-1));

    const fetchProject = async () => {
        try {
            if (obj.id) {
                const response = await getProjectById(obj.id);
                console.log("res", response);
                setProject(response.data);
            }
        } catch (e) {
            console.log(e.message);
        }
    };
    
    const handleUpdateProject = async (name, description,document) => {
        const response = await updateProject(obj.id, name, description, document);
        if (response.status === 200) {
            fetchProject();
            setIsChangeProject(false);
        }
    };

    const handleChange = (value, name) => {
        setFormData({
          ...formData,
          [name]: { value: value, type: formData[name].type },
        });
    
        // if (timerRef.current) {
        //   clearTimeout(timerRef.current);
        // }
    
        // timerRef.current = setTimeout(() => {
        //   validateField(value, formData[name].type, name, setFormError);
        // }, 1500);
      };

    return (
        <>
            <section className={styles.wrapper}>
                <h1 className={`titleH1 ${styles.title}`}>
                    «{obj.name}»
                    {isMentor &&
                    <button className={styles.iconPencil} onClick={() => setIsChangeProject(true)} >
                        <Pencil
                            width={width < 769 ? 18 : 28}
                            height={width < 769 ? 18 : 28}
                            aria-hidden="true"
                        />
                    </button>}
                </h1>
                <p className={`text3 ${styles.text}`}>
                    {obj.description}
                </p>
                <Button 
                    path={obj.documentPath}
                    text='Смотреть документ проекта'
                    target="_blank"
                    rel="noreferrer"
                    large 
                    white
                    disabled={!obj.documentPath}
                />
            </section>

            <ModalWrapper
                isOpen={isChangeProject}
                onClose={() => setIsChangeProject(false)}
            >
                <ModalWindow
                title="Изменение данных проекта"
                buttonArea={[
                    <Button
                        text="Изменить"
                        onClick={() => handleUpdateProject(formData.name.value, formData.description.value, formData.document.value)}
                    />,
                    <Button
                        violet
                        text="Отменить"
                        onClick={() => {
                            // handleChange("");
                            setIsChangeProject(false);
                        }}
                    />,
                ]}
                >
                <Inputs
                    name="name"
                    type="text"
                    formData={formData}
                    formError={formError}
                    placeholder="Новое название кейса"
                    onChange={handleChange}
                />
                <Inputs
                    name="description"
                    type="textarea"
                    formData={formData}
                    formError={formError}
                    placeholder="Новое описание кейса"
                    onChange={handleChange}
                />
                <Inputs
                    name="document"
                    type="download"
                    formData={formData}
                    formError={formError}
                    placeholder="Документ кейса"
                    notUser
                    onChange={handleChange}
                />
                </ModalWindow>
            </ModalWrapper>
        </>
    )
}