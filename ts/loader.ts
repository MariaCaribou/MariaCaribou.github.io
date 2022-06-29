class Loader
{
    private loaderElement : HTMLElement;
    private innerLoaderElement : HTMLElement;

    constructor()
    {
        this.loaderElement = document.querySelector('.loader') as HTMLElement;
        this.innerLoaderElement = document.querySelector('.inner-loader') as HTMLElement;
    }

    public show() : void
    {
        this.loaderElement.classList.remove('hidden');
        this.loaderElement.classList.remove('negative-index');
        this.innerLoaderElement.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    public hide(timeout : number = 0) : any
    {
        // First timeout: inner loader
        setTimeout(() =>
        {
            this.innerLoaderElement.classList.add('hidden');

            // Second timeout: loader
            setTimeout(() =>
            {
                this.loaderElement.classList.add('hidden');

                // Third timeout: negative index + scroll
                setTimeout(() => 
                {
                    this.loaderElement.classList.add('negative-index');
                    document.body.classList.remove('no-scroll');
                }, 501); // CSS animation time + 1ms
            }, timeout / 2);
        }, timeout / 2);
    }
}

var loader : Loader;
window.addEventListener('load', () =>
{
    loader = new Loader();
    loader.hide(1000);
});

