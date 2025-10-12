import { HTTP } from "../http";

export default async function getRegion() {
  const response = await HTTP.get(`/regions`);
  return response;
}
