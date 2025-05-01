import { HTTP } from "./http";

/**
 * Fetches user data from the API
 * @async
 * @function
 * @param {string} token - Authentication bearer token
 * @param {?(string|number)} [id=null] - User ID to fetch.
 *        If `null` or omitted, returns current authenticated user ("me" endpoint)
 * @returns {Promise<Object>} Promise resolving to user data object
 * @throws {Error} Throws error with descriptive message if API request fails
 *
 * @example
 * // Get current authenticated user
 * await getUser('auth_token_123');
 *
 * @example
 * // Get specific user by ID
 * await getUser('auth_token_123', 456);
 *
 * @note
 * - Automatically encodes user ID for URL safety
 * - Uses Bearer authentication in Authorization header
 * - Handles both numeric and string-based user IDs
 * - Returns parsed response data from API
 */

export default async function getUser(token, id = null) {
  console.log("ff")
  let param = id === null ? "me" : id;
  const response = await HTTP.get(`/users/${encodeURIComponent(param)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
