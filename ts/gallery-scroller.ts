class GalleryScroller
{
    public scrollElements: NodeListOf<HTMLElement> = {} as NodeListOf<HTMLElement>;

    private scrolledClassName : string = 'scrolled';

    constructor()
    {
        window.addEventListener('gallery-loaded', (event) =>
        {
            this.init();
        });

        window.addEventListener('loader-hidden', (event) =>
        {
            this.handleScrollAnimation();
        });

        window.addEventListener('scroll', () => 
        { 
            this.handleScrollAnimation();
        });
    }

    private init() : void
    {
        this.scrollElements = document.querySelectorAll('.js-scroll') as NodeListOf<HTMLElement>;
    }

    // Private
    private elementInView(element : HTMLElement, dividend = 1) : boolean
    {
        const elementTop = element.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    }
    
    private elementOutofView(element : HTMLElement) : boolean
    {
        const elementTop = element.getBoundingClientRect().top;
        return (elementTop > (window.innerHeight || document.documentElement.clientHeight));
    }

    private displayScrollElement(element : HTMLElement) : void
    {
        element.classList.add(this.scrolledClassName);
    }

    private hideScrollElement(element : HTMLElement) : void
    {
        element.classList.remove(this.scrolledClassName);
    }

    private handleScrollAnimation() : void
    {
        for (const element of this.scrollElements)
        {
            if (this.elementInView(element, 1.25)) 
            {
                this.displayScrollElement(element);
            } 
        }
    }
}

const galleryScroller = new GalleryScroller();