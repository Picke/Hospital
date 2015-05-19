PR.Models.NewEncounterQuickFormModel = Backbone.Model.extend({
    defaults: {
        fullName: '',
        gender: '',
        dob: '',
        phoneNumber: '',
        attendingPhysician: '',
        intakeDate: '',
        fullRegisteredAdmitted: '',
        registrationType: '',
        insuranceName: '',
        insuredName: '',
        insuredGender: '',
        insuredRelationship: '',
        insuredDob: '',
        visitOnly : false
    }
});