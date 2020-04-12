import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/companies/";

export function getCompanies() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
