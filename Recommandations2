import wixData from "wix-data";

const itemColors = {defualt: "#F6EBE4", "active":"#eeb591"}

let tags_selected = new Map(); //chose a map over a normal object becuase its more optimized for frequent removal of keys
let catagory_selected=null;




function update_filter(){
	let newDatasetFilter =  wixData.filter()
	
	if(catagory_selected){
		newDatasetFilter = newDatasetFilter.eq('category',catagory_selected._id)
	}

	/* if(tags_selected.size > 0){
	 	//tags_selected.forEach((v, k, map)=>{
	 newDatasetFilter = newDatasetFilter.hasAll("tag_ids", Array.from(tags_selected.keys()));
	
	}*/

	$w('#RecommandationsDataset').setFilter(newDatasetFilter)
}



$w.onReady(function () {

	//-------------------- tabs setup ------------------------

	$w("#searchtabs").onChange((e)=>{
		const tabContent = e.target.currentTab.children[0];
		tabContent.expand();
	})
	$w('#buttonToggle').onClick(()=>{
		const tabContent = $w("#searchtabs").currentTab.children[0];
		if(tabContent.collapsed){
			tabContent.expand();
		}else{
			tabContent.collapse();
		}
		
	})



	//------------catagory reapter setup -------------

	$w("#catRepeater").onItemReady(($item, itemData, index) => {
		if(catagory_selected?._id == itemData._id){
			$item("#catBox").style.backgroundColor= itemColors.active
		}
		$item("#catContainer").onClick(async () => {
			$w('#allCatButton').enable();
			if(catagory_selected?._id != itemData._id){
				
				$w("#catRepeater").forItems([catagory_selected?._id],($item, itemData)=>{
					$item("#catBox").style.backgroundColor= itemColors.defualt
				})

				$item("#catBox").style.backgroundColor= itemColors.active
				catagory_selected = itemData
				console.log(catagory_selected)

				update_filter()
			}
		})
	})
	
	const catButton = $w("#allCatButton")
	catButton.disable()

	catButton.onClick(()=>{
		$w("#catRepeater").forItems([catagory_selected?._id],($item, itemData)=>{
					$item("#catBox").style.backgroundColor= itemColors.defualt
		})
		catagory_selected = null
		update_filter()
		catButton.disable()
	})



});
