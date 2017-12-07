const electron = require('electron')

const { remote } = electron

class NotificationView {

  constructor(title, options) {
    this.mainEl = document.getElementById('main');
    this.element = document.getElementById('notification')
    this.iconEl = document.getElementById('icon')
    this.titleEl = document.getElementById('title')
    this.messageEl = document.getElementById('message')
    this.buttonsEl = document.getElementById('buttons')
    this.title = title
    this.options = options
  }

  render() {
    const icon = this.options.icon || 'electron.png'
    this.iconEl.style.background = `url(${icon}) center/65px no-repeat`
    if (this.title) {
      this.titleEl.innerHTML = this.title
    } else {
      const parent = this.titleEl.parentElement
      parent.removeChild(this.titleEl)
    }

    if (this.options.message) {
      this.messageEl.innerHTML = this.options.message
    } else {
      const parent = this.messageEl.parentElement
      parent.classList.add('onlyTitle')
      parent.removeChild(this.messageEl)
    }

    if (this.options.backgroundColor) {
      this.mainEl.style.backgroundColor = this.options.backgroundColor
    }

    if(this.options.textFontSize){
      document.styleSheets[0].insertRule(`#text{font-size:${this.options.textFontSize}px}`, 1);
    }

    this.setupButtons()
    this.decorateClasses()
  }

  setupButtons() {
    this.buttons().forEach((actionName, buttonIndex) => {
      const button = document.createElement('button')

      if (this.options.buttonsColor) {
        button.style.backgroundColor = this.options.buttonsColor
      }

      button.innerHTML = actionName
      button.addEventListener('click', (event) => {
        const mainWindow = remote.getCurrentWindow()
        mainWindow.emit('buttonClicked', event.target.innerHTML, buttonIndex, this.options)
      })
      this.buttonsEl.appendChild(button)
    })
  }

  decorateClasses() {
    const buttonLength = this.buttons().length

    if (this.options.vertical) {
      this.mainEl.classList.add('vertical')
    } else {
      this.mainEl.classList.add('horizontal')
    }
  }

  buttons() {
    return (this.options.buttons || []).slice(0, 2)
  }
}

module.exports = NotificationView
