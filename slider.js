class ImageSlider {
  constructor() {
    this.track = document.querySelector("#slideTrack");
    this.dotsContainer = document.querySelector("#slideDots");
    this.previousButton = document.querySelector("#previousButton");
    this.nextButton = document.querySelector("#nextButton");
    this.status = document.querySelector("#slideStatus");

    this.images = [
      {
        src: "images/mountain.jpg",
        caption: "Beautiful Mountains"
      },
      {
        src: "images/forest.jpg",
        caption: "Peaceful Green Forest"
      },
      {
        src: "images/beach.jpg",
        caption: "Sunny Beach"
      },
      {
        src: "images/lake.jpg",
        caption: "Calm Lake"
      }
    ];

    this.currentIndex = 0;

    this.createSlides();
    this.createDots();
    this.addEventListeners();
    this.updateSlider();
  }

  createSlides() {
    this.images.forEach((image, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";

      const picture = document.createElement("img");
      picture.src = image.src;
      picture.alt = image.caption;
      picture.loading = index === 0 ? "eager" : "lazy";

      picture.addEventListener("error", () => {
        this.status.textContent =
          `Could not load ${image.src}. Check the image filename.`;
      });

      const caption = document.createElement("div");
      caption.className = "slide-caption";
      caption.textContent = image.caption;

      slide.appendChild(picture);
      slide.appendChild(caption);
      this.track.appendChild(slide);
    });
  }

  createDots() {
    this.images.forEach((image, index) => {
      const dot = document.createElement("button");

      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      dot.addEventListener("click", () => {
        this.currentIndex = index;
        this.updateSlider();
      });

      this.dotsContainer.appendChild(dot);
    });
  }

  addEventListeners() {
    this.nextButton.addEventListener("click", () => {
      this.next();
    });

    this.previousButton.addEventListener("click", () => {
      this.previous();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.next();
      } else if (event.key === "ArrowLeft") {
        this.previous();
      }
    });
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;

    this.updateSlider();
  }

  previous() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) %
      this.images.length;

    this.updateSlider();
  }

  updateSlider() {
    this.track.style.transform =
      `translateX(-${this.currentIndex * 100}%)`;

    const dots = this.dotsContainer.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
      dot.setAttribute(
        "aria-current",
        index === this.currentIndex ? "true" : "false"
      );
    });

    this.status.textContent =
      `Slide ${this.currentIndex + 1} of ${this.images.length}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new ImageSlider();
  } catch (error) {
    console.error("Image Slider error:", error);

    const status = document.querySelector("#slideStatus");

    if (status) {
      status.textContent =
        "Slider error. Open the browser Console to check the problem.";
    }
  }
});