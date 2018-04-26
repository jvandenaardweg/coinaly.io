class Navbar {
  constructor (targetElement) {
    this.targetElement = document.querySelector('.navbar')
    this.navbarBurger = document.querySelector('.navbar-burger')
    this.navbarMenu = document.querySelector('.navbar-menu')
    this.navbarItems = document.querySelectorAll('.navbar-item')
    this.navbarBurger.addEventListener('click', this.toggleMenu.bind(this))
    this.navbarItems.forEach((element) => element.addEventListener('click', this.handleNavbarItemClick.bind(this)))
  }

  toggleMenu () {
    this.navbarBurger.classList.toggle('is-active')
    this.navbarMenu.classList.toggle('is-active')
  }

  handleNavbarItemClick (event) {
    event.preventDefault()
    const targetElementId = event.target.getAttribute('href').replace(/#/i, '')
    const scrollOffset = 50
    const targetElementOffsetTop = document.getElementById(targetElementId).offsetTop
    const scrollFromTop = (targetElementOffsetTop - scrollOffset)
    window.scrollTo(0, scrollFromTop)
    this.toggleMenu()
  }
}
  
export const navbar = new Navbar()
