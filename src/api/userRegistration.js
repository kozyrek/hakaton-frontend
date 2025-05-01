import { HTTP } from "./http";

export default async function userRegistration() {
  const response = await HTTP.post('/users')

  console.log("res", response)
}