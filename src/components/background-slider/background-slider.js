// makes background slider animation
const background_slides = document.querySelectorAll(".background-slider__slide")
let slide_turn = 0;

background_slider = () => {

	background_slides.forEach(slide => {
		slide.classList.remove("background-slider__slide--active")
	});

	if (slide_turn > background_slides.length - 1) { slide_turn = 0 }

	background_slides[slide_turn].classList.add("background-slider__slide--active")

	slide_turn++;

	setTimeout(() => { background_slider() }, 5000);
}


background_slider();