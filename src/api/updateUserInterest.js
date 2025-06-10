import { HTTP } from "./http";

export default async function updateUserInterest(id, data, isMentor) {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify(
      isMentor
        ? {
            mentor: {
              articles: data.articles.value,
              researchTopics: data.researchTopics.value,
              scientificInterests: data.scientificInterests.value,
              taughtSubjects: data.taughtSubjects.value,
            },
          }
        : {
            participant: {
              interests: data.interests.value,
              olympics: data.olympics.value,
              achievements: data.achievements.value,
            },
          }
    )
  );

  const response = await HTTP.patch(`/users/${id}`, formData);
  return response.data;
}
