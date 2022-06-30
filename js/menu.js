"use strict";
class Menu {
    constructor() {
        this.toggle = (event) => {
            event.preventDefault();
            this.nav.classList.toggle('open');
            this.button.classList.toggle('open');
        };
        this.close = (event) => {
            this.nav.classList.remove('open');
            this.button.classList.remove('open');
        };
        this.removeHashFromWindowLocation = (event) => {
            // Wait 5ms in order to work properly
            setTimeout(() => {
                let uri = window.location.toString();
                if (uri.indexOf('#') > 0) {
                    let uriWithoutHash = uri.substring(0, uri.indexOf('#'));
                    window.history.replaceState({}, document.title, uriWithoutHash);
                }
            }, 5);
        };
        this.button = document.querySelector('#hamburger');
        this.nav = document.querySelector('nav');
    }
    init() {
        const elementsExceptHeader = document.querySelectorAll('section, footer');
        const links = document.querySelectorAll('.nav-links');
        const socialLinks = document.querySelectorAll('.social-links');
        this.button.addEventListener('click', this.toggle);
        window.addEventListener('resize', this.close);
        window.addEventListener('scroll', this.close);
        elementsExceptHeader.forEach(elementExceptHeader => elementExceptHeader.addEventListener('click', this.close));
        for (const link of links) {
            link.addEventListener('click', this.close);
            link.addEventListener('click', this.removeHashFromWindowLocation);
        }
        socialLinks.forEach(socialLink => socialLink.addEventListener('click', this.close));
    }
}
var menu;
window.addEventListener('load', () => {
    menu = new Menu();
    menu.init();
});
