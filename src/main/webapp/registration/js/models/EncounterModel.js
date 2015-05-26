PR.Models.EncounterModel = Backbone.Model.extend({
    defaults: {
        encounterId: null,
        patientId: '',
        patientName: '',
        patientGender: 'U',
        patientDOB: '',
        cityOfBirth: '',
        phone: '',
        physician: '',
        street: '',
        zip: '',
        city: '',
        intakeDate : '',
        registrationType : '',
        primaryInsurance : '',
        policyNumber : '',
        insuredsName : '',
        insuredsGender : '',
        insuredsRelation : '',
        insuredsDOB : ''
    }
});