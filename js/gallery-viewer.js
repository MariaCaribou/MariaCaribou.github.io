"use strict";
class GalleryViewer {
    constructor() {
        this.viewerElement = {};
        this.arrowLeft = {};
        this.arrowRight = {};
        this.closeButton = {};
        this.galleryViewerImages = {};
        this.currentImagePosition = 0;
        this.hiddenClassName = 'hidden';
        this.noScrollClassName = 'no-scroll';
        this.negativeIndexClassName = 'negative-index';
        this.noTransitionClassName = 'no-transition';
        // Public
        this.open = (event) => {
            this.hideAllImagesExceptCurrent(event.target);
            this.showViewer();
            this.disableScroll();
        };
        this.close = (event) => {
            this.hideViewer();
            this.enableScroll();
        };
        this.showPreviousImage = (event) => {
            this.hideImage(this.currentImagePosition);
            this.currentImagePosition = this.currentImagePosition - 1;
            if (this.currentImagePosition < 0) {
                this.currentImagePosition = this.galleryViewerImages.length - 1;
            }
            this.showImage(this.currentImagePosition);
        };
        this.showNextImage = (event) => {
            this.hideImage(this.currentImagePosition);
            this.currentImagePosition = this.currentImagePosition + 1;
            if (this.currentImagePosition > this.galleryViewerImages.length - 1) {
                this.currentImagePosition = 0;
            }
            this.showImage(this.currentImagePosition);
        };
        window.addEventListener('gallery-loaded', (event) => {
            this.init();
        });
    }
    init() {
        this.viewerElement = document.querySelector('#gallery-viewer');
        this.arrowLeft = document.querySelector('#left-arrow-container');
        this.arrowRight = document.querySelector('#right-arrow-container');
        this.closeButton = document.querySelector('#close-button');
        this.galleryViewerImages = document.querySelectorAll('.gallery-viewer-image');
        this.currentImagePosition = 0;
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(images => images.addEventListener('click', this.open));
        this.closeButton.addEventListener('click', this.close);
        this.arrowLeft.addEventListener('click', this.showPreviousImage);
        this.arrowRight.addEventListener('click', this.showNextImage);
    }
    // Private
    showViewer() {
        this.viewerElement.classList.remove(this.negativeIndexClassName);
        this.viewerElement.classList.remove(this.hiddenClassName);
    }
    hideViewer() {
        this.viewerElement.classList.add(this.hiddenClassName);
        this.viewerElement.classList.add(this.negativeIndexClassName);
    }
    disableScroll() {
        document.body.classList.add(this.noScrollClassName);
        document.documentElement.classList.add(this.noScrollClassName);
    }
    enableScroll() {
        document.body.classList.remove(this.noScrollClassName);
        document.documentElement.classList.remove(this.noScrollClassName);
    }
    showImage(index) {
        this.galleryViewerImages[index].classList.remove(this.hiddenClassName);
    }
    hideImage(index) {
        this.galleryViewerImages[index].classList.add(this.hiddenClassName);
    }
    hideAllImagesExceptCurrent(smallImageElement) {
        let imageName = smallImageElement.id.replace('-small', '');
        for (let i = 0; i < this.galleryViewerImages.length; ++i) {
            const bigImage = this.galleryViewerImages.item(i);
            bigImage.classList.add(this.noTransitionClassName);
            if (bigImage.id.replace('-big', '') == imageName) {
                bigImage.classList.remove(this.hiddenClassName);
                this.currentImagePosition = i;
            }
            else if (!bigImage.classList.contains(this.hiddenClassName)) {
                bigImage.classList.add(this.hiddenClassName);
            }
            bigImage.offsetHeight;
            bigImage.classList.remove(this.noTransitionClassName);
        }
    }
}
const galleryViewer = new GalleryViewer();
