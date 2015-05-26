PR.createNS('PR.Repositories');

PR.Repositories.NewEncounterRepository = function () {
    var self = new PR.BaseView();
    var eventsPublisher = PR.BaseView.prototype;

    self.patientData = null;

    self._loadPatientData = function (patientId) {
        return PR.SDS.Common._loadPatientData(patientId, function (data) {
            self.patientData = data;
            eventsPublisher.publish('patientData:loaded')
        })
    };

    self._saveEncounter = function (data, successFn) {
        PR.SDS._saveEncounter(data, successFn)
    };

    self._getPatientData = function () {
        return self.patientData;
    };

    return self;

}
