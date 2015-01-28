PR.Views.HomePageView = PR.Views.BaseView.extend({

    _repository: null,

    _selectors: {
        createPatientButton: "#create-patient-button"
    },

    initialize: function (repo) {
        this._repository = repo;
        this._build();
    },

    _build: function () {
        var html = $.render.homePageTemplate();
        this.setHtml(html);
    },

    _postRender: function () {
        this._addListeners();
    },

    _addListeners: function () {
        $(this._selectors.createPatientButton).on("click", function () {
            PR.controller.navigate("#new-encounter", {trigger: true});
        });
    }

});