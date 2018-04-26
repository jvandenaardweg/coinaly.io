import '../scss/app.scss'
import { signupMailchimp } from './modules/signup-mailchimp'
import { navbar } from './modules/navbar'
import ScrollReveal from 'scrollreveal'

const WebFont = require('webfontloader')

document.addEventListener('DOMContentLoaded', function(event) {
  window.sr = ScrollReveal({ origin})
  // sr.reveal('.hero .title .first', {delay: 0, distance: 0, duration: 750})
  // sr.reveal('.hero .title .second', {delay: 750, distance: 0, duration: 750})
  // sr.reveal('.hero .title .third', {delay: 1500, distance: 0, duration: 750})
  // sr.reveal('.hero .subtitle', {delay: 2000, distance: 0, scale: 1})
  sr.reveal('.hero [data-action="show-signup"]', {delay: 500, distance: 0, scale: 1})

  WebFont.load({
    google: {
      families: ['Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i']
    }
  })
})
