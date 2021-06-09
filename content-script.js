console.log('content-script.js loaded')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const operateRes =  OperateConstant.operateByEventType(request.event, request)
    console.log(operateRes)
    const res = {
        code: 0,
        data: operateRes,
        message: '操作成功'
    }
    sendResponse(res)
});
