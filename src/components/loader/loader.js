// take off the container when it load
const loader = document.querySelector(".loader")

window.onload = () => {
	loader.classList.add("loader--active")
}