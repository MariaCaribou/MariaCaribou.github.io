"use strict";
class GalleryScroller {
    constructor() {
        this.scrollElements = {};
        this.scrolledClassName = 'scrolled';
        window.addEventListener('gallery-loaded', (event) => {
            this.init();
        });
        window.addEventListener('loader-hidden', (event) => {
            this.handleScrollAnimation();
        });
        window.addEventListener('scroll', () => {
            this.handleScrollAnimation();
        });
    }
    init() {
        this.scrollElements = document.querySelectorAll('.js-scroll');
    }
    // Private
    elementInView(element, dividend = 1) {
        const elementTop = element.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    }
    elementOutofView(element) {
        const elementTop = element.getBoundingClientRect().top;
        return (elementTop > (window.innerHeight || document.documentElement.clientHeight));
    }
    displayScrollElement(element) {
        element.classList.add(this.scrolledClassName);
    }
    hideScrollElement(element) {
        element.classList.remove(this.scrolledClassName);
    }
    handleScrollAnimation() {
        for (const element of this.scrollElements) {
            if (this.elementInView(element, 1.25)) {
                this.displayScrollElement(element);
            }
        }
    }
}
const galleryScroller = new GalleryScroller();
