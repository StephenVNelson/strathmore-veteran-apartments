import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/buildings/";

export function getBuildings() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
