PR.Views.NewEncounterView = PR.Views.BaseView.extend({

    _patientId: null,
    _repository: null,
    msc: null,

    _selectors: {
        newEncounterForms: '#new-encounter-forms'
    },

    initialize: function (options) {
        this._patientId = options.patientId;
        this._repository = options.repo;
        this.msc = options.msc;
        this._build();
    },

    _build: function () {
        var html = $.render.newEncounterTemplate();
        this.setHtml(html);
    },

    _postRender: function () {
        this.renderQuickForm();
    },

    renderQuickForm: function () {
        var html;
        html = (this.msc == 'inpatient') ?
            $.render.newEncounterQuickFormTemplate() :
            $.render.newEncounterFullFormTemplate();
        $(this._selectors.newEncounterForms).html(html);

    }
})