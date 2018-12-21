window.Request = {
    _xhr: function (url, options, resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, url);
        if (options.contentType) {
            xhr.setRequestHeader("Content-Type", options.contentType);
        }
        xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
        if (reject == undefined) {
            reject = function (jsonText) {
                console.log(JSON.parse(jsonText));
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                switch (xhr.status) {
                    case 200:
                        resolve(JSON.parse(xhr.responseText));
                        break;

                    case 401:
                        window.location.href = BASE_URL + '/login/entrar';
                        break;

                    default:
                        reject(xhr.responseText);
                        break;
                }
            }
        };
        xhr.send(options.data);
    },
    
    post: function (url, data, resolve, reject) {
        this._xhr(url, {
            method: 'POST',
            data: data,
            contentType: 'application/json'
        }, resolve, reject);
    },

    get: function (url, resolve, reject) {
        this._xhr(url, {
            method: 'GET',
            contentType: 'application/json'
        }, resolve, reject);
    }
};