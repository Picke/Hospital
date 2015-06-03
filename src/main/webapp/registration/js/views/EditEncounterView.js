PR.Views.EditEncounterView = PR.Views.BaseView.extend({

    _patientId: null,
    _encounterId: null,
    _repository: null,
    saveObject: {},
    saveModel: null,

    _selectors: {
        editEncounterForm: '#edit-encounter-form',
        medicalService: '#medical-service-menu',
        saveButton: '#new-encounter-save-button',
        unknownDobCheckbox: '#edit-form-unknown-dob',
        fields: {
            patientName: '#edit-form-name',
            patientDOB: '#edit-form-dob',
            cityOfBirth: '#edit-form-city-of-birth',
            phone: '#edit-form-phone-number',
            physician: '#edit-form-attending-physician',
            street: '#edit-form-street',
            zip: '#edit-form-zip',
            city: '#edit-form-city',
            intakeDate: '#edit-form-expected-registration',
            registrationType: '#edit-form-registration-type',
            primaryInsurance: '#edit-form-insurance-name',
            policyNumber: '#edit-form-policy',
            insuredsName: '#edit-form-insureds-name',
            insuredsRelation: '#edit-form-insureds-relationship',
            insuredsDOB: '#edit-form-insureds-dob'
        },
        radio: {
            patientGender: 'edit-form-gender',
            insuredsGender: 'edit-form-insureds-gender'
        }
    },

    eventsPublisher: PR.BaseView.prototype,

    initialize: function (options) {
        this._patientId = options.patientId;
        this._encounterId = options.encounterId;
        this._repository = options.repository;
        this._build();
    },

    _build: function () {
        var html = $.render.editEncounterTemplate();
        this.setHtml(html);
    },

    _postRender: function () {
        this.eventsPublisher.off().on('encounterData:loaded', $.proxy(function () {
            this.renderForm();
            $(this._selectors.fields.name).focus();
            this.applySelect2ToInsuranceField();
            this.setMasks();
            this.setFieldsValues();
            this.setRadioValues();
            this.initEventHandlers();
            $(this._selectors.saveButton).off().on('click', $.proxy(this._onSaveClicked, this));
        }, this))
    },

    renderForm: function () {
        var html = $.render.editEncounterFormTemplate()
        $(this._selectors.editEncounterForm).html(html);
        $(this._selectors.medicalService).val(this._repository._getEncounterData()['medicalService']);
        $(this._selectors.editEncounterForm).hide().fadeIn('slow');
    },

    applySelect2ToInsuranceField: function () {
        PR.Utils.applySelect2($(this._selectors.fields.primaryInsurance), {
            allowClear: true,
            placeholder: "Insurance Name/ Insurance Id"
        });
        var insurance = this._repository._getEncounterData()['primaryInsurance'];
        $(this._selectors.fields.primaryInsurance).select2('val', insurance);
    },

    setMasks: function () {
        PR.Utils.maskInput($(this._selectors.fields.patientDOB));
        PR.Utils.maskInput($(this._selectors.fields.intakeDate));
        PR.Utils.maskInput($(this._selectors.fields.insuredsDOB));
        PR.Utils.applyPhoneMask($(this._selectors.fields.phone), {maskType: 'n'});
    },

    initEventHandlers: function () {
        $(this._selectors.unknownDobCheckbox).off().on('click', $.proxy(function (e) {
            $(e.target).is(':checked') ?
                $(this._selectors.fields.patientDOB).prop('disabled', true) :
                $(this._selectors.fields.patientDOB).prop('disabled', false);
            $(this._selectors.fields.patientDOB).val('');
            $(this._selectors.fields.patientDOB).closest('.control-group').removeClass('error');
        }, this))
        $('input[type=text]')
            .focusout(this.onChangeFieldInfo)
            .keyup(this.onChangeFieldInfo);
        $('select').change(this.onChangeFieldInfo);
        $('input[type=radio]').on('click', function () {
            $(this).closest('.control-group').removeClass('error');
        });
    },

    onChangeFieldInfo: function () {
        ($(this).val() == '' && $(this).closest('.control-group').find('.validation-required-prefix').is(':visible')) ?
            $(this).closest('.control-group').addClass('error') :
            $(this).closest('.control-group').removeClass('error')
    },

    setFieldsValues: function () {
        _.each(this._selectors.fields, function (el, prop) {
            $(el).val(this._repository._getEncounterData()[prop]);
        }, this)
    },

    setRadioValues: function () {
        _.each(this._selectors.radio, function (el, prop) {
            var index = 2;
            switch (this._repository._getEncounterData()[prop]) {
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
            if ($(el).is(':visible') || prop == 'primaryInsurance') {
                this.saveObject[prop] = $(el).val();
            }
        }, this)
    },

    getRadioValues: function () {
        _.each(this._selectors.radio, function (el, prop) {
            this.saveObject[prop] =  $('input[name=' + el + ']:checked').val();
        }, this)
    },

    validateFieldValues: function () {
        var isValid = true;
        var $controlGroupEl;
        _.each(this._selectors.fields, function (el) {
            $controlGroupEl = $(el).closest('.control-group');
            if ($controlGroupEl.find('.validation-required-prefix').is(':visible') && $(el).val() == '' && !$(el).is(':disabled')) {
                $controlGroupEl.addClass('error');
                isValid = false;
            }
        })
        return isValid;
    },

    validateRadioValues: function () {
        var isValid = true;
        var $controlGroupEl;
        _.each(this._selectors.radio, function (el) {
            $controlGroupEl = $('input[name=' + el + ']').closest('.control-group');
            if ($controlGroupEl.find('span').is(':visible') && !$('input[name=' + el + ']:checked').val()) {
                $controlGroupEl.addClass('error');
                isValid = false;
            }
        })
        return isValid;
    },

    validate: function () {
        var isValidFieldValues = this.validateFieldValues();
        var isValidRadioValues = this.validateRadioValues();
        return isValidFieldValues && isValidRadioValues;
    },

    _onSaveClicked: function () {
        if (this.validate()) {
            this.getFieldsValues();
            this.getRadioValues();
            this.saveObject['patientId'] = this._patientId;
            this.saveObject['encounterId'] = this._encounterId;
            this.saveObject['medicalService'] = $(this._selectors.medicalService).val();
            this.saveModel = new PR.Models.EncounterModel(this.saveObject);
            this._repository._updateEncounter({patientId: this._patientId, encounterId: this._encounterId, model: this.saveModel}, $.proxy(function () {
                PR.controller.editEncounter(this._patientId, this._encounterId);
                PR.Utils.showSuccessAlert('Encounter saved successfully');
            }, this));
            return;
        }
        PR.Utils.showErrorAlert('Please fill all required fields');
    }
})