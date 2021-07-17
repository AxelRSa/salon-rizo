// functions
import {
	responsive_size_slider,
	pack_creator,
	index_slider_generator,
	render_images
} from "./slider"

// modal onclick to close itself
const modal_close_button = document.querySelector(".modal__close")
const modal = document.querySelector(".modal")
modal_close_button.onclick = () => {
	modal.classList.remove("modal--active")
	modal.classList.add("modal--inactive")
}
// slider in the gallery
const container_slider = document.querySelector(".galeria__container")
const slider_arrow_left = document.querySelector(".galeria__arrow--left")
const slider_arrow_right = document.querySelector(".galeria__arrow--right")
const modal_total_photos = document.querySelector(".modal__total-photos")


const initializator = async () => {

	const response = await fetch(`https://salonrizo.com/resource/api/`);
	const json = await response.json();
	const slider_images_all = json.items;
	modal_total_photos.innerHTML = slider_images_all.length
	// reset
	reset_container(container_slider)
	container_slider.style.left = "0px"
	slider_arrow_left.style.display = "none"
	slider_arrow_right.style.display = "flex"
	// reset
	const slider_pack = responsive_size_slider();
	const packs = pack_creator(slider_images_all, slider_pack);
	let slider_index = index_slider_generator(packs.length);
	let slider_position = 0;
	let slider_to_render = 0;
	let pack_to_show = slider_index[0].index;
	render_images(slider_images_all, packs[pack_to_show]);

	slider_arrow_left.onclick = () => {

		slider_position--
		let next_left_position = slider_index[slider_position].left
		slider_arrow_right.style.display = "flex"

		container_slider.style.left = `-${next_left_position}px`

		if (container_slider.style.left == "0px") {
			slider_arrow_left.style.display = "none"
		}
	}

	slider_arrow_right.onclick = () => {
		slider_arrow_left.style.display = "flex"

		if (slider_position == slider_to_render) {
			slider_to_render++
			pack_to_show = slider_index[slider_to_render].index
			render_images(slider_images_all, packs[pack_to_show])
		}

		slider_position++

		if (slider_position == slider_index.length - 1) {
			slider_arrow_right.style.display = "none"
		}


		let next_left_position = slider_index[slider_position].left
		container_slider.style.left = `-${next_left_position}px`
	}

}

export const reset_container = (container) => {
	while (container.firstChild) {
		container.firstChild.remove()
	}
}

// init

window.onresize = () => {
	initializator()
}
initializator()
