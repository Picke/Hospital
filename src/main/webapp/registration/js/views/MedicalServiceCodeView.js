(function (ScreenView, exports) {
    var MedicalServiceCodeView;

    MedicalServiceCodeView = ScreenView.extend({
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
            this.filterMedicalServices = _.isFunction(options.filterMedicalServices)? options.filterMedicalServices: HMS.PAM.lib.Helpers.constant(true);
            this.parentView = options.parentView;
        },

        _loadTemplate: function(callback) {
            PR.registerJSRenderTemplates(PR.require.moduleTemplates.newEncounter, callback);
        },

        _initModal: function () {
            var html = $.render.medicalServiceCodeSelection();
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
            this._medicalService = this.getElement("medicalServiceCodeMenu").val();
            this.onNextBtnClick(this._medicalService);
        },

        _postRender: function () {
            this._addEventHandlers();
        },

        _addEventHandlers: function () {
            this.getElement("medicalServiceCodeMenu").on('change', $.proxy(function(){
                    if (this.getElement("medicalServiceCodeMenu").val()) {
                        this.getElement("medicalServiceCodeNextButton").removeAttr('disabled');
                    } else {
                        this.getElement("medicalServiceCodeNextButton").attr('disabled', true);
                    }
                    //needs for ie
                    _.delay($.proxy(function() {
                        this.getElement('medicalServiceCodeMenu').focus();
                    }, this), 100);
                }, this)).on("keydown", $.proxy(function(e){
                    if (e.keyCode === 13) {
                        _.delay($.proxy(function() {
                            this.getElement("medicalServiceCodeNextButton").focus();
                        }, this), 0);
                    }
                }, this));
            this.getElement("medicalServiceCodeNextButton").on('click', $.proxy(this._nextButtonHandler, this));
            this.getElement("closeMedicalServiceCodeContainer").on('click', $.proxy(function() {
                    this._destroy();
                    HMS.PAM.controller.back(true);
                }, this)).on('keydown', $.proxy(function(e) {
                    if (e.keyCode === 9 && !e.shiftKey) {
                        e.preventDefault();
                        this.getElement("closeMedicalServiceCodeButton").focus();
                    }
                }, this));
            this.getElement("closeMedicalServiceCodeButton").on('keydown', $.proxy(function(e) {
                if (e.keyCode === 9) {
                    e.preventDefault();
                    if (!e.shiftKey) {
                        this.getElement('medicalServiceCodeMenu').focus();
                    } else {
                        this.getElement('closeMedicalServiceCodeContainer').focus();
                    }
                }
            }, this));
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
            commonUI.block();
            var callback = function (data) {
                this._updateMedicalServicesMenu(data.services);
                commonUI.unblock();
            };
            HMS.Widget.Alert('clear');
            this._loadTemplate($.proxy(function() {
                this._initModal();
                this.$el = $(this._selector);
                this._initDomElements();
                this._postRender();
                HMS.SDS.PAM.getMedicalServices($.proxy(callback, this));
            }, this));
            return this;
        }
    });
    exports.MedicalServiceCodeView = MedicalServiceCodeView;
    MedicalServiceCodeView.filters = {
        QUICK_SCHEDULING: function (msv) {
            // we should show only quick scheduling MSV with inpatient/outpatient types
            return msv.schedulingRequired &&
                msv.medicalServiceTypeCode !== HMS.Common.Constants.MedicalService.Emergency.TypeCode;
        },

        QUICK_SCHEDULING_OUTPATIENT: function (msv) {
            var isQuickScheduling = HMS.PAM.Views.MedicalServiceCodeView.filters.QUICK_SCHEDULING(msv);
            // returns quick scheduling MSV with only outpatient types
            return isQuickScheduling && !msv.inpatient;
        }
    };
})(
        HMS.PAM.Views.ScreenView,
        /*exports*/
        HMS.PAM.Views
    );