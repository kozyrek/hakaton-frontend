export const ROUTES = {
  MAIN: "/",
  REGISTRATION: "/registration",
  LOGIN: "/login",
  PROFILE: "/profile",
  RECOVERY: "/recovery",
  STAGES: "/stages",
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
