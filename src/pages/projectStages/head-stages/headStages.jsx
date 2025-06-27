import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/button/button";
import { useResize } from "../../../hooks/useResize";
import Pencil from "../../profile/components/personal-info/images/Pencil";
import ModalWrapper from "../../../components/modalOverlay";
import ModalWindow from "../../../components/modalWindow";
import Inputs from "../../../components/inputs/inputs";

import styles from "./headStages.module.css";

export default function HeadStages({obj}) {
    const [isMentor, setIsMentor] = useState(useSelector((state)=>state.user.user.isMentor));
    const [isChangeProject, setIsChangeProject] = useState(false);
    const width = useResize();

    const [formData, setFormData] = useState({
        name: { value: "", type: "text" },
        description: { value: "", type: "text", },
        document: { value: null, type: "file"},
    });
    const [formError, setFormError] = useState({
        // projectName: "",
        // projectDescription: "",
    });

    // const fetchProjects = async () => {
    //     try {
    //       const response = await getProjects();
    //       console.log("res", response);
    //       setProjects(response.data.items);
    //     } catch (e) {
    //       console.log(e.message);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchProjects();
    //   }, []);
    
    //   const handleCreateProject = async (name, description,document) => {
    //       const response = await createProject(name, description, document);
    //       if (response.status === 201) {
    //         fetchProjects();
    //         setIsCreateProject(false);
    //       }
    //     };

    // let formData = new FormData();
    // const data = {
    //     name: 'тестирования!',
    //     description: 'Здесь должно быть описание проекта'
    // }

    // formData.append('data', JSON.stringify(data))
    // formData.append('document', event.target.files[0])//* добавить в функцию изменения инпута

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
                    // дописать функцию

                    // onClick={() => handleCreateProject(formData.name.value, formData.description.value, formData.document.value)}
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
                {/* добавить поля для названия, описания и файла */}
                <Inputs
                    name="name"
                    type="text"
                    formData={formData}
                    formError={formError}
                    placeholder="Новое название кейса"
                    // onChange={handleChange}
                />
                <Inputs
                    name="description"
                    type="textarea"
                    formData={formData}
                    formError={formError}
                    placeholder="Новое описание кейса"
                    // onChange={handleChange}
                />
                <Inputs
                    name="document"
                    type="download"
                    formData={formData}
                    formError={formError}
                    placeholder="Документ кейса"
                    // onChange={handleChange}
                />
                </ModalWindow>
            </ModalWrapper>
        </>
        
    )
}