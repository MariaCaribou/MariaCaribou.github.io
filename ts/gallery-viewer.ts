class GalleryViewer 
{
    private viewerElement : HTMLElement = {} as HTMLElement;
    private arrowLeft : HTMLElement = {} as HTMLElement;
    private arrowRight : HTMLElement = {} as HTMLElement;
    private closeButton : HTMLElement = {} as HTMLElement;
    private galleryViewerImages : NodeListOf<HTMLElement> = {} as NodeListOf<HTMLElement>;
    private currentImagePosition : number = 0;

    private hiddenClassName : string = 'hidden';
    private noScrollClassName : string = 'no-scroll';
    private negativeIndexClassName : string = 'negative-index';
    private noTransitionClassName : string = 'no-transition';

    constructor()
    {
        window.addEventListener('gallery-loaded', (event) =>
        {
            this.init();
        });
    }

    private init() : void
    {
        this.viewerElement = document.querySelector('#gallery-viewer') as HTMLElement;
        this.arrowLeft = document.querySelector('#left-arrow-container') as HTMLElement;
        this.arrowRight = document.querySelector('#right-arrow-container') as HTMLElement;
        this.closeButton = document.querySelector('#close-button') as HTMLElement;
        this.galleryViewerImages = document.querySelectorAll('.gallery-viewer-image') as NodeListOf<HTMLElement>;
        this.currentImagePosition = 0;

        const galleryImages : NodeListOf<HTMLElement> = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(images => images.addEventListener('click', this.open));
        
        this.closeButton.addEventListener('click', this.close);
        this.arrowLeft.addEventListener('click', this.showPreviousImage);
        this.arrowRight.addEventListener('click', this.showNextImage);
    }

    // Public
    public open = (event : Event) =>
    {
        this.hideAllImagesExceptCurrent(event.target as HTMLElement);
        this.showViewer();
        this.disableScroll();
    }

    public close = (event : Event) =>
    {
        this.hideViewer();
        this.enableScroll();
    }

    public showPreviousImage = (event : Event) =>
    {
        this.hideImage(this.currentImagePosition);
        this.currentImagePosition = this.currentImagePosition - 1;
        if (this.currentImagePosition < 0)
        {
            this.currentImagePosition = this.galleryViewerImages.length - 1;
        }
        this.showImage(this.currentImagePosition);
    }

    public showNextImage = (event : Event) =>
    {
        this.hideImage(this.currentImagePosition);
        this.currentImagePosition = this.currentImagePosition + 1;
        if (this.currentImagePosition > this.galleryViewerImages.length - 1)
        {
            this.currentImagePosition = 0;
        }
        this.showImage(this.currentImagePosition);
    }
    
    // Private
    private showViewer() : void
    {
        this.viewerElement.classList.remove(this.negativeIndexClassName);
        this.viewerElement.classList.remove(this.hiddenClassName);
    }
    
    private hideViewer() : void
    {
        this.viewerElement.classList.add(this.hiddenClassName);
        this.viewerElement.classList.add(this.negativeIndexClassName);
    }
    
    private disableScroll() : void
    {
        document.body.classList.add(this.noScrollClassName);
        document.documentElement.classList.add(this.noScrollClassName);
    }
    
    private enableScroll() : void
    {
        document.body.classList.remove(this.noScrollClassName);
        document.documentElement.classList.remove(this.noScrollClassName);
    }

    private showImage(index : number) : void
    {
        this.galleryViewerImages[index].classList.remove(this.hiddenClassName);
    }

    private hideImage(index : number) : void
    {
        this.galleryViewerImages[index].classList.add(this.hiddenClassName);
    }

    private hideAllImagesExceptCurrent(smallImageElement : HTMLElement) : void
    {
        let imageName = smallImageElement.id.replace('-small', '');
        for (let i = 0; i < this.galleryViewerImages.length; ++i)
        {
            const bigImage = this.galleryViewerImages.item(i);
            bigImage.classList.add(this.noTransitionClassName);
            if (bigImage.id.replace('-big', '') == imageName)
            {
                bigImage.classList.remove(this.hiddenClassName);
                this.currentImagePosition = i;
            }
            else if (!bigImage.classList.contains(this.hiddenClassName))
            {
                bigImage.classList.add(this.hiddenClassName);
            }
            bigImage.offsetHeight;
            bigImage.classList.remove(this.noTransitionClassName);
        }
    }
}

const galleryViewer : GalleryViewer = new GalleryViewer();