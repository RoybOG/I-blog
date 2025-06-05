
import wixData from "wix-data";
// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
//let catagories_selected = new Set();
//let tags_selected = new Set();
//let catagorySelectedID = "";
let t;
const itemColors = {defualt: "#cebdb2", "active":"#eeb591"}


function getRowsFromCollection(colNanme) {
    wixData.query(colNanme) // Replace with your collection name
        .find()
        .then((results) => {
            if(results.items.length > 0) {
				 console.log(results.items); // Array of collection rows
				
               
                // You can now use results.items as needed
            } else {
                console.log("No items found");
            }
        })
        .catch((err) => {
            console.error("Query failed:", err);
        });
}


let tags_selected = new Map(); //chose a map over a normal object becuase its more optimized for frequent removal of keys
let catagory_selected=null;

function update_filter(){
	let newDatasetFilter =  wixData.filter()
	
	if(catagory_selected){
		newDatasetFilter = newDatasetFilter.eq('catagory',catagory_selected._id)
	}

	if(tags_selected.size > 0){
		//tags_selected.forEach((v, k, map)=>{
	newDatasetFilter = newDatasetFilter.hasAll("tag_ids", Array.from(tags_selected.keys()));
	/*tags_selected.forEach((v, k, map)=>{
		newDatasetFilter = newDatasetFilter.and(wixData.filter().eq('catagory',k))
	})*/
	}

	$w('#RecommendationsDataset').setFilter(newDatasetFilter)
}


$w.onReady(function () {
	getRowsFromCollection('Tags');

 	//handling the catagories
	

	$w("#catagoriesRepeater").onItemReady(($item, itemData, index) => {
		$item("#catagoryBox").style.backgroundColor= itemColors.defualt
		
		$item("#catagoryContainer").onClick(async () => {
			if(catagory_selected?._id != itemData._id){
				$w("#catagoriesRepeater").forItems([catagory_selected?._id],($item, itemData)=>{
					$item("#catagoryBox").style.backgroundColor= itemColors.defualt
					// console.log(`previously chose ${itemData.title}`)
				})
					
				$item("#catagoryBox").style.backgroundColor= itemColors.active
				catagory_selected = itemData
			
				update_filter()
			}
		})
		
	})
		
	$w("#tagsRepeater").onItemReady(($item, itemData, index) => {
		$item("#tagBox").style.backgroundColor= itemColors.defualt
		$item("#tagContainer").onClick(async () => {
			
			if(tags_selected.delete(itemData._id)){ //delete returns true if the key was deleted, false if not found
				$item("#tagBox").style.backgroundColor= itemColors.defualt
			
			}
			else{
				tags_selected.set(itemData._id, itemData)
				$item("#tagBox").style.backgroundColor= itemColors.active
			
			}

			
		//
			update_filter()
			//$w('#RecommendationsDataset').setFilter(current_filter)
			})
    // handle delete button click
		

		
	})
	

});