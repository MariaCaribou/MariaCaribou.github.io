class Menu
{
	private button : HTMLElement;
	private nav : HTMLElement;

	constructor()
	{
		this.button = document.querySelector('#hamburger') as HTMLElement;
		this.nav = document.querySelector('nav') as HTMLElement;
	}

	public init() : void
	{
		const elementsExceptHeader : NodeListOf<HTMLElement> = document.querySelectorAll('section, footer');
		const links : NodeListOf<HTMLElement> = document.querySelectorAll('.nav-links') as NodeListOf<HTMLElement>;
		const socialLinks : NodeListOf<HTMLElement> = document.querySelectorAll('.social-links') as NodeListOf<HTMLElement>;

		this.button.addEventListener('click', this.toggle);
		window.addEventListener('resize', this.close);
		window.addEventListener('scroll', this.close);
		
		elementsExceptHeader.forEach(elementExceptHeader => elementExceptHeader.addEventListener('click', this.close));

		for (const link of links)
		{
			link.addEventListener('click', this.close);
			link.addEventListener('click', this.removeHashFromWindowLocation);
		}
		
		socialLinks.forEach(socialLink => socialLink.addEventListener('click', this.close));
	}

	public toggle = (event : Event) =>
	{
		event.preventDefault();
		this.nav.classList.toggle('open');
		this.button.classList.toggle('open');
	}

	public close = (event : Event) =>
	{
		this.nav.classList.remove('open');
		this.button.classList.remove('open');
	}

	public removeHashFromWindowLocation = (event : Event) =>
	{
		// Wait 5ms in order to work properly
		setTimeout(() => {
			let uri = window.location.toString();
			if (uri.indexOf('#') > 0) 
			{
				let uriWithoutHash = uri.substring(0, uri.indexOf('#'));
				window.history.replaceState({}, document.title, uriWithoutHash);
			}
		}, 5);
	}
}

var menu : Menu;
window.addEventListener('load', () =>
{
	menu = new Menu();
	menu.init();
});