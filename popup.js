console.log('popup.js')
const extensionId = chrome.runtime.id
const backgroundURL = `chrome-extension://${extensionId}/background.html`
window.open(backgroundURL)