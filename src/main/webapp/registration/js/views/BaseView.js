PR.Views.BaseView = Backbone.View.extend(_.extend(
    {
        _selector: '#main',
        _el: null,
        _selectors: {},
        _elements: {},
        _html: '',

        preDestroy: function () {
//            this._preDestroy();
//            this._cleanUp();
        },

        setHtml: function (html) {
            this._html = html;
            return this;
        },

        render: function () {
            $(this._selector).ready($.proxy(function () {
//                HMS.Widget.Alert('clear');
                this._preRender();
                this._el = $(this._selector);
                this._el.html(this._html);
                this._initDomElements();
                this._postRender();
            }, this));
            return this;
        },

        _preRender: function () {
            // Child class implementation
        },

        _postRender: function () {
            // Child class implementation
        },

        _initDomElements: function () {
            for (var selector in this._selectors) {
                this.addElement(this._selectors[selector]);
            }
        },

        addElement: function(selector){
            this._elements[selector] = $(selector);
        }


    }, new PR.BaseView()))