var J = function(options) {
    var selector = options.ele;
    var data = options.data;

    var targetScope = document.querySelectorAll(selector)[0];

    var targetElement1 = targetScope.childNodes[1]; //p节点
    var modelName = targetElement1.getAttribute("j-model"); //属性名

    return new Proxy(data, {
        get: function(target, property) {
            console.log("get", target, property);
            return target[property];
        },
        set: function(target, key, value) {
            console.log(target, key, value);
            if (key == modelName) {
                targetElement1.innerHTML = value;
                target[key] = value;
            }
        }
    })
}


var model = new J({
    ele: "#hello",
    data: {
        msg: "fsafsafs",
        msg2: [1, 2, 3, 4, 5]
    }
})
