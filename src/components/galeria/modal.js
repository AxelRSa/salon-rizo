import { reset_container } from "./galeria"
import { carousel_controls_visibility, carousel_arrow_function } from "./carousel"
import dot from "../../media/img/svg-dot-carousel.svg"

export const render_modal = (slider_images_all, image) => {
	const modal = document.querySelector(".modal")
	const modal_currently_photo = document.querySelector(".modal__currently-photo")
	const modal_link_instagram = document.querySelector(".modal__link")
	const modal_arrow_left = document.querySelector(".modal__arrow--left")
	const modal_arrow_right = document.querySelector(".modal__arrow--right")
	const carousel_dots = document.querySelector(".modal__dot-container")
	let index_carousel = 0
	let index_modal = image.order

	modal.classList.remove("modal--inactive")
	modal.classList.add("modal--active")
	modal_currently_photo.innerHTML = parseInt(index_modal) + 1
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

export const render_modal_image = (image) => {
	const modal_content = document.querySelector(".modal__content")
	let content = document.createElement("img")
	reset_container(modal_content)
	content.classList.add("modal__publication")
	content.src = `${image}`
	modal_content.appendChild(content)
}

export const render_modal_video = (video, poster) => {
	const modal_content = document.querySelector(".modal__content")
	let content = document.createElement("video");
	reset_container(modal_content)
	content.classList.add("modal__publication")
	content.src = `${video}`
	content.controls = true
	content.autoplay = true
	content.loop = true
	content.muted = true
	content.poster = poster
	modal_content.appendChild(content)
}