// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
//let catagories_selected = new Set();
//let tags_selected = new Set();
//let catagorySelectedID = "";
let t;
const itemColors = {defualt: "#cebdb2", "active":"#eeb591"}
/*
$w.onReady(function () {

	$w("#catagoriesReapeater").onItemReady(($item, itemData, index) => {
		$item("#catagoryBox").style.backgroundColor= itemColors.defualt
		$item("#catagoryContainer").onClick(async () => {
			
			if(catagorySelectedID != itemData.id){
				
				$w("#catagoriesReapeater").forItems([catagorySelectedID], ($item, itemData, index) =>{
					$item("#catagoryBox").style.backgroundColor= itemColors.defualt
					console.log(itemData.title)
				})
				
				$item("#catagoryBox").style.backgroundColor= itemColors.active
				catagorySelectedID = itemData.id
			
			
    // handle delete button click
	}})
	})*/

let catagories_selected = new Set();

	$w("#catagoriesReapeater").onItemReady(($item, itemData, index) => {
		$item("#catagoryBox").style.backgroundColor= itemColors.defualt
		$item("#catagoryContainer").onClick(async () => {
			if(catagories_selected.has(itemData.title)){
				catagories_selected.delete(itemData.title)
				$item("#catagoryBox").style.backgroundColor= itemColors.defualt
			
			}else{
				catagories_selected.add(itemData.title)
				$item("#catagoryBox").style.backgroundColor= itemColors.active
			
			}
			console.log(catagories_selected)
    // handle delete button click
		})
	})
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});