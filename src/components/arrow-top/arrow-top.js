// arrow appear on screen when scroll become to 20px and on a click go up
const arrow_top = document.querySelector(".arrow-top");
const space_to_arrow = 20;

window.onscroll = () => {
	let space_from_top_body = document.body.scrollTop;
	let space_from_top_doc = document.documentElement.scrollTop;

	if (space_from_top_body > space_to_arrow || space_from_top_doc > space_to_arrow) {
		arrow_top.classList.add("arrow-top--active")
	} else {
		arrow_top.classList.remove("arrow-top--active")
	}

}

arrow_top.onclick = () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

