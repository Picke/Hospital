PR.Views.EncounterDetailedView = PR.Views.BaseView.extend({
    initialize: function () {
        this._build();
        this._repository = PR.Repositories.EditEncounterRepository(this._patientId, this._encounterId);
    },

    _build: function () {
        var html = $.render.encounterDetailedTemplate();
        this.setHtml(html);
    }
})