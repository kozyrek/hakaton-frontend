import { HTTP } from "./http";

export default async function userRegistration(data) {
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const [day, month, year] = dateString.split(".");
    if (day && month && year) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return "";
  } catch (e) {
    console.error("Date formatting error:", e);
    return "";
  }
};

  // Очищаем номер телефона от всех нецифровых символов и преобразуем к формату сервера
  const cleanPhoneNumber = (phone) => {
    if (!phone) return "";
    // Удаляем все нецифровые символы
    const digits = phone.replace(/\D/g, "");
    // Если номер начинается с 8, заменяем на 7
    if (digits.startsWith('8') && digits.length === 11) {
      return '7' + digits.slice(1);
    }
    // Если номер начинается с +7 или 7, оставляем как есть
    return digits;
  };

  const baseData = {
    firstName: data.firstName?.value || "",
    lastName: data.lastName?.value || "",
    patronymic: data.patronymic?.value || "",
    birthDate: formatDate(data.birthDate?.value),
    phoneNumber: cleanPhoneNumber(data.phoneNumber?.value),
    eduOrganization: data.eduOrganization?.value || "",
    email: data.email?.value || "",
    password: data.password?.value || "",
    personalData: Boolean(data.policy?.value),
    regulationsAgreement: Boolean(data.regulations?.value),
    isMentor: data.role?.value === "mentor",
  };

  const newData = { ...baseData };

  if (data.role?.value === "participant") {
    newData.participant = {
      regionId: parseInt(data.regionId?.value) || 0,
      schoolGrade: String(data.schoolGrade?.value || ""),
      city: data.city?.value || ""
    };
  } else if (data.role?.value === "mentor") {
    newData.mentor = {
      jobTitle: data.jobTitle?.value || ""
    };
  }

  // Для отладки
  console.log("Registration data being sent:", JSON.stringify(newData, null, 2));

  try {
    const response = await HTTP.post("/users", newData);
    return response;
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
}