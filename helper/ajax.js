var $ = {};
$.ajax = function (options) {
    //1.获取参数
    var type = options.type.toUpperCase() || 'GET';
    var resDataType = options.resDataType || 'string';
    var reqDataType = options.reqDataType || 'string';
    var url = options.url;
    var data = options.data;
    var success = options.success;
    var fail = options.fail;
    var progress = options.progress;
    var imgType = options.imgType || 'jpg';

    //2.获取xhr对象
    var xhr = $.getXhr();

    //3.建立连接
    xhr.open(type, url);
    /*指定返回数据的格式需要在发送请求之前*/
    if (resDataType === 'blob') {
        xhr.responseType = 'blob';
    }

    //4.发送请求
    if (type === 'GET') {
        xhr.send(null)
    }
    else if (type === 'POST') {
        if (progress) {
            xhr.upload.onprogress = progress;
        }
        if (reqDataType === 'json') {
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            data = JSON.stringify(data);  //只能发送字符串格式的json,不能直接发送json
        }
        if (reqDataType === 'string') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
    }

    //5.接收数据
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && (this.status >= 200 && this.status < 300)) {
            var res;
            if (resDataType === 'json') {
                res = JSON.parse(this.responseText);
                success.call(this, res, this.responseXML)
            }
            if (resDataType === 'blob') {
                res = new Blob([this.response], { type: 'image/' + imgType });
                success.call(this, res)
            }

        }
    };
};



exports.$ = $