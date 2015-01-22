(function () {

    var self = PR;
    var _ajaxCallList = [];

    self.post = function (url, success, options, errfn) {
        var o = options || {};
        o.verb = 'POST';
        return self.ajax(url, success, o, errfn);
    };

    self.get = function (url, success, options, errfn) {
        var o = options || {};
        o.verb = 'GET';
        return self.ajax(url, success, o, errfn);

    };

    self.redirectExpired = function (xhr, returnUrl) {
//        HMS.Storage.clear();
//        var redirectUrl = HMS.basePath + "index.html";
//        if (xhr && xhr.getResponseHeader('Location')) {
//            redirectUrl = xhr.getResponseHeader('Location');
//        }
//        sessionStorage.clear();
//Return url doesn't work for non-default persona, since  all expirience specific URLs are protected by
//by different security roles
//TODO Identify a way to use the same persona
//                if(!returnUrl){
//                    returnUrl = window.location.pathname
//                }
//                var r = "?returnURL=" + encodeURIComponent(returnUrl);
        //stop all ajax requests
        _ajaxCallList.forEach(function(ajaxCall) {
            ajaxCall.abort();
        });
        _ajaxCallList = [];
        alert("Session has expired.");
        window.location = redirectUrl /*+ r */;
    };

    self.ajax = function (url, success, options, errorfn) {

        url = url || "";
        url = url.charAt(0) === "/" ? url.substr(1) : url;
        var _logIndex,
            ajaxCall,
            _deferer = $.Deferred(),

            _defaults = {
                data: null,
                el: "",
                verb: "GET",
                contentType: "application/x-www-form-urlencoded",
                dateFormat: "d-MMM-yyyy",
                isJson: true,
                dateFields: [],
                log: true, //logging to server on by default
                headers: { "facilityId": self.facilityId, "X-Http-Request": "1" },
                successfn: success,
                completefn: null,
                errorfn: errorfn,
                warningfn: null
            },

            _onSuccess = function (data, url) {

                var _returnData,
                    jsonResponse,
                    warn;

                try {
                    if (_defaults.log) {
//                        HMS.Logging.logAjaxEnd(_logIndex);
                    }
                    if (_defaults.contentType === "application/json" && data) {

                        jsonResponse = PR.Utils.parseJSON(data);

                        if (jsonResponse && typeof jsonResponse === "object") {
                            warn = jsonResponse.warnings;

                            _returnData = jsonResponse.data;

                            if (warn && typeof _defaults.warningfn === 'function') {
                                _defaults.warningfn(warn);
                            }
                        }

                    } else {
                        _returnData = data;
                    }
                    if (typeof _defaults.successfn === 'function') {
                        _defaults.successfn(_returnData);
                    }

                    //resolve the deferer
                    _deferer.resolveWith(_deferer, [_returnData, url]);

                } catch (error) {
                    _onError(error, url, _returnData || " no returnData from the call ");
                }


            },

            _onError = function (errdata, url, err) {
                var _defaultErrorHandler = function (errdata, url) {
                    //TODO introduce common HTTP errors handling, at least for 401

                    if (errdata && errdata.status && errdata.status === 401) {
                        self.redirectExpired(errdata);
                    } else {
                        var response = JSON.parse(errdata.responseText), msg = errdata.status + ':', i = 0;
                        if (response !== null && typeof response.errors !== 'undefined') {
                            for (i; i < response.errors.length; ++i) {
                                msg += "  " + response.errors[i];
                            }
                        } else {
                            msg += "  " + err.statusText;
                        }
                        alert(msg);
                    }
                };
                if (errdata.statusText !== 'abort') {
                    try {
                        console.error(" URL:", url);
                        console.error(errdata.stack);
                        _deferer.rejectWith(_deferer, [errdata, url, err]);
                        if (typeof _defaults.errorfn === 'function') {
                            _defaults.errorfn(errdata, url);
                        } else {
                            _defaultErrorHandler(errdata, url);
                        }
                    } catch (error) {
                        // Alan Huffman added this -- remove if unhelpful
                        console.error("--------------------------------------------------------------------------------");
                        console.log(' url: ', url, 'errData : ', errdata, ' err: ', err, ' caught error ', error);
                        console.error("--------------------------------------------------------------------------------");
                    }
                }
            },

            _onComplete = function (xhr) {
                if (_defaults.el && _defaults.el !== "") {
                    $(_defaults.el).html('').hide();
                }
                if (typeof _defaults.completefn === 'function') {
                    _defaults.completefn();
                }
                var index = _ajaxCallList.indexOf(xhr);
                if (index > -1) {
                    _ajaxCallList.splice(index, 1);
                }
            },

            _doPost = function (data) {
                if (typeof data === "object") {
                    data = JSON.stringify(data);
                }

                ajaxCall = $.ajax({
                    url: self.basePath + url,
                    data: data || "",
                    contentType: _defaults.contentType,
                    success: function (data) {
                        _onSuccess(data, self.basePath + url, data);
                    },
                    error: function (data) {
                        _onError(data, url);
                    },
                    complete: _onComplete,
                    type: _defaults.verb,
                    dataType: "text",
                    headers: _defaults.headers
                });
                _ajaxCallList.push(ajaxCall);
                _deferer.abort = function () {
                    ajaxCall.abort()
                };

            },

            _doOtherAjaxAction = function (data) {
                var params;
                if (data && typeof data === "object") {
                    _.each(data, function (item) {
                        if (data[item] === "" || data[item] === null) {
                            delete data[item];
                        }
                    });
                    params = $.param(data) || null;
                    url = url + (params === null ? "" : "&" + params);
                }

                ajaxCall = $.ajax({
                    url: self.basePath + url,
                    contentType: _defaults.contentType,
                    success: _onSuccess,
                    error: function (data) {
                        _onError(data, url);
                    },
                    complete: _onComplete,
                    type: _defaults.verb,
                    dataType: "text",
                    headers: _defaults.headers
                });
                _ajaxCallList.push(ajaxCall);
                _deferer.abort = function () {
                    ajaxCall.abort();
                }
            },

            _addBuildToQueryStringToGetRidOfCache = function (url) {
//                if (HMS.isDebugMode) {
//                    //for debug mode we want to refresh every time
//                    return url + (url.indexOf("?") > 0 ? "&" : "?") + "dt=" + new Date().getTime();
//                } else {
//                    return url + (url.indexOf("?") > 0 ? "&" : "?") + "version=" + HMS.versionNumber + HMS.buildNumber;
//                }
            },

            _doVocab = function () {
                $.support.cors = true;

                $.ajax({
                    url: 'http://s1016155:8080/common/service/vocab/' + url,
                    contentType: _defaults.contentType,
                    success: _onSuccess,
                    error: function (data) {
                        _onError(data, url);
                    },
                    complete: _onComplete,
                    type: "GET",
                    dataType: "JSON"
                });
            };

        $.extend(_defaults, options);

        if (/^\/?service/i.test(url) && _defaults.isJson) {
            _defaults.contentType = "application/json";
        }

//        if (_defaults.log) {
//            _logIndex = HMS.Logging.logAjaxStart(url);
//        }

        url = _addBuildToQueryStringToGetRidOfCache(url);

        if (_defaults.verb === "POST") {
            _doPost(_defaults.data);
        } else if (_defaults.verb === "VOCAB") {
            _doVocab();
        } else {
            _doOtherAjaxAction(_defaults.data);
        }

        return _deferer;
    };

}());