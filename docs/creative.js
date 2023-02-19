// Menu open and close
const menuBtn = document.querySelector(".menu-button");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");
const sliderContainer = document.querySelector(".slide-container");
const headings = document.querySelectorAll(".title");
const subtitles = document.querySelectorAll(".subtitle");

menuBtn.addEventListener("click", () => {
    if (nav.classList.contains("nav-open")) {
        nav.classList.remove("nav-open");
        hamburger.classList.remove("cross");
    }
    else {
        nav.classList.add("nav-open")
        hamburger.classList.add("cross");
    }
});

// Image slider
const leftSlider = document.querySelector(".lt-container");
const rightSlider = document.querySelector(".gt-container");
const slides = sliderContainer.children;
slides[0].classList.add("visible");
let slide = document.querySelector(".slide");
let slideNumber = 0;

class slideInfo {
    constructor(number, title, subtitle) {
        this.slideNumber = number;
        this.title = title;
        this.subtitile = subtitle;
    }
}

let slidesArray = [
    new slideInfo(0, "We can change your digital world", "Bold enough to blow a hole in your next maketing campaign."),
    new slideInfo(1, "Shoot for the hoop!", "Aiming low is not an option for us."),
    new slideInfo(2, "You need a good partner", "Let us help you realise your true potential.")
];

let backwards = true;
let carousel = undefined;
function playCarousel() {
    carousel = setInterval(() => {
        let currentSlideNumber = +document.querySelector(".slide.visible").getAttribute("data-slide-number");
        if (currentSlideNumber === 0) {
            backwards = false;
        } else if (currentSlideNumber === 2) {
            backwards = true;
        }
        slideImages(backwards);
    }, 3000);
}
playCarousel();

function slideImages(reverse) {
    let currentSlide = document.querySelector(".slide.visible");
    let element = currentSlide.nextElementSibling;
    if (reverse) {
        element = currentSlide.previousElementSibling;
    }
    if (element !== null) {
        let slideNumber = +element.getAttribute("data-slide-number");
        let slideWidth = sliderContainer.offsetWidth / slides.length;
        let container = document.querySelector(".intro-container");
        sliderContainer.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.removeProperty('opacity');
            document.querySelector(".intro-title").innerText = slidesArray[slideNumber].title;
            document.querySelector(".intro-subtitle").innerText = slidesArray[slideNumber].subtitile;
        }, 200)
        currentSlide.classList.remove("visible");
        element.classList.add("visible");
        return;
    } else {
        let margin = "-5em";
        if (reverse) {
            margin = "5em";
        }
        sliderContainer.style.marginLeft = margin;
        setTimeout(() => {
            sliderContainer.style.removeProperty('margin-left');
        }, 300);
    }
}

rightSlider.addEventListener("click", () => {
    if (carousel !== undefined) {
        clearInterval(carousel);
        carousel = undefined;
    }
    slideImages();
});

leftSlider.addEventListener("click", () => {
    if (carousel !== undefined) {
        clearInterval(carousel);
        carousel = undefined;
    }
    slideImages(true);
});


function show(element) {
    let viewportHeight = window.visualViewport.height;
    let elementTop = element.getBoundingClientRect().top;
    if (elementTop < ((viewportHeight / 100) * 85) && elementTop > 0) {
        element.classList.remove("hide");
    }
}
headings.forEach((element) => {
    element.classList.add("hide");
})
subtitles.forEach((element) => {
    element.classList.add("hide");
})


// scroll view effect
document.onscroll = () => {
    headings.forEach((element) => {
        show(element);

    });
    subtitles.forEach((element) => {
        show(element);
    });

    let slideHeight = sliderContainer.getBoundingClientRect().bottom;
    if (slideHeight < (window.innerHeight / 2)) {
        if (carousel !== undefined) {
            clearInterval(carousel);
            carousel = undefined;
        }
    } else {
        if (carousel === undefined) {
            playCarousel();
        }
    }

}

// On resize
window.addEventListener("resize", () => {
    let slideWidth = sliderContainer.offsetWidth / slides.length;
    sliderContainer.style.transition = "none";
    setTimeout(() => {
        sliderContainer.style.removeProperty("transition");
    }, 100)
    sliderContainer.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
});


