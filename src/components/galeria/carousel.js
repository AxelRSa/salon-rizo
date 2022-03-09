import {
	render_modal_image,
	render_modal_video
} from "./modal"

export const carousel_controls_visibility = (status) => {
	const carousel_dots = document.querySelector(".modal__dot-container")
	const carousel_arrow_left = document.querySelector(".modal__carousel-arrow--left")
	const carousel_arrow_right = document.querySelector(".modal__carousel-arrow--right")
	carousel_dots.style.visibility = status
	carousel_arrow_left.style.visibility = "hidden"
	carousel_arrow_right.style.visibility = status
}

export const carousel_arrow_function = (publication) => {
	const carousel_arrow_left = document.querySelector(".modal__carousel-arrow--left")
	const carousel_arrow_right = document.querySelector(".modal__carousel-arrow--right")
	const dots = document.querySelectorAll(".modal__dot")
	let index_carousel = 0

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

