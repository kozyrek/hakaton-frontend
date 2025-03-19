export default function getUser(token) {
  return new Promise((res, reg) => {
    setInterval(() => {
      if (token === "frmlasd98asder") {
        res({
          "id": 0,
          "createdAt": "2019-08-24T14:15:22Z",
          "updatedAt": "2019-08-24T14:15:22Z",
          "firstName": "Андрей",
          "lastName": "Савостьянов",
          "patronymic": "Анатольевич",
          "phoneNumber": "+79261013895",
          "eduOrganization": "МГУ им М.П. Огарев",
          "email": "an@an.ru",
          "birthDate": "2019-08-24",
          "isMentor": true,
          "participant": {
            "regionId": 0,
            "schoolGrade": "11 б",
            "birthDate": "2019-08-24",
            "city": "string",
            "interests": "string",
            "olympics": "string",
            "achievements": "string",
            "createdAt": "2019-08-24T14:15:22Z",
            "updatedAt": "2019-08-24T14:15:22Z"
          },
          "mentor": {
            "specialization": "Учитель информатики",
            "jobTitle": "string",
            "researchTopics": "string",
            "articles": "string",
            "scientificInterests": "string",
            "taughtSubjects": "string",
            "createdAt": "2019-08-24T14:15:22Z",
            "updatedAt": "2019-08-24T14:15:22Z",
            "isAdmin": true
          },
          "verified": true,
          "photoPath": "string"
        });
      } else {
        reg({
          error: "Invalid token.",
        });
      }
    }, 500);
  });
}
