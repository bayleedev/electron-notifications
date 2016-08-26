const textareas = {}

document.querySelectorAll('textarea').forEach((snippet) => {
  textareas[snippet.id] = CodeMirror.fromTextArea(snippet, {
    mode: 'javascript',
    lineNumbers: true,
  });
})

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function () {
    const id = this.getAttribute('for')
    const item = textareas[id]
    item.save()
    const el = item.getTextArea()
    const code = el.value
    const replacedCode = code.replace('electron-notifications', '../index.js')
    eval(replacedCode)
  })
})
