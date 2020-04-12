import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/roommateGroups/";

export function getRoommateGroups() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
