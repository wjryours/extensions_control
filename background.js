class BackgroundService {
    constructor() {
        this.socketIoURL = 'http://localhost:9527'
        this.socketInstance = {}
        this.socketRetryMax = 5
        this.socketRetry = 0
    }
    init() {
        console.log('background.js')   
        this.connectSocket()
        this.linstenSocketEvent()
    }
    setSocketURL(url) {
        this.socketIoURL = url
    }
    connectSocket() {
        if (!_.isEmpty(this.socketInstance) && _.isFunction(this.socketInstance.disconnect)) {
            this.socketInstance.disconnect()
        }
        this.socketInstance = io(this.socketIoURL);
        this.socketRetry = 0
        this.socketInstance.on('connect_error', (e) => {
            console.log('connect_error', e)
            this.socketRetry++
            if (this.socketRetryMax < this.socketRetry) {
                this.socketInstance.close()
                alert(`以尝试连接${this.socketRetryMax}次，无法连接到socket服务，请排查服务是否可用`)
            }
        })
    }
    static emitMessageToSocketService(socketInstance, params = {}) {
        if (!_.isEmpty(socketInstance) && _.isFunction(socketInstance.emit)) {
            console.log(params)
            socketInstance.emit('webviewEventCallback', params);
        }
    }
    linstenSocketEvent() {
        if (!_.isEmpty(this.socketInstance) && _.isFunction(this.socketInstance.on)) {
            this.socketInstance.on('webviewEvent', (msg) => {
                console.log(`webviewEvent msg`, msg)
                this.sendMessageToContentScript(msg, BackgroundService.emitMessageToSocketService)
            });
        }
    }
    sendMessageToContentScript(message, callback) {
        const operateTabIndex = message.operateTabIndex ? message.operateTabIndex : 0
        console.log(message)
        chrome.tabs.query({ index: operateTabIndex }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                console.log(callback)
                if (callback) callback(this.socketInstance, response)
            });
        });
    }
}
const app = new BackgroundService()
app.init()
