PR.Utils.applySelect2 = function (element, options) {
    options = options || {};
    var optionsEl = element.find('option');
    if (!element || optionsEl.length == 0) {
        throw "Unable to aplly select2 to element argument";
    }
    if (options.placeholder) {
        element.prepend('<option></option>')
    }
    if (optionsEl.length > 500) {
        var selectOptions = [];
        var optgroupsEl = element.find('optgroup'), optionEls, option, j, i;
        if (optgroupsEl.length != 0) {
            var notGroupedOptions = element.children('option');
            for (i = 0; i < notGroupedOptions.length; i++ ) {
                var opt = $(notGroupedOptions[i]);
                selectOptions[selectOptions.length] = {
                    id: opt.prop('value'),
                    text: opt.text()
                };
                opt = null;
            }
            notGroupedOptions = null;
            for (i = 0; i < optgroupsEl.length; i++) {
                var optgroup = $(optgroupsEl.get(i));
                var rootNode = {
                    text: optgroup.prop('label'),
                    children: []
                };

                optionEls = optgroup.find('option');
                for (j = 0; j < optionEls.length; j++) {
                    option = $(optionEls.get(j));
                    rootNode.children[rootNode.children.length] = {
                        id: option.prop('value'),
                        text: option.text()
                    };
                }
                optionEls = null;
                selectOptions[selectOptions.length] = rootNode;
            }
        } else {
            optionEls = element.find('option');
            for (j = 0; j < optionEls.length; j++) {
                option = $(optionEls.get(j));
                selectOptions[selectOptions.length] = {
                    id: option.prop('value'),
                    text: option.text()
                };
            }
        }
        option = null;
        optgroupsEl = null;
        options.query = function (queryOptions) {
            var pageSize = 100;
            var startIndex = (queryOptions.page - 1) * pageSize;
            var filteredData = $.extend(true,{length: selectOptions.length},selectOptions);
            var stripDiacritics = window.Select2.util.stripDiacritics;

            if (queryOptions.term && queryOptions.term.length > 0) {

                var term = stripDiacritics(queryOptions.term.toLowerCase());
                queryOptions.context = _.filter(filteredData,function (group) {
                    function checkTerm(child) {
                        if (!child.stripped_text) {
                            child.stripped_text = stripDiacritics(child.text.toLowerCase());
                        }
                        return (child.stripped_text.indexOf(term) !== -1);
                    }
                    if (group.hasOwnProperty('children')) {
                        group.children = group.children.filter(function (child) {
                            return checkTerm(child);
                        });
                    }
                    return (group.children && group.children.length > 0) || checkTerm(group);
                });

                filteredData = queryOptions.context;
            }
            var results, totalLength = 0;
            if (_.any(filteredData, function (item) {
                return item.hasOwnProperty('children');
            })) {
                results = [];
                var currentCount = 0, currentIndex = 0;
                for (var i = 0; i < filteredData.length; i++) {
                    var children = _.clone(filteredData[i].children);
                    var itemChildrenLength = children ? children.length : 0;
                    totalLength += itemChildrenLength;
                    if (!itemChildrenLength || currentCount == pageSize || currentIndex + itemChildrenLength < startIndex) {
                        currentIndex += itemChildrenLength;
                    } else {
                        var internalStarIndex = currentCount != 0 ? 0 : startIndex - currentIndex;
                        var count = itemChildrenLength < pageSize - currentCount ? itemChildrenLength : pageSize - currentCount;
                        results[results.length] = {
                            text:internalStarIndex == 0 ? filteredData[i].text : '',
                            children: children.splice(internalStarIndex, count)
                        };
                        currentCount += count;
                        currentIndex += count
                    }
                    children = null;
                }
            } else {
                results = filteredData.slice(startIndex, startIndex + pageSize);
            }

            queryOptions.callback({
                context: filteredData,
                results: results,
                more: (startIndex + pageSize) < totalLength
            });
            filteredData = null;
            results = null;
        };

    }
    element.select2(options);
    element.on('select2-close',function(){
        var focuser  = $(this).select2('container').find('input,a');
        focuser.focus();
        focuser = null;
    });
    element.siblings('div[id$=' + element.attr('id') + ']').add().on('keypress', function(e) {
        var spaceButtonKeyCode = 32;

        if (e.keyCode === spaceButtonKeyCode) {
            element.select2('open');
        }
    });
    if (!element.val()) {
        element.select2('val','');
    }
    optionsEl = null;
};

PR.Utils.applyPhoneMask = function (inputEl, options) {

    // numeric or alphabetic char definition
    $.inputmask.defaults.definitions['*'] = {
        validator: '[A-Za-z0-9]',
        cardinality: 1
    };

    var maskType = {
        //numeric or alphabetic
        'na': '(***) ***-****',
        // numeric + numeric or alphabetic
        'n+na': '(999) ***-****',
        // numeric only
        'n': '(999) 999-9999'
    };

    var _options = options || {};

    var _pluginOptions = {};
    _pluginOptions.mask = maskType.hasOwnProperty(_options.maskType) ? maskType[_options.maskType] : maskType['na'];
    inputEl.inputmask('mask', _pluginOptions);
};

PR.Utils.maskInput = function (inputEl) {
    var mask = "99/99/9999";
    inputEl.inputmask('mask', _.extend({mask: mask}));
};