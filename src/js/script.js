// SCSS
import "../pre/style.scss";
import "./galeria.js";
import "./services.js";

// loader's cirlce
loaderContainer.style.height = loaderContainer.clientWidth + "px";
// loader javascript
window.onload = function () {
 loader.className += " active";
 //go to top when refresh and change the URL
 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;
 history.pushState("", "", window.location.origin + window.location.pathname);
};

// up Arrow
window.onscroll = function () {
 scrollFunction();
};

function scrollFunction() {
 if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  upArrow.classList = "active";
 } else {
  upArrow.classList = "inactive";
 }
}

//////////////
// menu
//////////////

// menu animation
menuIcon.onclick = function () {
 if (menuDisplay.className == "" || menuDisplay.className == "inactive") {
  menuDisplay.className = "active";
  menuIcon.className = "active";
  //menu stop scrolling
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  body.className = "stop-scrolling";
 } else if (menuDisplay.className == "active") {
  closeMenu();
 }
};

function closeMenu() {
 menuDisplay.className = "inactive";
 menuIcon.className = "inactive";
 //menu stop scrolling
 body.className = "";
}
// menu options
var menuOption = document.querySelectorAll(".menuDisplayLink");
// each option in the menu
menuOption.forEach((element) => {
 // listener
 element.onclick = function () {
  closeMenu();
 };
});

//////////////
// menu
//////////////

//////////////
// slider
//////////////

// slider animation
var slideIndex = 0;
var slides = document.getElementsByClassName("slide");
slider();

function slider() {
 // reset opacity
 for (let i = 0; i < slides.length; i++) {
  slides[i].style.opacity = "0";
 }
 // reset index after pass all slides
 if (slideIndex >= slides.length) {
  slideIndex = 0;
 }
 // slide appear
 slides[slideIndex].style.opacity = "1";
 // add 1 to slideIndex
 slideIndex++;
 // time to change slider
 setTimeout(slider, 5000);
}

//////////////
// slider
//////////////
