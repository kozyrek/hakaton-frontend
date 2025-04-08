export const ROUTES = {
  MAIN: "/",
  REGISTRATION: "/registration",
  LOGIN: "/login",
  PROFILE: "/profile",
  RECOVERY: "/recovery",
  TEAMSPAGE: "/profile/teams/:teamId", 
  PROJECTSPAGE: "/profile/projects/:projectId",
  STAGES: "/stages",
  USER_ID: "/profile/:userId",
};

export const ROLES = {
  ADMIN: "Администратор",
  MENTOR: "Ментор",
  PARTICIPANT: "Участник",
  UNDEFINED: "Роль не определена",
}
