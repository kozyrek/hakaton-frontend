import { useEffect, useState } from "react";
import createFormDataAndError from "../../../../../utils/createFormDataAndError";
import Inputs from "../../../../../components/inputs/inputs";
import { LABELS } from "..";
import { Row, Col } from "react-bootstrap";
import updateUserInterest from "../../../../../api/updateUserInterest";
import addUserDocument from "../../../../../api/document-user/addUserDocument";
import deleteUserDocument from "../../../../../api/document-user/deleteUserDocument";
import ModalWrapper from "../../../../../components/modalOverlay";
import ModalWindow from "../../../../../components/modalWindow";
import Button from "../../../../../components/button/button";

import styles from "../index.module.css";
import { useDispatch } from "react-redux";
import { set_user } from "../../../../../store/user/userSlice";

// Константы для ограничений файлов
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export default function TextEdit({ personalInfo, documents, onClick, id, isMentor, onDocumentsUpdate }) {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, messages: [] });
  const [successModal, setSuccessModal] = useState({ isOpen: false, message: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализация текстовых данных (старый формат для совместимости)
    const { applicableFields, errorFields } = createFormDataAndError(personalInfo);
    setFormData(applicableFields);
    setFormError(errorFields);
    
    // Инициализация документов
    setExistingDocuments(Array.isArray(documents) ? documents : []);
  }, [personalInfo, documents]);

  const handleChange = (value, name) => {
    setFormData((prev) => ({ 
      ...prev, 
      [name]: { value: value } 
    }));
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const totalFilesCount = existingDocuments.length - filesToDelete.length + newFiles.length;
    
    if (totalFilesCount + selectedFiles.length > MAX_FILES) {
      showErrorModal(["Можно загрузить не более 5 файлов"]);
      return;
    }

    // Проверка типов и размеров файлов
    const validFiles = selectedFiles.filter(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        showErrorModal([`Файл "${file.name}" имеет недопустимый формат. Разрешены: PDF, DOC, DOCX, TXT`]);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        showErrorModal([`Файл "${file.name}" превышает максимальный размер 10MB`]);
        return false;
      }
      return true;
    });

    setNewFiles(prev => [...prev, ...validFiles]);
    event.target.value = ''; // Сброс input
  };

  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const markDocumentForDeletion = (docId) => {
    setFilesToDelete(prev => [...prev, docId]);
  };

  const unmarkDocumentForDeletion = (docId) => {
    setFilesToDelete(prev => prev.filter(id => id !== docId));
  };

  // Функции для работы с модальными окнами
  const showErrorModal = (messages) => {
    setErrorModal({
      isOpen: true,
      messages: Array.isArray(messages) ? messages : [messages]
    });
  };

  const closeErrorModal = () => {
    setErrorModal({ isOpen: false, messages: [] });
  };

  const showSuccessModal = (message) => {
    setSuccessModal({
      isOpen: true,
      message: message
    });
  };

  const closeSuccessModal = () => {
    setSuccessModal({ isOpen: false, message: "" });
    onClick(false);
  };

  // Функция для форматирования сообщений об ошибках (аналогично регистрации)
  const formatErrorMessage = (error) => {
    console.log("Error response data:", error);
    
    // Если error.detail - это строка, возвращаем её
    if (typeof error?.detail === 'string') {
      return [error.detail];
    }
    
    // Если error.detail - это массив (как в Pydantic validation errors)
    if (Array.isArray(error?.detail)) {
      return error.detail.map(err => {
        if (err.loc && err.msg) {
          const field = err.loc[err.loc.length - 1];
          const fieldNames = {
            'articles': 'Статьи',
            'scientificInterests': 'Круг научных интересов', 
            'taughtSubjects': 'Преподаваемые предметы',
            'researchTopics': 'Тематика научных и исследовательских работ',
            'interests': 'Интересы',
            'olympics': 'Олимпиады',
            'achievements': 'Достижения'
          };
          const russianField = fieldNames[field] || field;
          return `${russianField}: ${err.msg}`;
        }
        return err.msg || JSON.stringify(err);
      });
    }
    
    // Если error.detail - это объект
    if (typeof error?.detail === 'object') {
      return Object.entries(error.detail)
        .map(([key, value]) => {
          const fieldNames = {
            'articles': 'Статьи',
            'scientificInterests': 'Круг научных интересов', 
            'taughtSubjects': 'Преподаваемые предметы',
            'researchTopics': 'Тематика научных и исследовательских работ',
            'interests': 'Интересы',
            'olympics': 'Олимпиады',
            'achievements': 'Достижения'
          };
          const russianField = fieldNames[key] || key;
          return `${russianField}: ${value}`;
        });
    }
    
    // Если есть прямые поля с ошибками в response.data
    if (error && typeof error === 'object') {
      const messages = [];
      for (const [key, value] of Object.entries(error)) {
        if (key !== 'detail' && value) {
          if (Array.isArray(value)) {
            messages.push(...value.map(v => {
              const fieldNames = {
                'articles': 'Статьи',
                'scientificInterests': 'Круг научных интересов', 
                'taughtSubjects': 'Преподаваемые предметы',
                'researchTopics': 'Тематика научных и исследовательских работ',
                'interests': 'Интересы',
                'olympics': 'Олимпиады',
                'achievements': 'Достижения'
              };
              const russianField = fieldNames[key] || key;
              return `${russianField}: ${v}`;
            }));
          } else {
            const fieldNames = {
              'articles': 'Статьи',
              'scientificInterests': 'Круг научных интересов', 
              'taughtSubjects': 'Преподаваемые предметы',
              'researchTopics': 'Тематика научных и исследовательских работ',
              'interests': 'Интересы',
              'olympics': 'Олимпиады',
              'achievements': 'Достижения'
            };
            const russianField = fieldNames[key] || key;
            messages.push(`${russianField}: ${value}`);
          }
        }
      }
      if (messages.length > 0) return messages;
    }
    
    // Если это просто строка в response.data
    if (typeof error === 'string') {
      return [error];
    }
    
    // Если пришел сам объект ошибки
    if (error?.msg || error?.message) {
      return [error.msg || error.message];
    }
    
    // По умолчанию
    return ["Произошла неизвестная ошибка при сохранении данных"];
  };

  const handleSubmit = async () => {
    if (!id) {
      showErrorModal(["Ошибка: ID пользователя не найден"]);
      return;
    }

    setLoading(true);
    try {
      // 1. Обновляем текстовые данные (старый формат)
      console.log('Отправка текстовых данных:', formData);
      const updatedUser = await updateUserInterest(id, formData, isMentor);
      dispatch(set_user(updatedUser));

      // 2. Удаляем отмеченные документы
      const deletePromises = filesToDelete.map(docId => 
        deleteUserDocument(docId)
      );
      await Promise.all(deletePromises);

      // 3. Загружаем новые файлы
      const uploadPromises = newFiles.map(file => 
        addUserDocument(file)
      );
      await Promise.all(uploadPromises);

      // 4. Обновляем список документов
      if (onDocumentsUpdate) {
        await onDocumentsUpdate();
      }

      showSuccessModal("Данные успешно сохранены!");
      
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      
      let errorMessages = ["Произошла неизвестная ошибка при сохранении данных"];

      if (error.response?.status === 409) {
        const errorDetail = error.response.data.detail || error.response.data;
        if (typeof errorDetail === 'string' && errorDetail.includes("already exists")) {
          errorMessages = ["Файл с таким именем уже существует"];
        } else {
          errorMessages = formatErrorMessage(error.response.data);
        }
      } else if (error.response?.status === 413) {
        errorMessages = ["Размер файла превышает ограничение 10MB"];
      } else if (error.response?.status === 415) {
        errorMessages = ["Недопустимый формат файла"];
      } else if (error.response?.status === 422) {
        errorMessages = formatErrorMessage(error.response.data) || ["Ошибка валидации данных. Проверьте правильность заполнения полей."];
      } else if (error.response?.status === 400) {
        errorMessages = formatErrorMessage(error.response.data) || ["Неверные данные. Проверьте введенную информацию."];
      } else if (error.response?.status === 500) {
        errorMessages = ["Внутренняя ошибка сервера. Попробуйте позже."];
      } else if (error.response?.data) {
        errorMessages = formatErrorMessage(error.response.data);
      } else if (error.message) {
        errorMessages = [error.message];
      }

      showErrorModal(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  const currentDocuments = existingDocuments.filter(doc => !filesToDelete.includes(doc.id));
  const totalFilesCount = currentDocuments.length + newFiles.length;

  return (
    <div>
      {/* Текстовые поля (старый формат с компонентом Inputs) */}
      {Object.entries(formData).map(([key, value]) => {
        // Пропускаем поле documents, так как обрабатываем его отдельно
        if (key === 'documents') return null;
        
        return (
          <Row className={styles.textViewContainer} key={key}>
            <Col>
              <Inputs
                type="textarea"
                formData={formData}
                formError={formError}
                name={key}
                label={LABELS[key]}
                onChange={handleChange}
              />
            </Col>
          </Row>
        );
      })}

      {/* Секция документов */}
      <Row className={styles.textViewContainer}>
        <Col>
          <div className="mb-3">
            <h5>Документы</h5>
            <p className="text-muted small">
              Можно загрузить до {MAX_FILES} файлов. Поддерживаемые форматы: PDF, DOC, DOCX, TXT. 
              Максимальный размер файла: 10MB. 
              Текущее количество: {totalFilesCount}/{MAX_FILES}
            </p>
          </div>

          {/* Существующие документы */}
          {currentDocuments.map(doc => (
            <div key={doc.id} className="d-flex align-items-center justify-content-between mb-2 p-3 border rounded">
              <div className="d-flex align-items-center">
                <span className="fw-medium">{doc.name}</span>
                <span className="text-muted ms-2 small">
                  ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => markDocumentForDeletion(doc.id)}
                disabled={loading}
              >
                Удалить
              </button>
            </div>
          ))}

          {/* Документы, отмеченные для удаления */}
          {filesToDelete.map(docId => {
            const doc = existingDocuments.find(d => d.id === docId);
            return doc ? (
              <div key={docId} className="d-flex align-items-center justify-content-between mb-2 p-3 border rounded bg-light">
                <div className="d-flex align-items-center">
                  <span className="fw-medium text-decoration-line-through text-muted">{doc.name}</span>
                  <span className="text-muted ms-2 small">
                    ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => unmarkDocumentForDeletion(docId)}
                  disabled={loading}
                >
                  Восстановить
                </button>
              </div>
            ) : null;
          })}

          {/* Новые файлы */}
          {newFiles.map((file, index) => (
            <div key={index} className="d-flex align-items-center justify-content-between mb-2 p-3 border rounded bg-light">
              <div className="d-flex align-items-center">
                <span className="fw-medium text-success">{file.name}</span>
                <span className="text-muted ms-2 small">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB) - новый
                </span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeNewFile(index)}
                disabled={loading}
              >
                Удалить
              </button>
            </div>
          ))}

          {/* Кнопка добавления файлов */}
          {totalFilesCount < MAX_FILES && (
            <div className="mb-3">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                onChange={handleFileSelect}
                className="form-control"
                disabled={loading}
              />
              <div className="form-text">
                Выберите файлы для загрузки (осталось {MAX_FILES - totalFilesCount})
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Кнопки действий */}
      <Row className="mt-4">
        <Col>
          <div className="d-flex gap-3">
            <Button
              text={loading ? "Сохранение..." : "Сохранить"}
              onClick={handleSubmit}
              disabled={loading}
            />
            <Button
              text="Отмена"
              variant="outline"
              onClick={() => onClick(false)}
              disabled={loading}
            />
          </div>
        </Col>
      </Row>

      {/* Модальное окно для ошибок */}
      <ModalWrapper
        isOpen={errorModal.isOpen}
        onClose={closeErrorModal}
      >
        <ModalWindow
          title="Ошибка сохранения"
          setIsShow={closeErrorModal}
          buttonArea={[
            <Button
              key="close"
              text="Ок"
              onClick={closeErrorModal}
            />
          ]}
        >
          <div style={{ whiteSpace: 'pre-line' }}>
            {errorModal.messages.map((message, index) => {
              const textAlign = message.length < 40 ? 'center' : 'left';
              return (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: index < errorModal.messages.length - 1 ? '10px' : '0',
                    textAlign: textAlign,
                    padding: '0 10px'
                  }}
                >
                  {message}
                </div>
              );
            })}
          </div>
        </ModalWindow>
      </ModalWrapper>

      {/* Модальное окно для успешного сохранения */}
      <ModalWrapper
        isOpen={successModal.isOpen}
        onClose={closeSuccessModal}
      >
        <ModalWindow
          title="Успех"
          setIsShow={closeSuccessModal}
          buttonArea={[
            <Button
              key="close"
              text="Ок"
              onClick={closeSuccessModal}
            />
          ]}
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {successModal.message}
          </div>
        </ModalWindow>
      </ModalWrapper>
    </div>
  );
}