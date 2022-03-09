import {
	responsive_size_slider,
	pack_creator,
	index_slider_generator,
	render_images
} from "./slider"

const initializator = async () => {

	const container_slider = document.querySelector(".galeria__container")
	const slider_arrow_left = document.querySelector(".galeria__arrow--left")
	const slider_arrow_right = document.querySelector(".galeria__arrow--right")
	const modal_total_photos = document.querySelector(".modal__total-photos")

	const response = await fetch(`https://salonrizo.com/backend/api/`);
	const json = await response.json();
	const api_data = json.items;
	modal_total_photos.innerHTML = api_data.length

	reset_slider()

	const slider_pack = responsive_size_slider();
	const packs = pack_creator(api_data, slider_pack);
	const slider_index = index_slider_generator(packs.length);
	// slider_to_render help to no render images that not need to be render now
	let slider_to_render = 0;
	let slider_position = 0;
	let pack_to_show = slider_index[slider_to_render].index;
	render_images(api_data, packs[pack_to_show]);

	slider_arrow_left.onclick = () => {

		slider_position--

		let next_left_position = slider_index[slider_position].left

		slider_arrow_right.style.visibility = "visible"
		container_slider.style.left = `-${next_left_position}px`

		if (container_slider.style.left == "0px") {
			slider_arrow_left.style.visibility = "hidden"
		}
	}

	slider_arrow_right.onclick = () => {

		slider_arrow_left.style.visibility = "visible"
		
		if (slider_position == slider_to_render) {
			slider_to_render++
			pack_to_show = slider_index[slider_to_render].index
			render_images(api_data, packs[pack_to_show])
		}
		
		slider_position++

		if (slider_position == slider_index.length - 1) {
			slider_arrow_right.style.visibility = "hidden"
		}

		let new_left_position = slider_index[slider_position].left
		container_slider.style.left = `-${new_left_position}px`
	}

}

export const reset_container = (container) => {
	while (container.firstChild) {
		container.firstChild.remove()
	}
}

const modal_close_button = () => {
	const modal_close_button = document.querySelector(".modal__close")
	const modal = document.querySelector(".modal")

	modal_close_button.onclick = () => {
		modal.classList.remove("modal--active")
		modal.classList.add("modal--inactive")
	}
}

const reset_slider = () => {
	const container_slider = document.querySelector(".galeria__container")
	const slider_arrow_left = document.querySelector(".galeria__arrow--left")
	const slider_arrow_right = document.querySelector(".galeria__arrow--right")
	reset_container(container_slider)
	container_slider.style.left = "0px"
	slider_arrow_left.style.visibility = "hidden"
	slider_arrow_right.style.visibility = "visible"
}

// init
window.onresize = () => {
	initializator()
}
initializator()
modal_close_button()