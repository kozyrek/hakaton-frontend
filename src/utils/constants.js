export const ROUTES = {
  MAIN: "/",
  REGISTRATION: "/registration",
  LOGIN: "/login",
  PROFILE: "/profile",
  TEAM_BY_ID: "/team/:teamId",
  RECOVERY: "/recovery",
  PASSWORDRESET: "/reset",
  PROJECT_ID: "/project/:projectId",
  STEP_ID: "/step/:stepId",
  USER_ID: "/profile/:userId",
};

export const ROLES = {
  ADMIN: "Администратор",
  MENTOR: "Ментор",
  PARTICIPANT: "Участник",
  UNDEFINED: "Роль не определена",
}

export const STEP_PROJECT_STATUS = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  SUBMITTED: "Submitted for review",
  ACCEPTED: "Accepted",
  TIME_EXCEEDED: "Time exceeded",
}

export const POINTS = ["балл", "балла", "баллов"];
export const MINUTES = ["минута", "минуты", "минут"];
export const SECONDS = ["секунда", "секунды", "секунд"];

export const FILENAME_EXTENSION = [".pdf", ".txt", ".doc", ".docx"]

export const FILENAME_EXTENSION_FULL = [".jpeg", ".jpg", ".png", ".bmp", ".pdf", ".rtf", ".odt", ".txt", ".doc", ".docx", ".xls", ".xlsx", ".ods", ".csv", ".ppt", ".pptx", ".mp4", ".mp3", ".avi", ".mov", ".wmv", ".wav", ".mpeg", ".flv", ".aac", ".au", ".7z", ".rar", ".zip", ".psd", ".cdr", ".ai", ".stl", ".eps"]
