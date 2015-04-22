PR.Views.NewEncounterView = PR.Views.BaseView.extend({
    initialize: function () {
        this._build();
    },

    _build: function () {
        var html = $.render.newEncounterTemplate();
        this.setHtml(html);
    }
})