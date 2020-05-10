import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/companies/";

export function getCompanies() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}
