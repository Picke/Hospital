PR.SDS.Common = (function () {
    var self = {};

    self._loadPatientsData = function (successFn) {
        return $.get('/registration/getAllEncounters', successFn);
    };

    self._loadPatientData = function (patientId, successFn) {
        return $.get('/registration/patient/' + patientId + '/data', successFn);
    };

    self._loadEncounterData = function (patientId, encounterId, successFn) {
        return $.get('/registration/patient/' + patientId + '/encounter/' + encounterId + '/data', successFn);
    };

    return self;
}());
