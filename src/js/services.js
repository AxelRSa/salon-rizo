//////////////
// servicios
//////////////
serviciosReady();

function serviciosReady() {
 // making an array of all services
 services = document.querySelectorAll(".serviciosLi");
 // to close the same tab
 classStatus = "";
 // assign a valor to know if is odd o even
 oddOrEvenLi(services);

 // add the open and close function for the animation
 services.forEach((element) => {
  // a variable to know the scroll
  let positionTop = element.offsetTop;

  // onclick function
  element.onclick = function () {
   // make the scroll to the selected service
   document.body.scrollTop = positionTop;
   document.documentElement.scrollTop = positionTop;

   // reset
   if (classStatus != element.className) {
    services.forEach((element) => {
     element.classList.remove("active");
     element.children[0].children[0].style.left = "";
     element.children[0].children[0].style.right = "";
    });
   }

   // if open
   if (
    element.className == "serviciosLi" ||
    element.className == "serviciosLi inactive" ||
    element.className == "serviciosLi secondary" ||
    element.className == "serviciosLi secondary inactive"
   ) {
    element.classList.remove("inactive");
    element.classList.add("active");
    centerTextServicios(element);
    // if close
   } else if (
    element.className == "serviciosLi active" ||
    element.className == "serviciosLi secondary active"
   ) {
    element.classList.remove("active");
    element.classList.add("inactive");
    element.children[0].children[0].style.left = "";
    element.children[0].children[0].style.right = "";
   }
   // save the class status
   classStatus = element.className;
  };
 });

 // service text animation
 function centerTextServicios(element) {
  // select the div and the text
  let container = element.children[0];
  let text = element.children[0].children[0];
  let value = 0;

  //RIGHT animation
  if (element.OddOrEven == "odd") {
   // make the operation
   value = container.offsetWidth / 2 - text.offsetWidth / 2;
   // add th eleft to animate
   text.style.right = value + "px";

   //LEFT animation
  } else if (element.OddOrEven == "even") {
   // make the operation
   value = container.offsetWidth / 2 - text.offsetWidth / 2;

   // add the left to animate
   text.style.left = value + "px";
  }
 }

 function oddOrEvenLi(objectsArray) {
  // state to assign a value
  let oddOrEven = 1;
  // check all the array and assign a value
  objectsArray.forEach((element) => {
   // even value
   if (oddOrEven % 2 == 0) {
    element["OddOrEven"] = "even";
   } else {
    // odd value
    element["OddOrEven"] = "odd";
   }
   // increment
   oddOrEven++;
  });
 }
}
function resetServicios() {
 services = document.querySelectorAll(".serviciosLi");
 services.forEach((element) => {
  if (classStatus != element.className) {
   services.forEach((element) => {
    element.classList.remove("active");
    element.children[0].children[0].style.left = "";
    element.children[0].children[0].style.right = "";
   });
  }
 });
}

// when is ready
status = 0;
original = serviciosList.innerHTML;
serviciosBtn.onclick = function () {
 getServices();
};

function getServices() {
 // on click function
 if (status == 0) {
  // if open
  status = 1;
  requestServices();
  resetServicios();
  serviciosReady();
  serviciosBtn.innerHTML = "Contraer";
  return false;
 } else {
  // if close
  serviciosList.innerHTML = original;
  status = 0;
  resetServicios();
  serviciosReady();
  serviciosBtn.innerHTML = "Más servicios";
  return false;
 }
}
//////////////
// servicios
//////////////

// request
function requestServices() {
 var servicesXHR = new XMLHttpRequest();
 servicesXHR.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
   serviciosList.innerHTML += this.responseText;
   serviciosReady();
   resetServicios();
  }
 };
 servicesXHR.open("GET", "src/services.php", true);
 servicesXHR.send();
}
