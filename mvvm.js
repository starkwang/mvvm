var J = function(options) {
    var selector = options.ele;
    var data = options.data;
    var rootEle = document.querySelector(selector);
    bindData(rootEle, data);
}

function bindData(ele, data) {
    var forName = ele.getAttribute('j-for');
    if (forName) {
        
    }

    //绑定对象
    var modelName = ele.getAttribute('j-model');
    if (modelName && data[modelName]) {
        var initData = data[modelName];
        var callback = (function(ele) {
            return function(value) {
                ele.innerHTML = value;
            }
        })(ele);
        Object.defineProperty(data, modelName, {
            set: callback,
            get: function() {
                return this[modelName];
            },
            enumerable: true,
            configurable: true
        })
        ele.innerHTML = initData;
    }
    //递归
    var childNodes = getChildNodes(ele);
    if (childNodes.length == 0) {
        return;
    }
    for (var i = 0; i < childNodes.length; i++) {
        bindData(childNodes[i], data);
    }
}

function getChildNodes(ele) {
    var arr = ele.childNodes;
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeName == "#text") continue;
        result.push(arr[i]);
    }
    return result;
}

var data1 = {
    msg1: "I'm msg1",
    msg2: "I'm msg2",
    msg3: "I'm msg3"
}
new J({
    ele: "#demo1",
    data: data1
})


var data2 = [{
    name: 'stark',
    age: '21'
}, {
    name: 'sherry',
    age: '20'
}, {
    name: 'tony',
    age: '23'
}]
new J({
    ele: "#demo2",
    data: {
        items: data2
    }
})
