import { HTTP } from "./http";

/**
 * Fetches regions list
 */
export default async function getRegions() {
  const response = await HTTP.get("/regions");
  return response.data;
}
