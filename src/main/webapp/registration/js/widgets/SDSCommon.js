PR.SDS.Common = (function () {
    var self = {};

    self._loadPatientsData = function (successFn) {
        return $.get('/registration/getAllEncounters', successFn);
    };

    self._getEncounterData = function (patientId, encounterId, successFn) {
        return $.get('/registration/patient/' + patientId + '/encounter/' + encounterId + '/data', successFn);
    };

    return self;
}());
