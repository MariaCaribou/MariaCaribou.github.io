"use strict";
class GalleryLoader {
    constructor(galleryName = '') {
        this.originURL = window.location.origin;
        this.jsonDatabaseURL = this.originURL + '/gallery-db.json';
        this.JSONDatabase = {};
        this.galleryName = galleryName;
        this.init();
    }
    init() {
        this.fetchJSONDatabase()
            .then(response => {
            this.JSONDatabase = response;
            this.populateGallery();
        });
    }
    // Private
    async fetchJSONDatabase() {
        const response = await fetch(this.jsonDatabaseURL);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    populateGallery() {
        var _a;
        // Return if json DB doesn't have the requested gallery
        if (!this.JSONDatabase.hasOwnProperty(this.galleryName)) {
            return;
        }
        const column1 = document.getElementById('column-1');
        const column2 = document.getElementById('column-2');
        const column3 = document.getElementById('column-3');
        const gallery = this.JSONDatabase[this.galleryName];
        const keysLength = Object.keys(gallery).length - 1;
        let i = 0;
        for (const imageName in gallery) {
            const column = gallery[imageName].column == 1 ? column1 : gallery[imageName].column == 2 ? column2 : column3;
            // Small image
            const imageContainer = this.createImageContainer();
            const smallImage = this.createSmallImage(imageName);
            imageContainer.appendChild(smallImage);
            column === null || column === void 0 ? void 0 : column.appendChild(imageContainer);
            // Big image
            const bigImage = this.createBigImage(imageName);
            (_a = document.getElementById('gallery-viewer-image-container')) === null || _a === void 0 ? void 0 : _a.appendChild(bigImage);
            // Load images
            const smallImageSource = gallery[imageName].smallSource;
            const bigImageSource = gallery[imageName].bigSource;
            this.loadImage(smallImageSource, smallImage, i == keysLength);
            this.loadImage(bigImageSource, bigImage);
            ++i;
        }
    }
    createImageContainer() {
        const imageContainerElement = document.createElement('div');
        imageContainerElement.classList.add('gallery-image-container');
        imageContainerElement.classList.add('js-scroll');
        return imageContainerElement;
    }
    createSmallImage(imageName) {
        const smallImageElement = document.createElement('img');
        smallImageElement.id = imageName + '-small';
        smallImageElement.classList.add('gallery-image');
        smallImageElement.alt = imageName;
        return smallImageElement;
    }
    createBigImage(imageName) {
        const bigImageElement = document.createElement('img');
        bigImageElement.id = imageName + '-big';
        bigImageElement.classList.add('gallery-viewer-image');
        bigImageElement.classList.add('hidden');
        bigImageElement.alt = imageName;
        return bigImageElement;
    }
    async loadImage(imageSource, imageElement, isLastImage = false) {
        fetch(this.originURL + imageSource)
            .then(response => response.blob())
            .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            imageElement.src = imageObjectURL;
            if (isLastImage) {
                this.triggerLoadedEvent();
            }
        });
    }
    triggerLoadedEvent() {
        const galleryLoadedEvent = new CustomEvent('gallery-loaded', {
            detail: {},
            bubbles: true,
            cancelable: true,
            composed: false,
        });
        window.dispatchEvent(galleryLoadedEvent);
    }
}
