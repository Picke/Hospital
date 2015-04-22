(function (BaseView, exports) {
    var MedicalServiceCodeView;

    MedicalServiceCodeView = BaseView.extend({
        _selector: "#medical-service-code-container",
        _selectors: {
            closeMedicalServiceCodeContainer: ".close-medical-service-code-modal",
            medicalServiceCodeNextButton: ".medical-service-code-button-next",
            medicalServiceCodeBody: ".medical-service-code-body",
            medicalServiceCodeMenu: "#medical-service-modal-menu",
            closeMedicalServiceCodeButton: '.close-medical-service-code-modal-button'
        },

        initialize: function (options) {
            var patientId = (typeof options.patientId != 'undefined') ? options.patientId : null;
            this.onNextBtnClick = _.isFunction(options.onNextBtnClick) ? options.onNextBtnClick : $.noop;
            this._patientId = $.isNumeric(patientId) ? patientId : null;
            this._medicalService = null;
            this.parentView = options.parentView;
        },

        _loadTemplate: function(callback) {
            PR.registerJSRenderTemplates(PR.require.moduleTemplates.newEncounter, callback);
        },

        _initModal: function () {
            var html = $.render.medicalServiceCodeTemplate();
            this.setHtml(html);
            $(this._html).modal({ backdrop: 'static', keyboard: false });
        },

        _checkReadyStatus: function () {
            if (this._repository.isDataReady() && (!this._hasValidPatient() || (this._repository.isDataReady() && !this._dataReadyFlag))) {
                this._dataReady();
                commonUI.unblock();
            }
        },

        _dataReady: function () {
            this._dataReadyFlag = true;
            this._loadTemplate($.proxy(this._updateMedicalServicesMenu, this));
        },

        _hasPatientId: function () {
            return ($.isNumeric(this._patientId) && this._patientId > 0) ? true : false;
        },

        _hasValidPatient: function () {
            var patientData = this._repository.getPatientData();
            return (this._hasPatientId() && patientData && patientData.mrn && patientData.demographics);
        },

        _updateMedicalServicesMenu: function (data) {
            var options = $.render.encounterDetailedMedicalServiceSelectOptionTemplate({
                code: '',
                description: '(Select one)',
                selected: false,
                medicalServiceType: '',
                medicalServiceTypeCode: '',
                serviceTypeCode: '',
                schedulingRequired: '',
                autodischarge: ''
            });
            _.each(_.filter(data, this.filterMedicalServices), function (item) {
                options += $.render.encounterDetailedMedicalServiceSelectOptionTemplate({
                    code: item.code,
                    description: item.description,
                    selected: false,
                    medicalServiceType: item.medicalServiceType,
                    medicalServiceTypeCode: item.medicalServiceTypeCode,
                    schedulingRequired: item.schedulingRequired,
                    inpatient: item.inpatient,
                    autodischarge: item.autodischarge
                });
            });
            this.getElement("medicalServiceCodeMenu").html(options);
            this.getElement("medicalServiceCodeMenu").focus();
        },

        _nextButtonHandler: function() {
            this._medicalService = $(this._selectors.medicalServiceCodeMenu).val();
            this.onNextBtnClick(this._medicalService);
        },

        _postRender: function () {
            this._addEventHandlers();
        },

        _addEventHandlers: function () {
            $(this._selectors.medicalServiceCodeNextButton).on('click', $.proxy(this._nextButtonHandler, this));
        },

        _destroy: function() {
            var preBookedAppointmentKey = HMS.PAM.Constants.Appointments.Calendar.PreBookedAppointmentKey;
            HMS.MemoryStorage.remove(preBookedAppointmentKey);
            $('.modal-backdrop').remove();
            this.remove();
        },

        _preDestroy: function() {
            this._destroy();
            if (this.parentView) {
                this.parentView._preDestroy();
            }
        },

        render: function () {
            var callback = function (data) {
                this._updateMedicalServicesMenu(data.services);
            };
            this._loadTemplate($.proxy(function() {
                this._initModal();
                this.$el = $(this._selector);
                this._postRender();
//                HMS.SDS.PAM.getMedicalServices($.proxy(callback, this));
            }, this));
            return this;
        }
    });
    exports.MedicalServiceCodeView = MedicalServiceCodeView;
})(
        PR.Views.BaseView,
        /*exports*/
        PR.Views
    );