const REQUIRED = "Заполните поле.";
const EMAIL_ERROR = "Некорректный формат email.";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?(\d{1,3})?[- .]?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}$/;
const PHONE_ERROR = "Некорректный номер телефона.";
const FORBIDEN_CHARS = /[<>$#@!%^&*=]/;
const FORBIDEN_ERROR = `Содержит запрещенные спецсимволы: /[<>$#@!%^&*=]/`;
const APPROVAL = `Дайте согласие на обработку персональных данных и ознакомьтесь с правилами проведения Хакатона.`;

export function validateForm(formData, formError, setFormError) {
  let errors = false;
  Object.entries(formData).forEach(([key, item]) => {
    if (item.type === "checkbox" && !item.value) {
      setFormError((prevError) => ({ ...prevError, [key]: APPROVAL }));
      errors = true;
    } else if (item.value.length === 0) {
      console.log(key);
      setFormError((prevError) => ({ ...prevError, [key]: REQUIRED }));
      errors = true;
    } else {
      setFormError((prevError) => ({ ...prevError, [key]: "" }));
      errors = true;
    }
  });
  return errors;
}

export function validateField(value, type, name, setFormError) {
  if (type === "checkbox") {
    if (!value) {
      setFormError((prevError) => ({ ...prevError, [name]: APPROVAL }));
    }
    return true;
  }

  if (!value.trim()) {
    setFormError((prevError) => ({ ...prevError, [name]: REQUIRED }));
    return false;
  }

  if (type === "email") {
    if (!EMAIL_REGEX.test(value)) {
      setFormError((prevError) => ({ ...prevError, [name]: EMAIL_ERROR }));
      return false;
    }
  }

  if (type === "tel") {
    if (!PHONE_REGEX.test(value)) {
      setFormError((prevError) => ({ ...prevError, [name]: PHONE_ERROR }));
      return false;
    }
  }

  if (type === "text") {
    if (FORBIDEN_CHARS.test(value)) {
      setFormError((prevError) => ({ ...prevError, [name]: FORBIDEN_ERROR }));
      return false;
    }
  }

  if (name === "dateBirth") {
    const validateResult = validateBirthDate(value);
    if (!validateResult.isValid) {
      setFormError((prevError) => ({
        ...prevError,
        [name]: validateResult.message,
      }));
      return false;
    }
  }

  if (type === "password") {
    const validPassword = validatePassword(value);
    if (!validPassword.isValid) {
      setFormError((prevError) => ({
        ...prevError,
        [name]: validPassword.message,
      }));
      return false;
    }
  }

  setFormError((prevError) => ({ ...prevError, [name]: "" }));
  return true;
}

function validateBirthDate(dateString) {
  const result = { isValid: false, message: "" };

  // 1. Проверка формата строки
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!dateRegex.test(dateString)) {
    result.message = "Неверный формат даты. Используйте ДД.ММ.ГГГГ";
    return result;
  }

  // 2. Разделение на компоненты
  const [dayStr, monthStr, yearStr] = dateString.split(".");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // 3. Проверка числовых значений
  if (month < 1 || month > 12) {
    result.message = "Неверный месяц (1-12)";
    return result;
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    result.message = `Год должен быть между 1900 и ${new Date().getFullYear()}`;
    return result;
  }

  // 4. Проверка существования даты
  const date = new Date(year, month - 1, day);
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValidDate) {
    result.message = "Такой даты не существует";
    return result;
  }

  // 5. Проверка на будущую дату
  const currentDate = new Date();
  if (date > currentDate) {
    result.message = "Дата рождения не может быть в будущем";
    return result;
  }

  // 6. Возрастные ограничения (опционально)
  const minAge = 7;
  const maxAge = 90;
  const age = new Date().getFullYear() - year;

  if (age < minAge) {
    result.message = `Минимальный возраст - ${minAge} лет`;
    return result;
  }

  if (age > maxAge) {
    result.message = `Проверьте правильность года рождения`;
    return result;
  }

  result.isValid = true;
  return result;
}

function validatePassword(password) {
  const errors = { isValid: false, message: "" };
  const specialChars = /[@#$%&*!]/;

  // Проверка длины
  if (password.length < 8) {
    errors.message = "Пароль должен содержать минимум 8 символов";
    return errors;
  }

  // Проверка латиницы
  if (!/^[\w@#$%&*!]+$/.test(password)) {
    errors.message = "Разрешены только латинские буквы и спецсимволы (@#$%&*!)";
    return errors;
  }

  // Проверка заглавных букв
  if (!/[A-Z]/.test(password)) {
    errors.message = "Добавьте минимум одну заглавную букву (A-Z)";
    return errors;
  }

  // Проверка прописных букв
  if (!/[a-z]/.test(password)) {
    errors.message = "авьте минимум одну прописную букву (a-z)";
    return errors;
  }

  // Проверка цифр
  // if (!/\d/.test(password)) {
  //   errors.message = "Добавьте минимум одну цифру (0-9)";
  //   return errors;
  // }

  // Проверка спецсимволов
  if (!specialChars.test(password)) {
    errors.message = "Добавьте минимум один спецсимвол (@#$%&*!)";
    return errors;
  }

  return {
    isValid: true,
    message: "",
  };
}

export function passwordMatchValidation(formData) {
  if (formData["password"].value !== formData["retryPassword"].value)
    return false;
  return true;
}
