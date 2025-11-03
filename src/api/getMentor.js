import { HTTP } from "./http";

export const getMentor = async (mentorId) => {
    try {
        const response = await HTTP.get(`/mentors/${mentorId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail || error.message;
    }
};