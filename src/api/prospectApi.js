import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/prospects/";

export function getProspects() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
