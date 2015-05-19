PR.Views.NewEncounterView = PR.Views.BaseView.extend({

    _patientId: null,
    _repository: null,
    msc: null,

    _selectors: {
        newEncounterForms: '#new-encounter-forms',
        medicalService: '#medical-service-menu',
        saveButton: '#new-encounter-save-button',
        name: '#quick-form-name',
        dob: '#quick-form-dob',
        phone: '#quick-form-phone-number',
        intakeDate: '#quick-form-expected-registration',
        insuranceName: '#quick-form-insurance-name',
        unknownDobCheckbox: '#quick-form-unknown-dob',
        insuredsDOB: '#quick-form-insureds-dob'
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
        this.renderForm();
        $(this._selectors.name).focus();
        this.applySelect2ToInsuranceField();
        this.setMasks();
        this.setRegistrationDate();
        this.initEventHandlers();
        $(this._selectors.saveButton).on('click', $.proxy(this._onSaveClicked, this));
    },

    renderForm: function () {
        var isQuickForm = this.msc == 'inpatient';
        var html = $.render.newEncounterFormTemplate({
            isQuickForm: isQuickForm
        })
        $(this._selectors.newEncounterForms).html(html);
        $(this._selectors.newEncounterForms).hide().fadeIn('slow');
    },

    applySelect2ToInsuranceField: function () {
        PR.Utils.applySelect2($(this._selectors.insuranceName), {
            allowClear: true,
            placeholder: "Insurance Name/ Insurance Id"
        });
        $(this._selectors.insuranceName).select2('val', '');
    },

    setMasks: function () {
        PR.Utils.maskInput($(this._selectors.dob));
        PR.Utils.maskInput($(this._selectors.intakeDate));
        PR.Utils.maskInput($(this._selectors.insuredsDOB));
        PR.Utils.applyPhoneMask($(this._selectors.phone), {maskType: 'n'});
    },

    setRegistrationDate: function () {
        var todayDate = new Date();
        $(this._selectors.intakeDate).val(('0' + todayDate.getDate()).slice(-2) + '/' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '/' + todayDate.getFullYear())
    },

    initEventHandlers: function () {
        $(this._selectors.medicalService).on('change', $.proxy(function (e) {
            if ($(e.target).val() == 'inpatient') {
                this.hideFullPatientInfo();
            } else {
                this.showFullPatientInfo();
            }
            $(this._selectors.newEncounterForms).hide().fadeIn('slow');
        }, this));
        $(this._selectors.unknownDobCheckbox).on('click', $.proxy(function (e) {
            $(e.target).is(':checked') ?
                $(this._selectors.dob).prop('disabled', true) :
                $(this._selectors.dob).prop('disabled', false);
            $(this._selectors.dob).val('');
        }, this))
    },

    hideFullPatientInfo: function () {
        $('.js-full-form').addClass('hide');
    },

    showFullPatientInfo: function () {
        $('.js-full-form').removeClass('hide');
    },

    _onSaveClicked: function () {

    }
})