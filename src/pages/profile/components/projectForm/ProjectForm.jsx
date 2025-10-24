import { useState, useEffect } from "react";
import ModalWrapper from "../../components/../../../components/modalOverlay";
import ModalWindow from "../../components/../../../components/modalWindow";
import Inputs from "../../../../components/inputs/inputs";
import Button from "../../../../components/button/button";
import { FILENAME_EXTENSION } from "../../../../utils/constants";

const ProjectForm = ({ 
  mode = "create", // 'create' | 'edit'
  isOpen, 
  onClose, 
  onSubmit,
  initialData = {},
  loading = false
}) => {
  const [formData, setFormData] = useState({
    name: { value: "", type: "text" },
    description: { value: "", type: "text" },
    document: { value: null, type: "file" },
  });
  const [formError, setFormError] = useState({});
  const [errorModal, setErrorModal] = useState({ isOpen: false, messages: [] });

  // Инициализация формы только при открытии модального окна
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialData) {
      setFormData({
        name: { value: initialData.name || "", type: "text" },
        description: { value: initialData.description || "", type: "text" },
        document: { 
          value: initialData.documentPath || null, 
          type: "file",
          currentFile: initialData.documentPath ? {
            name: initialData.documentPath.split('/').pop(),
            path: initialData.documentPath
          } : null
        },
      });
    } else if (mode === "create") {
      // Сброс формы для создания
      setFormData({
        name: { value: "", type: "text" },
        description: { value: "", type: "text" },
        document: { value: null, type: "file" },
      });
    }
  }, [isOpen, mode]); // Только isOpen и mode как зависимости

  // Функция валидации формы
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.value.trim()) {
      errors.name = "Название проекта обязательно для заполнения";
    }
    
    if (!formData.description.value.trim()) {
      errors.description = "Описание проекта обязательно для заполнения";
    }
    
    // Для создания проекта документ обязателен
    if (mode === "create" && !formData.document.value) {
      errors.document = "Документ проекта обязателен для загрузки";
    }
    
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Функция получения сообщения об ошибке
  const getProjectErrorMessage = (error) => {
    console.log("Project form error:", error);
    
    let errorMessage = "";
    let errorDetail = "";
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.detail) {
      if (typeof error.response.data.detail === 'string') {
        errorMessage = error.response.data.detail;
      } else if (Array.isArray(error.response.data.detail)) {
        errorMessage = "Ошибка валидации";
        errorDetail = error.response.data.detail.map(d => d.msg).join(', ');
      }
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    console.log("Extracted error message:", errorMessage);
    
    // Обрабатываем конкретные сообщения об ошибках
    if (errorMessage.includes("empty") || errorMessage.includes("пустой") || errorDetail.includes("empty")) {
      return ["Файл не должен быть пустым", "Пожалуйста, загрузите файл с содержимым."];
    }
    
    if (errorMessage.includes("txt") || errorMessage.includes("text") || errorDetail.includes("txt")) {
      return ["Ошибка загрузки текстового файла", "Убедитесь, что файл имеет корректное содержимое."];
    }
    
    if (errorMessage.includes("size") || errorMessage.includes("размер") || errorDetail.includes("size")) {
      return ["Файл слишком большой", "Пожалуйста, выберите файл меньшего размера."];
    }
    
    if (errorMessage.includes("format") || errorMessage.includes("формат") || errorDetail.includes("format")) {
      return ["Неверный формат файла", "Поддерживаются только файлы с расширениями: " + FILENAME_EXTENSION.join(", ")];
    }
    
    if (errorMessage.includes("Invalid file") || errorMessage.includes("Неверный файл") || errorDetail.includes("Invalid")) {
      return ["Неверный файл", "Пожалуйста, проверьте корректность загружаемого файла."];
    }
    
    // Ошибка валидации 422
    if (errorMessage.includes("Validation Error") || errorMessage.includes("Ошибка валидации")) {
      return ["Ошибка валидации данных", errorDetail || "Проверьте правильность введенных данных."];
    }
    
    // Если ошибка - объект Axios error
    if (error.response) {
      const status = error.response.status;
      
      if (status === 400) {
        return ["Ошибка в данных", "Проверьте правильность введенных данных и загружаемого файла."];
      }
      
      if (status === 413) {
        return ["Файл слишком большой", "Пожалуйста, выберите файл меньшего размера."];
      }
      
      if (status === 415) {
        return ["Неподдерживаемый тип файла", "Пожалуйста, выберите файл другого формата."];
      }
      
      if (status === 422) {
        return ["Ошибка валидации", errorDetail || "Проверьте правильность введенных данных."];
      }
      
      if (status === 500) {
        return ["Внутренняя ошибка сервера", "Попробуйте позже или обратитесь в поддержку."];
      }
    }
    
    // Сетевая ошибка
    if (errorMessage.includes("Network Error")) {
      return ["Проблемы с подключением", "Проверьте интернет-соединение и попробуйте снова."];
    }
    
    // Общая ошибка
    const action = mode === "create" ? "создания" : "обновления";
    return [`Ошибка ${action} проекта`, "Проверьте данные и попробуйте еще раз, или обратитесь в поддержку."];
  };

  const closeErrorModal = () => {
    setErrorModal({ isOpen: false, messages: [] });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Для режима редактирования, если файл не менялся, не отправляем document
      const submitData = {
        name: formData.name.value,
        description: formData.description.value,
      };

      // Если в режиме редактирования выбран новый файл, добавляем его
      // Если в режиме создания - всегда отправляем файл
      if (mode === 'create' || formData.document.value instanceof File) {
        submitData.document = formData.document.value;
      }

      await onSubmit(submitData);
      
      // Сброс формы после успешного создания
      if (mode === "create") {
        setFormData({
          name: { value: "", type: "text" },
          description: { value: "", type: "text" },
          document: { value: null, type: "file" },
        });
      }
    } catch (error) {
      console.error(`Ошибка при ${mode === "create" ? "создании" : "обновлении"} проекта:`, error);
      
      const errorMessages = getProjectErrorMessage(error);
      
      setErrorModal({
        isOpen: true,
        messages: errorMessages
      });
    }
  };

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: { 
        ...formData[name],
        value: value,
        // При изменении файла сбрасываем информацию о текущем файле
        ...(name === 'document' && value instanceof File ? { currentFile: null } : {})
      },
    });
    
    if (formError[name]) {
      setFormError({
        ...formError,
        [name]: null,
      });
    }
  };

  const handleClose = () => {
    setFormError({});
    onClose();
  };

  const getTitle = () => {
    return mode === "create" ? "Создание нового проекта" : "Изменение данных проекта";
  };

  const getSubmitButtonText = () => {
    return mode === "create" ? "Создать" : "Изменить";
  };

  const getPlaceholders = () => {
    const base = mode === "create" ? "" : "Новое ";
    return {
      name: `${base}Название кейса`,
      description: `${base}Описание кейса`,
      document: mode === "create" ? "Загрузите документ кейса" : "Новый документ кейса (оставьте пустым, чтобы сохранить текущий)"
    };
  };

  const placeholders = getPlaceholders();

  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalWindow
          title={getTitle()}
          buttonArea={[
            <Button
              text={getSubmitButtonText()}
              onClick={handleSubmit}
              disabled={loading}
            />,
            <Button
              violet
              text="Отменить"
              onClick={handleClose}
              disabled={loading}
            />,
          ]}
        >
          <Inputs
            name="name"
            type="text"
            formData={formData}
            formError={formError}
            placeholder={placeholders.name}
            onChange={handleChange}
            maxLength={50}
            disabled={loading}
          />
          <Inputs
            name="description"
            type="textarea"
            formData={formData}
            formError={formError}
            placeholder={placeholders.description}
            onChange={handleChange}
            disabled={loading}
          />
          
          {/* Для режима редактирования показываем текущий файл */}
          {mode === 'edit' && formData.document.currentFile && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                Текущий документ:
              </div>
              <div style={{ fontSize: '16px', color: '#495057', fontWeight: '500' }}>
                {formData.document.currentFile.name}
              </div>
            </div>
          )}
          
          <Inputs
            name="document"
            type="download"
            formData={formData}
            formError={formError}
            placeholder={placeholders.document}
            notUser
            onChange={handleChange}
            accept={FILENAME_EXTENSION.join(", ")}
            disabled={loading}
          />
        </ModalWindow>
      </ModalWrapper>

      {/* Модальное окно для ошибок */}
      <ModalWrapper
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
      >
        <ModalWindow
          title="Ошибка"
          setIsShow={closeErrorModal}
          buttonArea={[
            <Button
              key="close"
              text="Ок"
              onClick={closeErrorModal}
            />
          ]}
        >
          <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            {errorModal.messages.map((message, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: index < errorModal.messages.length - 1 ? '10px' : '0',
                  padding: '0 10px',
                  fontWeight: index === 0 ? 'bold' : 'normal',
                  color: index === 0 ? '#333' : '#666'
                }}
              >
                {message}
              </div>
            ))}
          </div>
        </ModalWindow>
      </ModalWrapper>
    </>
  );
};

export default ProjectForm;