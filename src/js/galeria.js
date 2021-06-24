import modalCircle from "../assets/img/svgModalCircle.svg";
import carousel from "../assets/img/svgCarousel.svg";
import video from "../assets/img/svgVideo.svg";
import rightArrow from "../assets/img/svgRightArrow.svg";
import leftArrow from "../assets/img/svgLeftArrow.svg";

carousel
// SVG's
let SVGs = {
 modalCircle: modalCircle,
 carousel: carousel,
 video: video,
 rightArrow: rightArrow,
 leftArrow: leftArrow,
};

// class
class galeriaPublication {
 constructor(id, order, caption, permalink, type, img, vid, children) {
  this.id = id;
  this.order = order;
  this.caption = caption;
  this.permalink = permalink;
  this.container;
  this.type = type;
  this.img = img;
  this.vid = vid;
  this.children = children;
  this.childrenDisplay = 0;
 }
 setContainer(container) {
  this.container = container;
 }
 setChildrenDisplay(value) {
  this.childrenDisplay += value;
 }
 printImg() {
  let newImg;
  newImg = document.createElement("div");
  newImg.classList.add("galeriaImg");
  if (this.type == "CAROUSEL_ALBUM") {
   newImg.innerHTML = `<div class='loaderImg'></div><div class='galeriaImgContainer'><div class='galeriaSVG'>${SVGs["carousel"]}</div><img class ='galeriaImages' src='${this.img}' loading="lazy" alt='${this.caption}'></div>`;
  } else if (this.type == "VIDEO") {
   newImg.innerHTML = `<div class='loaderImg'></div><div class='galeriaImgContainer'><div class='galeriaSVG'>${SVGs["video"]}</div><img class ='galeriaImages' src='${this.img}' loading="lazy" alt='${this.caption}'>`;
  } else {
   newImg.innerHTML = `<div class='loaderImg'></div><div class='galeriaImgContainer'><img class ='galeriaImages' src='${this.img}' loading="lazy" alt='${this.caption}'></div>`;
  }
  this.setContainer(newImg);
  return this.container;
 }
 modalDisplay(ele) {
  galeriaModalLoader.classList.remove("active");
  galeriaArrowCR.onclick = function () {
   self.galleryDisplay = ele.order;
   self.changeModal(self.gallery[parseInt(self.galleryDisplay) + 1]);
  };
  galeriaArrowCL.onclick = function () {
   self.galleryDisplay = ele.order;
   self.changeModal(self.gallery[parseInt(self.galleryDisplay) - 1]);
  };
  self.galleryDisplay = ele.order;
  if (self.galleryDisplay == 0) {
   galeriaArrowCL.style.visibility = "hidden";
   galeriaArrowCR.style.visibility = "visible";
  } else if (self.galleryDisplay == galeriaTotalImg.innerHTML - 1) {
   galeriaArrowCL.style.visibility = "visible";
   galeriaArrowCR.style.visibility = "hidden";
  } else if (self.galleryDisplay == self.gallery.length - 1) {
   galeriaArrowCL.style.visibility = "visible";
   let originalContent = galeriaArrowCR.innerHTML;
   galeriaArrowCR.innerHTML = "Ver más";
   galeriaArrowCR.onclick = function () {
    newGaleria.galleryButton();
    galeriaArrowCR.innerHTML = originalContent;
    galeriaArrowCR.onclick = function () {
     self.changeModal(self.gallery[parseInt(self.galleryDisplay) + 1]);
    };
   };
  } else {
   galeriaArrowCL.style.visibility = "visible";
   galeriaArrowCR.style.visibility = "visible";
  }
  galeriaModal.classList = "galeriaImages active";
  galeriaActualImg.innerHTML = parseInt(ele.order) + 1 + " /";
  galeriaClose.onclick = function () {
   galeriaModal.classList = "galeriaImages inactive";
   galeriaModalContent.removeChild(document.querySelector("#newContent"));
  };
  // children
  if (ele.type == "CAROUSEL_ALBUM") {
   if (ele.children[ele.childrenDisplay].media_type == "VIDEO") {
    var newContent = document.createElement("div");
    let newVideo = document.createElement("video");
    newContent.id = "newContent";
    newVideo.controls = true;
    newVideo.autoplay = true;
    newVideo.loop = true;
    newVideo.innerHTML =
     '<source src="' +
     ele.children[ele.childrenDisplay].url +
     '" type="video/mp4">';
    newVideo.onloadstart = function () {
     galeriaModalLoader.classList.add("active");
    };
    newContent.appendChild(newVideo);
   } else if (ele.children[ele.childrenDisplay].media_type == "IMAGE") {
    var newContent = document.createElement("div");
    let newImg = document.createElement("img");
    newContent.id = "newContent";
    newImg.onload = function () {
     galeriaModalLoader.classList.remove("inactive");
     galeriaModalLoader.classList.add("active");
    };
    newImg.src = ele.children[ele.childrenDisplay].url;
    newImg.onload = function () {
     galeriaModalLoader.classList.add("active");
    };
    newContent.appendChild(newImg);
   }
   galeriaModalContent.appendChild(newContent);
   // leftArrow
   let carouselArrowL = document.createElement("div");
   carouselArrowL.id = "carouselL";
   carouselArrowL.innerHTML = SVGs["leftArrow"];
   newContent.appendChild(carouselArrowL);
   carouselLFunction(carouselL, ele);

   // rightArrow
   let carouselArrowR = document.createElement("div");
   carouselArrowR.id = "carouselR";
   carouselArrowR.innerHTML = SVGs["rightArrow"];
   newContent.appendChild(carouselArrowR);
   carouselRFunction(carouselR, ele);
   let circleSpace = document.createElement("div");
   circleSpace.id = "circleSpace";
   ele.children.forEach((el) => {
    circleSpace.innerHTML += SVGs["modalCircle"];
   });
   newContent.appendChild(circleSpace);
   circleSpace.children[ele.childrenDisplay].style = "transform:scale(1.5);";
   // arrowDisplay
   if (ele.childrenDisplay == 0) {
    carouselL.style.visibility = "hidden";
    carouselR.style.visibility = "visible";
   } else if (ele.childrenDisplay == ele.children.length - 1) {
    carouselL.style.visibility = "visible";
    carouselR.style.visibility = "hidden";
   } else if (ele.childrenDisplay != 0) {
    carouselL.style.visibility = "visible";
    carouselR.style.visibility = "visible";
   }
   // children
  } else if (ele.type == "VIDEO") {
   let newContent = document.createElement("div");
   let newVideo = document.createElement("video");
   newContent.id = "newContent";
   newVideo.controls = true;
   newVideo.autoplay = true;
   newVideo.loop = true;
   newVideo.innerHTML = '<source src="' + ele.vid + '" type="video/mp4">';
   newVideo.onloadstart = function () {
    galeriaModalLoader.classList.add("active");
   };
   newContent.appendChild(newVideo);
   galeriaModalContent.appendChild(newContent);
  } else {
   let newContent = document.createElement("div");
   let newImg = document.createElement("img");
   newContent.id = "newContent";
   newImg.src = ele.img;
   newImg.onload = function () {
    galeriaModalLoader.classList.add("active");
   };
   newContent.appendChild(newImg);
   galeriaModalContent.appendChild(newContent);
  }
 }
}
class galeria {
 constructor() {
  this.gallery = [];
  self = this;
  this.galeriaStatus = 0;
  this.galleryDisplay = 0;
 }
 getPublications(url) {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
   if (ajax.readyState === 4) {
    let api = JSON.parse(ajax.responseText)["items"];
    if (!galeriaTotalImg.innerHTML) {
     galeriaTotalImg.innerHTML = JSON.parse(ajax.responseText)["count"];
    }
    api.forEach((e) => {
     let img = new galeriaPublication(
      e.id,
      e.order,
      e.caption,
      e.permalink,
      e.type,
      e.img,
      e.vid,
      e.children
     );
     galeriaContainer.appendChild(img.printImg());
     self.gallery.push(img);
    });
    imgLoader();
    self.openModal();
   }
  };
  ajax.open("GET", url);
  ajax.send();
 }
 openModal() {
  this.gallery.forEach((ele) => {
   ele.container.onclick = function () {
    ele.modalDisplay(ele);
   };
  });
 }
 changeModal(ele) {
  galeriaModalContent.removeChild(newContent);
  ele.modalDisplay(ele);
 }
 galleryButton() {
  if (this.galeriaStatus == 0) {
   this.galeriaStatus = 1;
   galeriaButton.innerHTML = "Contraer";
   newGaleria.getPublications(
    "https://salonrizo.com/src/api/?rest=" + sizePrincipalGallery
   );
  } else {
   imgLoader();
   this.galeriaStatus = 0;
   galeriaButton.innerHTML = "Ver más";
   this.gallery.splice(sizePrincipalGallery);
   let galleryComplete = document.querySelectorAll(".galeriaImg");
   galleryComplete.forEach((e, i = 0) => {
    if (i >= sizePrincipalGallery) {
     galeriaContainer.removeChild(e);
    }
    i++;
   });
  }
 }
}

// functions
function imgLoader() {
 loaderImg = document.querySelectorAll(".loaderImg");
 galeriaImages = document.querySelectorAll(".galeriaImages");
 galeriaImages.forEach((e) => {
  e.onload = function () {
   e.parentElement.parentElement.children[0].className += " active";
   e.parentElement.children[0].className += " active";
  };
 });
}
function carouselLFunction(ele, object) {
 ele.onclick = function () {
  object.setChildrenDisplay(-1);
  galeriaModalContent.removeChild(newContent);
  object.modalDisplay(object);
 };
}
function carouselRFunction(ele, object) {
 ele.onclick = function () {
  object.setChildrenDisplay(+1);
  galeriaModalContent.removeChild(newContent);
  object.modalDisplay(object);
 };
}

//variables
let sizePrincipalGallery = 4;

// init
let newGaleria = new galeria("");
newGaleria.getPublications(
 "https://salonrizo.com/src/api/?last=" + sizePrincipalGallery
);

// listeners
galeriaButton.onclick = function () {
 newGaleria.galleryButton();
};
