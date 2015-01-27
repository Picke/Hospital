PR.Views.NewEncounterView = PR.Views.BaseView.extend({
    initialize: function (options) {
        this._build();
    },

    _build: function () {
        var html = $.render.newEncounterTemplate();
        this.setHtml(html);
    }
})