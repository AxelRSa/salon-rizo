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









// let slider = () => {
// 	// for (let i = 0; i < slides.length; i++) {
// 	// 	setTimeout(() => { }, 1000)
// 	// 	if (i > slides.length) {
// 	// 		i = 0
// 	// 	}
// 	// }
// 	slides.forEach(e => {
// 		console.log(e);
// 		setTimeout(() => {
// 			e.classList.add("background-slider__slide--active")
// 		}, 5000)
// 	});
// 	// slider();
// 	setTimeout(() => { slider(); }, 5000)
// }

// slider()

// // slider animation
// var slideIndex = 0;
// var slides = document.getElementsByClassName("slide");
// slider();

// function slider() {
// 	// reset opacity
// 	for (let i = 0; i < slides.length; i++) {
// 		slides[i].style.opacity = "0";
// 	}
// 	// reset index after pass all slides
// 	if (slideIndex >= slides.length) {
// 		slideIndex = 0;
// 	}
// 	// slide appear
// 	slides[slideIndex].style.opacity = "1";
// 	// add 1 to slideIndex
// 	slideIndex++;
// 	// time to change slider
// 	setTimeout(slider, 5000);
// }