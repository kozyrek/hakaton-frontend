import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/button/button";
import Textarea from "../../../components/textarea/textarea";
import InputFile from "../../../components/inputFile/inputFile";
import TeamRating from "../../projectStages/team-rating/teamRating";
import sendDataStepProject from "../../../api/projects/sendDataStepProject";
import acceptStep from "../../../api/steps/acceptStep";
import rejectStep from "../../../api/steps/rejectStep";
import { FILENAME_EXTENSION_FULL } from "../../../utils/constants";

import styles from "./stepInfo.module.css";

export default function StepProjectInfo({
  step,
  stepTitle,
  handleSwitchStatus,
  stepStatus,
  handleChangeTimer,
}) {
  const [isMentor, setIsMentor] = useState(
    useSelector((state) => state.user.user.isMentor)
  );
  const [textValue, setTextValue] = useState(
    step.text ? JSON.parse(step.text).text : ""
  );
  const [scoreValue, setScoreValue] = useState(0);
  const [timer, setTimer] = useState(0);
  const [fileDownload, setFileDownload] = useState(null);

  useEffect(() => {
    setTextValue(step.text ? JSON.parse(step.text).text : "");
    // eslint-disable-next-line
  }, [step.text]);

  useEffect(() => {
    setFileDownload(step.files);
  }, [step]);

  //Взаимодействие капитана/участника со страницей

  const handleChangeText = (e) => {
    e.preventDefault();
    setTextValue(e.target.value);
  };

  const handleSendDataStep = async () => {
    try {
      // Валидация полей
      if (!textValue && !fileDownload?.length) {
        toast.error("Заполните текст шага или добавьте файлы", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const formData = new FormData();

      // 1. Добавляем текстовые данные
      if (textValue) {
        formData.append("text", JSON.stringify({ text: textValue }));
      }

      // 2. Добавляем файлы с проверкой типа
      if (fileDownload?.length) {
        for (const file of fileDownload) {
          // Проверяем, является ли элемент объектом File
          if (file instanceof File) {
            formData.append("files", file);
          }
          // Если файл пришел с сервера (имеет filePath)
          else if (file?.filePath) {
            // Для существующих файлов можно либо:
            // а) Отправить только ссылку (если бэкенд умеет их обрабатывать)
            // б) Перезагрузить файл с сервера
            // Здесь вариант а)
            formData.append("file_references", file.filePath);
          } else {
            console.warn("Неподдерживаемый тип файла:", file);
            continue;
          }

        }
      }

      // 3. Отправка данных
      const response = await sendDataStepProject(
        step.projectId,
        step.stepNumber,
        formData
      );

      if (response.status === 200) {
        console.log("Шаг отправлен на ревью", response.data);
        handleSwitchStatus(stepStatus.isSubmitted);
        handleChangeTimer();
      } else {
        console.error("Ошибка при отправке шага", response);
      }
    } catch (error) {
      console.error("Ошибка в handleSendDataStep:", error);
    }
  };

  //Взаимодействие ментора со страницей
  const handleAcceptStep = async () => {
    if (scoreValue === 0) {
      toast("Поставьте, пожалуйста, оценку команде", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (
      scoreValue < 0 || 
      scoreValue > 10 || 
      isNaN(scoreValue) || 
      !Number.isInteger(scoreValue)
    ) {
      toast.error("Установите баллы (от 0 до 10) в поле «Оценка», используя целые числа", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const response = await acceptStep(
        step.projectId, 
        step.stepNumber, 
        scoreValue);
      if (response.status === 200) {
        console.log("шаг согласован", response.data);
        handleSwitchStatus(stepStatus.isAccept);
      }
    }
  };

  const handleRejectStep = async() => {
    if (timer <= 0 || isNaN(timer) || !Number.isInteger(timer)) {
      toast.error("Установите таймер, используя целые числа", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      const response = await rejectStep(step.projectId, step.stepNumber, timer);
      if (response.status === 200) {
        console.log("шаг отклонен", response.data);
        handleSwitchStatus(stepStatus.notStarted);
      }
    }
  }

  return (
    <div className={`contentBox ${styles.wrapper}`}>
      <div className={styles.infoWrapper}>
        <h1 className={`titleH2 ${styles.title}`}>{stepTitle}</h1>
        <h2 className={`titleH3 ${styles.stepTitle}`}>Шаг {step.stepNumber}</h2>

        {!isMentor && (
          <Textarea
            name="description"
            placeholder="Введите текст"
            maxLength={10000}
            value={textValue}
            onChange={handleChangeText}
            onClick={() => setTextValue("")}
            disabled={
              stepStatus.notStarted ||
              !stepStatus.inProgress ||
              stepStatus.isSubmitted ||
              stepStatus.isAccept
            }
          />
        )}
        {isMentor && step.text && (
          <p className={`text1 ${styles.text}`}>{JSON.parse(step.text).text}</p>
        )}
      </div>
      <TeamRating
        step={step}
        setScoreValue={setScoreValue}
        setTimer={setTimer}
        stepStatus={stepStatus}
      />
      <div className={styles.filesWrapper}>
        <h3 className={`titleH3 ${styles.title}`}>
          {!(stepStatus.isAccept || isMentor)
            ? "Загрузите файлы проекта"
            : "Файлы проекта"}
        </h3>
        <p className="text1">Документы, презентации, картинки, видео</p>

        <InputFile
          fileDownload={fileDownload}
          setFileDownload={setFileDownload}
          stepStatus={stepStatus}
          multiple
          accept={FILENAME_EXTENSION_FULL.join(", ")}
          disabledButton={!stepStatus.inProgress}
        />
      </div>
      {isMentor && (
        <div className={styles.buttonBlock}>
          <Button
            type="button"
            large
            text="Принять"
            onClick={handleAcceptStep}
            disabled={
              stepStatus.notStarted ||
              stepStatus.inProgress ||
              // || !stepStatus.isSubmitted
              stepStatus.isAccept
              // || !stepStatus.timeExceeded
            }
          />
          <Button
            type="button"
            large
            text="Отклонить"
            onClick={handleRejectStep}
            addClass={styles.buttonReject}
            violet
            disabled={
              stepStatus.notStarted ||
              stepStatus.inProgress ||
              // || !stepStatus.isSubmitted
              stepStatus.isAccept
              // || !stepStatus.timeExceeded
            }
          />
        </div>
      )}
      {!isMentor && !stepStatus.isAccept && (
        <Button
          type="button"
          large
          text="Готово"
          onClick={handleSendDataStep}
          disabled={
            stepStatus.notStarted ||
            !stepStatus.inProgress ||
            stepStatus.isSubmitted
          }
          addClass={styles.buttonComplete}
        />
      )}
    </div>
  );
}
