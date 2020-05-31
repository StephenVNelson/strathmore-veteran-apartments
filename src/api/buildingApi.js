import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/buildings";

export function getBuildings() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}
