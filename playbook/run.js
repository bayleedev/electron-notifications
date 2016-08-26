document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function () {
    const id = this.getAttribute('for')
    const code = document.getElementById(id).value
    const replacedCode = code.replace('electron-notifications', '../index.js')
    eval(replacedCode)
  })
})
