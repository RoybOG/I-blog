
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




$w.onReady(function () {
	//getRowsFromCollection('Recommendations');

	
	let catagories_selected = new Map(); //chose a map over a normal object becuase its more optimized for frequent removal of keys
	let catagory_selected=null;

	$w("#catagoriesReapeater").onItemReady(($item, itemData, index) => {
		$item("#catagoryBox").style.backgroundColor= itemColors.defualt
		$item("#catagoryContainer").onClick(async () => {
			$w("#catagoriesReapeater").forItems([catagory_selected?._id],($item, itemData)=>{
				$item("#catagoryBox").style.backgroundColor= itemColors.defualt
				console.log(`previously chose ${itemData.title}`)
			})
			$item("#catagoryBox").style.backgroundColor= itemColors.active
			catagory_selected = itemData
			

			$w('#RecommendationsDataset').setFilter(wixData.filter().eq('catagory',itemData._id))
		})
	})
		/*
	$w("#catagoriesReapeater").onItemReady(($item, itemData, index) => {
		$item("#catagoryBox").style.backgroundColor= itemColors.defualt
		$item("#catagoryContainer").onClick(async () => {
			
			if(catagories_selected.delete(itemData._id)){ //delete returns true if the key was deleted, false if not found
				$item("#catagoryBox").style.backgroundColor= itemColors.defualt
			
			}else{
				catagories_selected.set(itemData._id, itemData)
				$item("#catagoryBox").style.backgroundColor= itemColors.active
			
			}

			let current_filter = wixData.filter()
		catagories_selected.forEach((v, k, map)=>{
			current_filter = current_filter.and(wixData.filter().eq('catagory',k))
		})

			$w('#RecommendationsDataset').setFilter(
  wixData.filter().eq('catagory',itemData._id))
			console.log(catagories_selected)
    // handle delete button click
		})

		
	})*/
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});