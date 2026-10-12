
"use strict";

const images = [
    {
        src: "mountain.jpg",
        caption: "Beautiful Mountains",
        alt: "Beautiful mountain landscape"
    },
    {
        src: "forest.jpg",
        caption: "Peaceful Green Forest",
        alt: "Green forest landscape"
    },
    {
        src: "beach.jpg",
        caption: "Sunny Beach",
        alt: "Sunny beach beside the ocean"
    },
    {
        src: "lake.jpg",
        caption: "Calm Lake",
        alt: "Peaceful lake landscape"
    }
];

const sliderImage = document.getElementById("sliderImage");
const caption = document.getElementById("caption");
const slideStatus = document.getElementById("slideStatus");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;

// Create navigation dots.
images.forEach((image, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", "Show image " + (index + 1));

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);
});

// Display the selected image.
function showSlide(index) {
    currentIndex = (index + images.length) % images.length;

    const selectedImage = images[currentIndex];

    sliderImage.onerror = () => {
        caption.textContent = "Could not load: " + selectedImage.src;
        console.error("Image not found:", selectedImage.src);
    };

    sliderImage.onload = () => {
        caption.textContent = selectedImage.caption;
    };

    sliderImage.src = selectedImage.src;
    sliderImage.alt = selectedImage.alt;

    slideStatus.textContent =
        "Slide " + (currentIndex + 1) + " of " + images.length;

    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentIndex);

        if (dotIndex === currentIndex) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

// Next and previous buttons.
nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
});

// Keyboard navigation.
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        showSlide(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showSlide(currentIndex - 1);
    }
});

// Display the first image.
showSlide(0);
