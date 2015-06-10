PR.SDS.Common = (function () {
    var self = {};

    var prefixURL = window.location.pathname;

    self._loadPatientsData = function (successFn) {
        return $.get(prefixURL + 'getAllEncounters', successFn);
    };

    self._loadPatientData = function (patientId, successFn) {
        return $.get(prefixURL + 'patient/' + patientId + '/data', successFn);
    };

    self._loadEncounterData = function (patientId, encounterId, successFn) {
        return $.get(prefixURL + 'patient/' + patientId + '/encounter/' + encounterId + '/data', successFn);
    };

    return self;
}());
