console.log('content-script.js loaded')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse)
    const res = {
        code: 0,
        data: null
    }
    sendResponse(res)
});
