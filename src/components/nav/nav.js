// menu deploy when click and don't allow to move from menu and get whatsapp from the top to bottom
const menu_icon = document.querySelector(".nav__menu-container");
const nav = document.querySelector(".nav");
const body = document.querySelector("body");
const nav_links = document.querySelectorAll(".nav__link")
const medium_media_query = 992;

menu_icon.onclick = () => { close() };

nav_links.forEach(e => {
	e.onclick = () => { close() };
});

function close() {

	let screen_width = screen.width;

	if (screen_width < medium_media_query) {
		
		if (!nav.classList.contains("nav--active")) {

			nav.classList.add("nav--active")
			nav.classList.remove("nav--inactive")
			body.style.maxHeight = "100vh"
			body.style.width = "100vw"

		} else {

			nav.classList.remove("nav--active")
			nav.classList.add("nav--inactive")
			body.style.maxHeight = ""
			body.style.width = ""

		}
	}
}