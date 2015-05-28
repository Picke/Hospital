(function (BaseView, exports) {
    var MedicalServiceCodeView;

    MedicalServiceCodeView = BaseView.extend({
        _selector: "#medical-service-code-container",
        _selectors: {
            closeMedicalServiceCodeContainer: ".close-medical-service-code-modal",
            medicalServiceCodeNextButton: ".medical-service-code-button-next",
            medicalServiceCodeBody: ".medical-service-code-body",
            medicalServiceCodeMenu: "#medical-service-modal-menu",
            closeMedicalServiceCodeButton: '.medical-service-code-button-close'
        },

        initialize: function (options) {
            var patientId = (typeof options.patientId != 'undefined') ? options.patientId : null;
            this.onNextBtnClick = _.isFunction(options.onNextBtnClick) ? options.onNextBtnClick : $.noop;
            $(this._selectors.medicalServiceCodeMenu).val('inpatient');
            this._patientId = $.isNumeric(patientId) ? patientId : null;
            this._medicalService = null;
            this.parentView = options.parentView;
        },

        _initModal: function () {
            var html = $.render.medicalServiceCodeTemplate();
            this.setHtml(html);
            $(this._html).modal({ backdrop: 'static', keyboard: false });
        },

        _nextButtonHandler: function() {
            this._medicalService = $(this._selectors.medicalServiceCodeMenu).val();
            this.onNextBtnClick(this._medicalService);
            $('.modal').remove();
            $('.modal-backdrop').remove();
        },

        _closeButtonHandler: function() {
            PR.controller.navigate("#patientList", {trigger: true});
        },

        _postRender: function () {
            this._addEventHandlers();
            $(this._selectors.medicalServiceCodeNextButton).focus()
        },

        _addEventHandlers: function () {
            $(this._selectors.medicalServiceCodeNextButton).on('click', $.proxy(this._nextButtonHandler, this));
            $(this._selectors.closeMedicalServiceCodeButton).on('click', $.proxy(this._closeButtonHandler, this));
        },

        _preDestroy: function() {
            this._destroy();
            if (this.parentView) {
                this.parentView._preDestroy();
            }
        },

        render: function () {
            this._initModal();
            this.$el = $(this._selector);
            this._postRender();
            return this;
        }
    });
    exports.MedicalServiceCodeView = MedicalServiceCodeView;
})(
        PR.Views.BaseView,
        /*exports*/
        PR.Views
    );