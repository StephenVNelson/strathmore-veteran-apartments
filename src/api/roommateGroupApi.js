import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/roommateGroups/";

export function getRoommateGroups() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveRoommateGroup(roommateGroup) {
  return fetch(baseUrl + (roommateGroup.id || ""), {
    method: roommateGroup.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(roommateGroup)
  })
    .then(handleResponse)
    .catch(handleError);
}