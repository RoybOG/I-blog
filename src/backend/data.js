import wixData from "wix-data";

//Updates the changed recommendations tag array. The tags are also saved in an array for tag searching
export async function BookRecommendations_afterUpdate(item, context) {
	const recTag = await wixData.queryReferenced("BookRecommendations",item._id, "tags")

	
	item.tagIDs = recTag.items.map((tag)=>tag._id) 
	item.updateTagIDs=false //resets the "saveTagChanges" button to indicate to the user the save was successful
	return item
	//TODO: write your code here...
}
