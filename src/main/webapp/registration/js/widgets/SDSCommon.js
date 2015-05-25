PR.SDS.Common = (function () {
    var self = {};

    self._loadPatientsData = function (successFn) {
        return $.get('/registration/getAllEncounters', successFn);
    };

    self._loadPatientData = function (patientId, successFn) {
        return $.get('/registration/patient/' + patientId + '/data', successFn);
    };

    return self;
}());
