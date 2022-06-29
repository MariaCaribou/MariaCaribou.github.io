"use strict";
class Loader {
    constructor() {
        this.loaderElement = document.querySelector('.loader');
        this.innerLoaderElement = document.querySelector('.inner-loader');
    }
    show() {
        this.loaderElement.classList.remove('hidden');
        this.loaderElement.classList.remove('negative-index');
        this.innerLoaderElement.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }
    hide(timeout = 0) {
        // First timeout: inner loader
        setTimeout(() => {
            this.innerLoaderElement.classList.add('hidden');
            // Second timeout: loader
            setTimeout(() => {
                this.loaderElement.classList.add('hidden');
                // Third timeout: negative index + scroll
                setTimeout(() => {
                    this.loaderElement.classList.add('negative-index');
                    document.body.classList.remove('no-scroll');
                }, 501); // CSS animation time + 1ms
            }, timeout / 2);
        }, timeout / 2);
    }
}
var loader;
window.addEventListener('load', () => {
    loader = new Loader();
    loader.hide(1000);
});
