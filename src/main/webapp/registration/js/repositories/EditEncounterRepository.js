PR.createNS('PR.Repositories');

PR.Repositories.EditEncounterRepository = function () {
    var self = new PR.BaseView();
    var eventsPublisher = PR.BaseView.prototype;

    self._encounterData = null;

    self._loadEncounterData = function (patientId, encounterId) {
        return PR.SDS.Common._getEncounterData(patientId, encounterId, function (data) {
            self._encounterData = data;
        });
    };
}
