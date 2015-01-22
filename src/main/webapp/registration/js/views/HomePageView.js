PR.Views.HomePageView = PR.Views.BaseView.extend({



    initialize: function (options) {
        this._build();
    },

    _build: function () {
        var html = $.render.homePageTemplate();
        this.setHtml(html)
    }

});