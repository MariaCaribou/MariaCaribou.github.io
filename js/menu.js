"use strict";
class Menu {
    constructor() {
        this.toggle = (event) => {
            event.preventDefault();
            this.nav.classList.toggle('open');
            this.button.classList.toggle('open');
        };
        this.close = (event) => {
            // event.preventDefault();
            this.nav.classList.remove('open');
            this.button.classList.remove('open');
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
        links.forEach(link => link.addEventListener('click', this.close));
        socialLinks.forEach(socialLink => socialLink.addEventListener('click', this.close));
    }
}
var menu;
window.addEventListener('load', () => {
    menu = new Menu();
    menu.init();
});
