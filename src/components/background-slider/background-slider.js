// makes background slider animation
const slides = document.querySelectorAll(".background-slider__slide")
let slide_turn = 0;

slider = () => {

	slides.forEach(slide => {
		slide.classList.remove("background-slider__slide--active")
	});

	if (slide_turn > slides.length - 1) { slide_turn = 0 }

	slides[slide_turn].classList.add("background-slider__slide--active")

	slide_turn++;

	setTimeout(() => { slider() }, 5000);
}


slider();