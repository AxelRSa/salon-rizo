import { render_modal } from "./modal"

export const responsive_size_slider = () => {
	let slider_pack = 0;
	const window_width = document.body.clientWidth

	if (window_width >= 1400) {
		slider_pack = 14
	} else if (window_width >= 1200) {
		slider_pack = 12
	} else if (window_width >= 992) {
		slider_pack = 10
	} else if (window_width >= 768) {
		slider_pack = 8
	} else if (window_width >= 576) {
		slider_pack = 6
	} else {
		slider_pack = 4
	}
	return slider_pack
}

export const pack_creator = (api_data, pack_size) => {

	// how many times is going to repeat the "for" cycle
	let repeat_for_cycle = Math.ceil(api_data.length / pack_size);
	let index_data = 0
	let slider_images_packs = []

	for (let i = 0; i < repeat_for_cycle; i++) {
		let pack_to_push = []

		for (let i = 0; i < pack_size; i++) {

			if (api_data[index_data]) {
				pack_to_push[i] = api_data[index_data]
				index_data++
			}
		}
		slider_images_packs.push(pack_to_push)
	}

	return slider_images_packs
}

export const index_slider_generator = (packs_quantity) => {

	const scrollbar_width = window.innerWidth - document.body.clientWidth
	const left_size = document.body.clientWidth + scrollbar_width
	let index = []

	for (let i = 0; i < packs_quantity; i++) {

		let index_individual = {
			index: i,
			left: left_size * i
		}

		index.push(index_individual)
	}

	return index
}

export const render_images = (publications, pack) => {

	const slider = document.querySelector(".galeria__container")
	const pack_container = document.createElement("div")
	pack_container.classList.add("galeria__pack")

	pack.forEach(image => {

		let image_container = document.createElement("div")
		image_container.classList.add("galeria__image-container")
		image_container.innerHTML = `
		<img class="galeria__image" src="${image.img}" alt="${image.caption}">
		`
		image_container.onclick = () => render_modal(publications, image)
		pack_container.appendChild(image_container)

	});

	slider.appendChild(pack_container)
	// galeria__image-container height to make squares
	let image_containers = document.querySelectorAll(".galeria__image-container")
	image_containers.forEach(image => {
		image.style.height = `${image.offsetWidth}px`
	});
}