class SignupMailchimp {
  constructor (targetElement) {
    console.log(targetElement)
    this.targetElement = document.getElementById('mc_embed_signup')
    console.log(this.targetElement)
    this.signupButton = document.querySelector('[data-action="show-signup"]')
    this.subscribeButton = document.querySelector('[data-action="subscribe"]')
    this.subscribeInput = document.getElementById('mce-EMAIL')
    this.checkMailchimpMessageInterval = null
    this.subscribeButton.addEventListener('click', this.handleSubscribe.bind(this))
    this.subscribeInput.addEventListener('keyup', this.handleInputChange.bind(this))
    this.signupButton.addEventListener('click', this.handleShowSignup.bind(this))
  }

  handleShowSignup (event) {
    event.preventDefault()
    event.target.classList.add('is-hidden')
    this.targetElement.classList.remove('is-hidden')
    this.subscribeInput.focus()
  }

  handleSubscribe (event) {
    setTimeout(() => {
      const isValidInput = this.subscribeInput.classList.value.includes('valid')
      if (isValidInput) {
        this.startLoading()

        this.checkMailchimpMessageInterval = setInterval(() => {
          const successResponse = document.getElementById('mce-success-response').textContent.trim()
          const errorResponse = document.getElementById('mce-error-response').textContent.trim()
            console.log(successResponse, errorResponse)
          const hasSuccessResponse = successResponse.length > 5
          const hasErrorResponse = errorResponse.length > 5
          if (successResponse) {
            this.hideInput()
          }
          if (hasSuccessResponse || hasErrorResponse) {
            clearInterval(this.checkMailchimpMessageInterval)
            this.stopLoading()
          }
        }, 100)
      }
    }, 0)
  }

  handleInputChange (event) {
    const errorResponseElement = document.getElementById('mce-error-response')
    const successResponseElement = document.getElementById('mce-success-response')
    errorResponseElement.textContent = ''
    successResponseElement.textContent = ''
    errorResponseElement.style.display = 'none'
    successResponseElement.style.display = 'none'
  }

  startLoading () {
    this.subscribeButton.classList.add('is-loading')
  }

  stopLoading () {
    this.subscribeButton.classList.remove('is-loading')
  }

  hideInput () {
    this.targetElement.querySelector('.field').classList.add('is-hidden')
  }
}

export const signupMailchimp = new SignupMailchimp()
