(function () {
    var self = PR,

        _getTemplate = function (name, url, callback) {
            console.log("getting template " + name);
            return $.get(url, function (data) {
                if(callback) { callback(data, name); }
            });
        },

        _createTemplatesFrom = function (data) {
            var node = document.createDocumentFragment(),
                containerDiv = document.createElement('DIV');
            containerDiv.innerHTML = data;
            node.appendChild(containerDiv);
            _findChildNode(node);
        },

        _templates = {},

        _findChildNode = function (node) {

            if (node.hasChildNodes()) {
                _.each(node.childNodes, function (child) {
                    if (child.nodeName === 'SCRIPT' && child.attributes && child.attributes['data-type']) {
                        if (child.attributes['data-templatename']) {
                            $.templates(child.attributes['data-templatename'].value, child.innerHTML);  //adding template into jsrender cache
                        } else {
                            alert('data-templatename attribute is missing in template');
                        }
                    } else {
                        _findChildNode(child);
                    }
                });
            }
        },

        _loadTemplatesAndDo = function (templatesToRegister, callback, isTemplatePresent, strategy) {
            var numTemplates = _.keys(templatesToRegister).length,
                callbackCallWhenDone = _.after(numTemplates, callback || $.noop),
                deferredArray = [];

            _.each(templatesToRegister, function (templateURL, templateKey) {
                if (_.isUndefined(_templates[templateKey])) {
                    _templates[templateKey] = templateURL;
                } else {
                    if (_templates[templateKey] !== templateURL) {
                        console.log("Note: A previously registered template file is being called again: " + templateKey + " -- " + templateURL + ".");
                    }
                }
                if (!isTemplatePresent(templateKey)) {
                    deferredArray.push( _getTemplate(templateKey, templateURL, function (data, name) {
                        try {
                            strategy(name, data);
                            callbackCallWhenDone();
                        } catch(e) {
                            console.log("Error running load template strategy.  " + name + " " + e);
                        }
                    }));
                }else{
                    callbackCallWhenDone();
                }
            });

            return deferredArray;

        };

    /* obj example: { "myuniqueid" : "/path/to/template.tmpl/" } */
    self.registerTemplates = function (templatesToRegister, callback) {
        if(!templatesToRegister){ callback(); }

        var strategy = function(name, data){ $.template(name,data); },
            isTemplatePresent = function(templateKey){
                return $.template[templateKey];
            },
            defer = $.when.apply(null, _loadTemplatesAndDo(templatesToRegister, null, isTemplatePresent, strategy))

        if(callback) { defer.done(callback); }

        return defer;
    };

    self.registerJSRenderTemplates = function (templatesToRegister, callback) {
        if(!templatesToRegister){ callback(); }
        var strategy = function(name, data){
                $.templates(name, data);
                _createTemplatesFrom(data);
            },
            isTemplatePresent = function(templateKey){
                return $.templates[templateKey];
            },
            defer = $.when.apply(null, _loadTemplatesAndDo(templatesToRegister, null, isTemplatePresent, strategy))

        if(callback) {
            defer.done(callback);
        }

        return defer;
    };

    //This will register a template using the raw html rather than from a template file
    //Should be used for very small tempalte files that are created in javascript.
    self.registerTemplateHtml = function (key, html) {
        if (typeof _templates[key] === "undefined") {
            _templates[key] = html;
            $.template(key, html);
        }
    };

}());

/* override the jquery .tmpl method so it will only call our custom tmpl */
(function () {

    var origTmplMethod = $.fn.tmpl;

    $.fn.tmpl = function (data, options, parentItem) {
        return origTmplMethod(this[0], data, options, parentItem);
    };

}());


