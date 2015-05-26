PR.Views.NewEncounterView = PR.Views.BaseView.extend({

    _patientId: null,
    _repository: null,
    msc: null,
    saveObject: {},
    saveModel: null,

    _selectors: {
        newEncounterForms: '#new-encounter-forms',
        medicalService: '#medical-service-menu',
        saveButton: '#new-encounter-save-button',
        unknownDobCheckbox: '#quick-form-unknown-dob',
        fields: {
            patientName: '#quick-form-name',
            patientDOB: '#quick-form-dob',
            cityOfBirth: '#quick-form-city-of-birth',
            phone: '#quick-form-phone-number',
            physician: '#quick-form-attending-physician',
            street: '#quick-form-street',
            zip: '#quick-form-zip',
            city: '#quick-form-city',
            intakeDate: '#quick-form-expected-registration',
            registrationType: '#quick-form-registration-type',
            primaryInsurance: '#quick-form-insurance-name',
            policyNumber: '#quick-form-policy',
            insuredsName: '#quick-form-insureds-name',
            insuredsRelation: '#quick-form-insureds-relationship',
            insuredsDOB: '#quick-form-insureds-dob'
        },
        radio: {
            patientGender: 'quick-form-gender',
            insuredsGender: 'quick-form-insureds-gender'
        }
    },

    eventsPublisher: PR.BaseView.prototype,

    initialize: function (options) {
        this._patientId = options.patientId;
        this._repository = options.repository;
        this.msc = options.msc;
        this._build();
    },

    _build: function () {
        var html = $.render.newEncounterTemplate();
        this.setHtml(html);
    },

    _postRender: function () {
        this.eventsPublisher.on('patientData:loaded', $.proxy(function () {
            this.renderForm();
            $(this._selectors.name).focus();
            this.applySelect2ToInsuranceField();
            this.setMasks();
            this._patientId && this.setFieldsValues();
            this._patientId && this.setRadioValues();
            this.setRegistrationDate();
            this.initEventHandlers();
            $(this._selectors.saveButton).on('click', $.proxy(this._onSaveClicked, this));
        }, this))
        !this._patientId && this.eventsPublisher.publish('patientData:loaded');
    },

    renderForm: function () {
        var isQuickForm = this.msc == 'inpatient';
        var html = $.render.newEncounterFormTemplate({
            isQuickForm: isQuickForm
        })
        $(this._selectors.newEncounterForms).html(html);
        $(this._selectors.medicalService).val(this.msc);
        $(this._selectors.newEncounterForms).hide().fadeIn('slow');
    },

    applySelect2ToInsuranceField: function () {
        PR.Utils.applySelect2($(this._selectors.fields.primaryInsurance), {
            allowClear: true,
            placeholder: "Insurance Name/ Insurance Id"
        });
        var insurance = this._patientId ? this._repository._getPatientData()['primaryInsurance'] : '';
        $(this._selectors.fields.primaryInsurance).select2('val', insurance);
    },

    setMasks: function () {
        PR.Utils.maskInput($(this._selectors.fields.patientDOB));
        PR.Utils.maskInput($(this._selectors.fields.intakeDate));
        PR.Utils.maskInput($(this._selectors.fields.insuredsDOB));
        PR.Utils.applyPhoneMask($(this._selectors.fields.phone), {maskType: 'n'});
    },

    setRegistrationDate: function () {
        var todayDate = new Date();
        $(this._selectors.fields.intakeDate).val(('0' + todayDate.getDate()).slice(-2) + '/' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '/' + todayDate.getFullYear())
    },

    initEventHandlers: function () {
        $(this._selectors.medicalService).off('change').on('change', $.proxy(function (e) {
            if ($(e.target).val() == 'inpatient') {
                this.hideFullPatientInfo();
            } else {
                this.showFullPatientInfo();
            }
            $(this._selectors.newEncounterForms).hide().fadeIn('slow');
        }, this));
        $(this._selectors.unknownDobCheckbox).on('click', $.proxy(function (e) {
            $(e.target).is(':checked') ?
                $(this._selectors.fields.dob).prop('disabled', true) :
                $(this._selectors.fields.dob).prop('disabled', false);
            $(this._selectors.fields.dob).val('');
        }, this))
        $('input[type=text]')
            .focusout(this.onChangeFieldInfo)
            .keyup(this.onChangeFieldInfo);
    },

    onChangeFieldInfo: function () {
        ($(this).val() == '' && $(this).closest('.control-group').find('.validation-required-prefix').is(':visible')) ?
            $(this).closest('.control-group').addClass('error') :
            $(this).closest('.control-group').removeClass('error')
    },

    hideFullPatientInfo: function () {
        $('.js-full-form').addClass('hide');
    },

    showFullPatientInfo: function () {
        $('.js-full-form').removeClass('hide');
    },

    setFieldsValues: function () {
        _.each(this._selectors.fields, function (el, prop) {
            $(el).val(this._repository._getPatientData()[prop]);
        }, this)
    },

    setRadioValues: function () {
        _.each(this._selectors.radio, function (el, prop) {
            var index = 2;
            switch (this._repository._getPatientData()[prop]) {
                case 'M' :
                    index = 0;
                    break;
                case 'F' :
                    index = 1;
            }
            $('input[name=' + el + ']')[index].checked = true;
        }, this)
    },

    getFieldsValues: function () {
        _.each(this._selectors.fields, function (el, prop) {
            if ($(el).is(':visible')) {
                this.saveObject[prop] = $(el).val();
            }
        }, this)
    },

    getRadioValues: function () {
        _.each(this._selectors.radio, function (el, prop) {
            this.saveObject[prop] =  $('input[name=' + el + ']:checked').val();
        }, this)
    },

    _onSaveClicked: function () {
        this.getFieldsValues();
        this.getRadioValues();
        this.saveObject['patientId'] = this._patientId;
        this.saveModel = new PR.Models.EncounterModel(this.saveObject);
        this._repository._saveEncounter({patientId: this._patientId, model: this.saveModel}, $.proxy(function (data) {
            PR.controller.navigate('encounter/' + data.encounterId + '/' + data.patientId);
        }, this));
    }
})