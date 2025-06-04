/**
 * Autocomplete function declaration, do not delete
 * @param {import('./__schema__.js').Payload} options
 */

import wixData from 'wix-data';

export function addNewPostMetaData(id) {
  const toInsert = {
    // Replace these fields with your actual collection field keys and values
    id
    // Add more fields as needed
  };

  wixData.insert("postsMetaData", toInsert)
    .then((result) => {
      console.log("Item added:", result);
    })
    .catch((err) => {
      console.error("Error adding item:", err);
    });
}

export const invoke = async ({payload}) => {
  console.log(payload.id)
  addNewPostMetaData(payload.id)
  // Your code here
  return {} // The function must return an empty object, do not delete
};