import { HTTP } from "./http";

export default async function userRegistration(data) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  // Подготовка базовых данных, общих для всех ролей
  const baseData = {
    firstName: data.firstName.value,
    lastName: data.lastName.value,
    patronymic: data.patronymic.value,
    birthDate: formatDate(data.dateBirth.value),
    phoneNumber: data.phoneNumber.value,
    eduOrganization: data.eduOrganization.value,
    email: data.email.value,
    password: data.password.value,
    personalData: data.policy.value,
    regulationsAgreement: data.regulations.value,
    isMentor: data.role.value === "mentor",
  };

  // В зависимости от роли добавляем специфичные данные
  const newData = { ...baseData };

  if (data.role.value === "participant") {
    newData.participant = {
      regionId: data.regionId.value ? parseInt(data.regionId.value) || 0 : 0,
      schoolGrade: data.schoolGrade.value,
      city: data.city.value,
    };
  } else if (data.role.value === "mentor") {
    newData.mentor = {
      jobTitle: data.jobTitle.value,
    };
  }

  console.log("Prepared data:", newData);
  try {
    const response = await HTTP.post("/users", newData);
    return response;
  } catch (error) {
    console.log(error)
  }
}
