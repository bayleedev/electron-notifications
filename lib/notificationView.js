const electron = require('electron')

const { remote } = electron

class NotificationView {
    constructor(title, options) {
        this.element = document.getElementById('notification')
        this.iconEl = document.getElementById('icon')
        this.titleEl = document.getElementById('title')
        this.messageEl = document.getElementById('message')
        this.buttonsEl = document.getElementById('buttons')
        this.title = title
        this.options = options
    }

    render() {
        this.iconEl.src = this.options.icon
        this.titleEl.innerHTML = this.title
        this.messageEl.innerHTML = this.options.message

        this.setupButtons()
        this.decorateClasses()
    }

    setupButtons() {
        this.buttons().forEach((actionName) => {
            const link = document.createElement('a')
            link.href = '#'
            link.innerHTML = actionName
            link.addEventListener('click', (event) => {
                const mainWindow = remote.getCurrentWindow()
                mainWindow.emit('buttonClicked', event.target.innerHTML)
            })
            this.buttonsEl.appendChild(link)
        })
    }

    decorateClasses() {
        const buttonLength = this.buttons().length

        if (buttonLength > 0) {
            this.element.classList.add('actions')
        }

        if (buttonLength >= 2) {
            this.buttonsEl.classList.add('double')
        } else if (buttonLength === 1) {
            this.buttonsEl.classList.add('single')
        }
    }

    buttons() {
        return (this.options.buttons || []).slice(0, 2)
    }
}

module.exports = NotificationView
