// make dropdown servies work

import lash_lifting from "../../media/img/services-lash-lifting.jpg"
import microblanding from "../../media/img/services-microblanding.jpeg"
import extensiones from "../../media/img/services-extensiones.jpg"
import colores from "../../media/img/services-colores.jpg"

let servicios_finder = () => {

	let s_containers = document.querySelectorAll(".servicios__container")

	s_containers.forEach(s_container => {

		let s_information_containers = document.querySelectorAll(".servicios__information")
		let s_information = s_container.children[1]

		s_container.onclick = () => {

			if (!s_information.classList.contains("servicios__information--active")) {

				s_information_containers.forEach(s_information_container => {

					s_information_container.classList.remove("servicios__information--active")

				})

				s_information.classList.add("servicios__information--active")

			} else {
				s_information.classList.remove("servicios__information--active")
			}
		}
	});
}

servicios_finder();

// button function to bring more services

const button_services = document.querySelector(".servicios__button")
const servicios_content = document.querySelector(".servicios__content")
let expanded_contracted = "contracted"

const more_services = [
	{
		title: "Lash lifting",
		alt: "Foto de trabajo de lash lifting",
		information: "Es un tratamiento profesional que levanta tus pestañas desde la raíz y las encurva haciéndolas ver más largas. Es un resultado natural que durará de 6 a 8 semanas.",
		image: lash_lifting
	},
	{
		title: "Microblanding",
		alt: "Foto de trabajo de microblanding",
		information: "Permite un acabado más natural que cualquier otra pigmentación gracias a que se trabaja pelo a pelo para emular el vello de tu ceja.",
		image: microblanding
	},
	{
		title: "Extensiones",
		alt: "Foto de trabajo de extensiones",
		information: "Las extensiones son mechones o cortinas de cabello que se añaden al cabello propio y que sirven, fundamentalmente, para aportar volumen y/o longitud a tu melena.",
		image: extensiones
	},
	{
		title: "Colores",
		alt: "Foto de trabajo de colores en el cabello",
		information: "Un tinte capilar es un tipo especial de colorante diseñado para dotar de un color determinado al cabello.",
		image: colores
	}
]

var append_services = []

button_services.onclick = () => {

	if (expanded_contracted == "contracted") {

		expanded_contracted = "expanded"

		more_services.forEach(service => {

			let servicios_container = document.createElement("div");
			servicios_container.classList.add("servicios__container");

			servicios_container.innerHTML = `
		<div class="servicios__header">
			<h2 class="servicios__service-title">${service.title}</h2>
			<img class="servicios__icon" src="${service.image}" />
		</div>
		<div class="servicios__information">
			<p class="servicios__description">${service.information}</p>
			<img class="servicios__image" src="${service.image}" />
		</div>
		`;

			append_services.push(servicios_container)
			servicios_content.appendChild(servicios_container)
		});

		servicios_finder()

	} else {

		expanded_contracted = "contracted"

		append_services.forEach(service => {
			service.remove()
		});
	}
}