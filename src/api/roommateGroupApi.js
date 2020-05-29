import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/roommateGroups";

export async function getRoommateGroup(id) {
  console.log("fetching")
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
    });
    return await handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

export function getRoommateGroups() {
  return fetch(baseUrl, {
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}` }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveRoommateGroup(roommateGroup) {
  return fetch(baseUrl + "/" + (roommateGroup.id || ""), {
    method: roommateGroup.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`
    },
    body: JSON.stringify({ fields: { ...roommateGroup.fields } })
  })
    .then(handleResponse)
    .catch(handleError);
}