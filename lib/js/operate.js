const operateTypeMap = {
    CLICK: 'click',
    INPUT: 'input',
    GETELEMENTTEXT: 'getElementText'
}

class OperateConstant {
    static operateByEventType(type, payload = {}) {
        let res
        switch (type) {
            case operateTypeMap.CLICK:
                res = OperateConstant.handleClickEvent(payload)
                break;
            case operateTypeMap.INPUT:
                res = OperateConstant.handleInputEvent(payload)
                break;
            case operateTypeMap.GETELEMENTTEXT:
                res = OperateConstant.handleGetElementTextEvent(payload)
                break;
            default:
                break;
        }
        return res
    }
    static handleClickEvent(payload) {
        let data = null
        if (payload.element) {
            $(payload.element).click()
        }
        return data
    }
    static handleInputEvent(payload) {
        let data = null
        if (payload.element) {
            $(payload.element).val(payload.params.inputValue)
        }
        return data
    }
    static handleGetElementTextEvent(payload) {
        let data = []
        if (payload.element && $(payload.element)) {
            Array.from($(payload.element)).forEach((item) => {
                const resItem = {
                    value: $(item).text()
                }
                data.push(resItem)
            })
        }
        return data
    }
}