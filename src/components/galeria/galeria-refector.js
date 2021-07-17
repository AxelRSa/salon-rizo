import dot from "../../media/img/svg-dot-carousel.svg"

// slider in the gallery
const container_slider = document.querySelector(".galeria__container")
const slider_arrow_left = document.querySelector(".galeria__arrow--left")
const slider_arrow_right = document.querySelector(".galeria__arrow--right")
const modal = document.querySelector(".modal")
const modal_content = document.querySelector(".modal__content")
const modal_currently_photo = document.querySelector(".modal__currently-photo")
const modal_total_photos = document.querySelector(".modal__total-photos")
const modal_arrow_left = document.querySelector(".modal__arrow--left")
const modal_arrow_right = document.querySelector(".modal__arrow--right")
const modal_link_instagram = document.querySelector(".modal__link")
const carousel_dots = document.querySelector(".modal__dot-container")
const carousel_arrow_left = document.querySelector(".modal__carousel-arrow--left")
const carousel_arrow_right = document.querySelector(".modal__carousel-arrow--right")
let index_carousel = 0

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

const reset_container = (container) => {
	while (container.firstChild) {
		container.firstChild.remove()
	}
}

const responsive_size_slider = () => {
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

const pack_creator = (api_data, pack_size) => {

	// how many times is going to repeat the for cycle
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

const index_slider_generator = (packs_quantity) => {

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

const render_images = (slider_images_all, pack) => {

	let pack_container = document.createElement("div")
	pack_container.classList.add("galeria__pack")

	pack.forEach(image => {

		let image_container = document.createElement("div")
		image_container.classList.add("galeria__image-container")
		image_container.innerHTML = `
		<img class="galeria__image" src="${image.img}" alt="${image.caption}">
		`
		image_container.onclick = () => { render_modal(slider_images_all, image) }
		pack_container.appendChild(image_container)

	});

	container_slider.appendChild(pack_container)
	// container height 
	let image_containers = document.querySelectorAll(".galeria__image-container")
	image_containers.forEach(image => {
		image.style.height = `${image.offsetWidth}px`
	});
}

const render_modal = (slider_images_all, image) => {
	modal.classList.remove("modal--inactive")
	modal.classList.add("modal--active")
	modal_currently_photo.innerHTML = parseInt(image.order) + 1
	index_carousel = 0
	let index_modal = image.order
	modal_link_instagram.href = image.permalink
	modal_link_instagram.target = "_blank"

	if (index_modal == 0) {
		modal_arrow_left.style.display = "none"
	} else if (index_modal == slider_images_all.length - 1) {
		modal_arrow_right.style.display = "none"
	} else {
		modal_arrow_left.style.display = "block"
		modal_arrow_right.style.display = "block"
	}

	modal_arrow_left.onclick = () => {
		index_modal--
		render_modal(slider_images_all, slider_images_all[index_modal])
	}
	modal_arrow_right.onclick = () => {
		index_modal++
		render_modal(slider_images_all, slider_images_all[index_modal])
	}

	if (image.type === "IMAGE") {
		carousel_controls_visibility("hidden")
		render_modal_image(image.img)
	} else if (image.type === "VIDEO") {
		carousel_controls_visibility("hidden")
		render_modal_video(image.vid, image.img)
	} else {
		reset_container(carousel_dots)
		let dots_quantity = image.children.length
		for (let i = 0; i < dots_quantity; i++) {
			let dot_item = document.createElement("img")
			dot_item.classList.add("modal__dot")
			dot_item.src = dot
			carousel_dots.appendChild(dot_item)
		}
		const dots = document.querySelectorAll(".modal__dot")
		dots[0].classList.toggle("modal__dot--active")

		if (image.children[0].media_type === "IMAGE") {
			carousel_controls_visibility("visible")
			carousel_arrow_function(image, dots)
			render_modal_image(image.children[index_carousel].url)
		} else {
			carousel_controls_visibility("visible")
			carousel_arrow_function(image, dots)
			render_modal_video(image.children[index_carousel].url, image.img)
		}
	}
}

const carousel_controls_visibility = (status) => {
	carousel_dots.style.visibility = status
	carousel_arrow_left.style.visibility = "hidden"
	carousel_arrow_right.style.visibility = status
}

const render_modal_image = (image) => {
	reset_container(modal_content)
	let content = document.createElement("img")
	content.classList.add("modal__publication")
	content.src = `${image}`
	modal_content.appendChild(content)
}

const render_modal_video = (video, poster) => {
	reset_container(modal_content)
	let content = document.createElement("video");
	content.classList.add("modal__publication")
	content.src = `${video}`
	content.controls = true
	content.autoplay = true
	content.loop = true
	content.muted = true
	content.poster = poster
	modal_content.appendChild(content)
}

const carousel_arrow_function = (publication, dots) => {
	carousel_arrow_left.onclick = () => {
		index_carousel--
		if (index_carousel == 0) {
			carousel_arrow_left.style.visibility = "hidden"
		} else if (index_carousel == publication.children.length - 1) {
			carousel_arrow_right.style.visibility = "hidden"
		} else {
			carousel_arrow_left.style.visibility = "visible"
			carousel_arrow_right.style.visibility = "visible"
		}
		dots.forEach(dot => {
			dot.classList.remove("modal__dot--active")
		});
		dots[index_carousel].classList.add("modal__dot--active")

		if (publication.children[index_carousel].media_type === "IMAGE") {
			let image = publication.children[index_carousel].url
			render_modal_image(image)
		} else {
			let video = publication.children[index_carousel].url
			render_modal_video(video, publication.img)
		}
	}
	carousel_arrow_right.onclick = () => {
		index_carousel++
		if (index_carousel == 0) {
			carousel_arrow_left.style.visibility = "hidden"
		} else if (index_carousel == publication.children.length - 1) {
			carousel_arrow_right.style.visibility = "hidden"
		} else {
			carousel_arrow_left.style.visibility = "visible"
			carousel_arrow_right.style.visibility = "visible"
		}
		carousel_arrow_left.style.visibility = "visible"
		dots.forEach(dot => {
			dot.classList.remove("modal__dot--active")
		});
		dots[index_carousel].classList.add("modal__dot--active")


		if (publication.children[index_carousel].media_type === "IMAGE") {
			let image = publication.children[index_carousel].url
			render_modal_image(image)
		} else {
			let video = publication.children[index_carousel].url
			render_modal_video(video, publication.img)
		}
	}
}

// init
window.onresize = () => {
	initializator()
}
initializator()
// modal onclick to close itself
let modal_close_button = document.querySelector(".modal__close")
modal_close_button.onclick = () => {
	modal.classList.remove("modal--active")
	modal.classList.add("modal--inactive")
}