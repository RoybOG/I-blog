import wixData from "wix-data";

const itemColors = {defualt: "#F6EBE4", "active":"#eeb591"}
const buttonIcons = {"close":"wix:vector://v1/11062b_e457b873ae5046a0bb21aedc8db8aef2.svg/", "open":"wix:vector://v1/11062b_c66d2a059af242d7a4621c0f23dd8fa2.svg/"}
let tags_selected = new Map(); //chose a map over a normal object becuase its more optimized for frequent removal of keys
let catagory_selected=null;




function update_filter(){
	let newDatasetFilter =  wixData.filter()
	
	if(catagory_selected){
		newDatasetFilter = newDatasetFilter.eq('category',catagory_selected._id)
	}

	 if(tags_selected.size > 0){
	console.log(tags_selected)
	 newDatasetFilter = newDatasetFilter.hasAll("tagIDs", Array.from(tags_selected.keys()));
	
	}

	$w('#RecommandationsDataset').setFilter(newDatasetFilter)
}


function handleTabContent(tabObj, toggleButtonObj, openTab=false){
	const tabContent = tabObj.currentTab.children[0];
	if(openTab){
		tabContent.expand();
		toggleButtonObj.icon = buttonIcons.close
	}else{
		toggleButtonObj.icon = buttonIcons.open
		tabContent.collapse();
	}
}




function resetCategory(new_category_data=null){
	$w("#catRepeater").forItems([catagory_selected?._id],($item, itemData)=>{
					$item("#catBox").style.backgroundColor= itemColors.defualt
	})
	catagory_selected = new_category_data
}


function resetTags(){
	$w("#tagsRepeater").forItems(Array.from(tags_selected.keys()),($item, itemData)=>{
					$item("#tagBox").style.backgroundColor= itemColors.defualt
	})
	tags_selected.clear()
}



$w.onReady(function () {

	//-------------------- tabs setup ------------------------
	const searchTabs = $w("#searchtabs")
	const toggleButton = $w('#buttonToggle')
	searchTabs.onChange((e)=>{
		handleTabContent(searchTabs,toggleButton,true)
	})
	toggleButton.onClick((event)=>{
		console.log(event.target.icon)
		const tabContent = searchTabs.currentTab.children[0];
		handleTabContent(searchTabs,toggleButton,tabContent.collapsed)
		
	})

	handleTabContent(searchTabs,toggleButton,false) //collapsed by defualt



	//------------catagory reapter setup -------------

	const catButton = $w("#allCatButton")
	$w("#catRepeater").onItemReady(($item, itemData, index) => {
		const itemBox =  $item("#catBox")
		if(catagory_selected?._id == itemData._id){
			itemBox.style.backgroundColor= itemColors.active
		}
		$item("#catContainer").onClick(async () => {
			catButton.enable();
			if(catagory_selected?._id != itemData._id){
				itemBox.style.backgroundColor= itemColors.active
				resetCategory(itemData)
				console.log(catagory_selected)

				update_filter()
			}
		})
	})
	
	
	catButton.disable()

	catButton.onClick(()=>{
		resetCategory()
		update_filter()
		catButton.disable()
	})


	//------------tags reapter setup -------------
	const tagButton = $w("#allTagsButton")
	$w("#tagsRepeater").onItemReady(($item, itemData, index) => {
		const itemBox = $item("#tagBox")
		if(tags_selected.has(itemData._id)){
			itemBox.style.backgroundColor= itemColors.active
		}
		$item("#tagContainer").onClick(async () => {
			
			
			
			if(tags_selected.delete(itemData._id)){ //delete returns true if the key was deleted, false if not found
				itemBox.style.backgroundColor= itemColors.defualt
			
			}
			else{
				tags_selected.set(itemData._id, itemData)
				itemBox.style.backgroundColor= itemColors.active
			
			}
			console.log(tags_selected)
			update_filter()

			if(tags_selected.size == 0){
				tagButton.disable()
			}else{
				tagButton.enable()
			}
			

		})
	})
	
	
	tagButton.disable()

	tagButton.onClick(()=>{
		resetTags()
		update_filter()
		tagButton.disable()
	})



});
