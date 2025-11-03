import { useEffect, useState } from "react";
import createFormDataAndError from "../../../../../utils/createFormDataAndError";
import Inputs from "../../../../../components/inputs/inputs";
import { LABELS } from "..";
import { Row, Col } from "react-bootstrap";
import updateUserInterest from "../../../../../api/updateUserInterest";
import addUserDocument from "../../../../../api/document-user/addUserDocument";
import deleteUserDocument from "../../../../../api/document-user/deleteUserDocument";

import styles from "../index.module.css";
import Button from "../../../../../components/button/button";
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
      alert(`Можно загрузить не более ${MAX_FILES} файлов. У вас уже ${totalFilesCount} файлов.`);
      return;
    }

    // Проверка типов и размеров файлов
    const validFiles = selectedFiles.filter(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`Файл "${file.name}" имеет недопустимый формат. Разрешены: PDF, DOC, DOCX, TXT`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`Файл "${file.name}" превышает максимальный размер 10MB`);
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

  const handleSubmit = async () => {
    if (!id) {
      alert('Ошибка: ID пользователя не найден');
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

      onClick(false);
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Произошла ошибка при сохранении данных');
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
                {/* <span className="text-muted ms-2 small">
                  ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                </span> */}
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
                  {/* <span className="text-muted ms-2 small">
                    ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                  </span> */}
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
                {/* <span className="text-muted ms-2 small">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB) - новый
                </span> */}
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
    </div>
  );
}