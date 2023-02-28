import "swiper/css/lazy";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/keyboard";

import loader from "../../img/loader.gif";

import Swiper, {
    Navigation,
    Mousewheel,
    Lazy,
    Zoom,
    Keyboard,
    Thumbs,
} from "swiper";

class Gallery {
    constructor(parent) {
        this.parent = parent;
        this.items = Array.from(this.parent.children);
        this.modal = document.createElement("div");
        this.modalBody = document.createElement("div");
        this.modalLoader = document.createElement("img");
        this.modalClose = document.createElement("btn");
        this.init();
    }

    init() {
        this.modal.classList.add("gallery", "animated");

        this.modalBody.classList.add("gallery__body");

        this.modalLoader.classList.add("gallery__loader");
        this.modalLoader.src = loader;

        this.modalClose.classList.add("gallery__close", "btn-sm");
        this.modalClose.innerHTML = "Закрити";
        this.modalClose.addEventListener("click", () => this.closeGallery());

        this.modal.append(this.modalLoader);
        this.modal.append(this.modalClose);
        body.append(this.modal);

        const swiperInit = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.insertGallery());
            }, 2000);
        });

        body.addEventListener("keyup", (e) => {
            if (e.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (e.key) {
                case "Esc":
                case "Escape":
                    this.closeGallery();
                    break;
                default:
                    return;
            }

            // Cancel the default action to avoid it being handled twice
            e.preventDefault();
        });

        this.items.forEach((image, index) =>
            image.addEventListener("click", () => {
                this.showGallery();
                swiperInit.then(() => {
                    this.swiper.slideTo(index, 0);
                });
            })
        );
    }
    showGallery() {
        body.classList.add("gallery-open");
        this.modal.classList.remove("backOutUp");
        this.modal.classList.add("backInUp");
        bodyOverlay.dataset.event = "gallery-open";
    }
    closeGallery() {
        this.modal.classList.remove("backInUp");
        this.modal.classList.add("animated", "backOutUp");
        window.location.hash = "";
        this.modal.addEventListener(
            "animationend",
            () => {
                body.classList.remove("gallery-open");
            },
            { once: true }
        );
    }
    insertGallery() {
        this.modal.append(this.modalBody);
        let modalSwipers = this.getModalSwipers();

        this.modalBody.append(modalSwipers.swiper.slider);
        this.modalBody.append(modalSwipers.thumb.slider);

        this.thumb = new Swiper(
            this.modalBody.querySelector("#modalSwiperThumb"),
            {
                cssMode: true,
                slidesPerView: "auto",
            }
        );
        this.swiper = new Swiper(this.modalBody.querySelector("#modalSwiper"), {
            modules: [Lazy, Zoom, Thumbs, Navigation, Keyboard],
            lazy: false,
            navigation: modalSwipers.swiper.navigation,
            slidesPerView: 1,
            zoom: true,
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            thumbs: {
                swiper: this.thumb,
            },
            on: {
                afterInit: () => {
                    setTimeout(() => {
                        this.modalLoader.remove();
                    }, 500);
                },
            },
        });
    }
    getProductsSwiperArrow(direction) {
        const arrowSVG =
            '<svg class="fill-current" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4678 18.89L21.4674 9.89034L21.4674 5.89941L12.4678 14.8535L12.4678 18.89Z"/><path d="M11.5021 18.8901L2.40479 9.79494L2.40479 5.81052L2.40913 5.80835L11.5021 14.8992L11.5021 18.8901Z"/></svg>';
        const arrowvPrevEl = document.createElement("button");
        arrowvPrevEl.classList = `swiper-arrow swiper-arrow_${direction}`;
        arrowvPrevEl.innerHTML = arrowSVG;
        return arrowvPrevEl;
    }
    getModalSwipers() {
        // Preview
        let swiper = document.createElement("div");
        swiper.classList.add("swiper");
        swiper.id = "modalSwiper";

        let swiperWrapper = document.createElement("div");
        swiperWrapper.classList.add("swiper-wrapper");

        // Thumb
        let thumb = document.createElement("div");
        thumb.classList.add("swiper");
        thumb.id = "modalSwiperThumb";

        let thumbWrapper = document.createElement("div");
        thumbWrapper.classList.add("swiper-wrapper");

        const arrowvPrevEl = this.getProductsSwiperArrow("prev");
        const arrowNextEl = this.getProductsSwiperArrow("next");

        swiper.prepend(arrowvPrevEl);
        swiper.append(arrowNextEl);

        this.items.forEach((image) => {
            let swiperSlide = document.createElement("div");
            swiperSlide.classList.add("swiper-slide");

            let swiperZoomContainer = document.createElement("div");
            swiperZoomContainer.classList.add("swiper-zoom-container");

            let swiperLazy = document.createElement("img");

            // Lazy Load
            // swiperLazy.classList.add("swiper-lazy");
            // swiperLazy.dataset.src = image.dataset.src;
            // let swiperLazyPreloader = document.createElement("div");
            // swiperLazyPreloader.classList.add("swiper-lazy-preloader");
            // swiperSlide.append(swiperLazyPreloader);

            swiperLazy.src = image.querySelector("img").src; // Замінити на swiperLazy.src = image.dataset.src;

            swiperZoomContainer.append(swiperLazy);
            swiperSlide.append(swiperZoomContainer);

            swiperWrapper.append(swiperSlide);

            // ============
            let thumbSlide = document.createElement("div");
            thumbSlide.classList.add("swiper-slide");
            let thumbSlideImg = document.createElement("img");
            thumbSlideImg.src = image.querySelector("img").src;
            thumbSlide.append(thumbSlideImg);
            thumbWrapper.append(thumbSlide);
        });

        swiper.append(swiperWrapper);
        thumb.append(thumbWrapper);

        return {
            swiper: {
                slider: swiper,
                navigation: {
                    prevEl: arrowvPrevEl,
                    nextEl: arrowNextEl,
                },
            },
            thumb: { slider: thumb },
        };
    }
}

const animateCSS = (element, animation) =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`animated`, animationName);
            resolve("Animation ended");
        }

        node.addEventListener("animationend", handleAnimationEnd, {
            once: true,
        });
    });

export default Gallery;
