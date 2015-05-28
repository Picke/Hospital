PR.createNS('PR.Repositories');

PR.Repositories.EditEncounterRepository = function () {
    var self = new PR.BaseView();
    var eventsPublisher = PR.BaseView.prototype;

    self.encounterData = null;

    self._loadEncounterData = function (patientId, encounterId) {
        return PR.SDS.Common._loadEncounterData(patientId, encounterId, function (data) {
            self.encounterData = data;
            eventsPublisher.publish('encounterData:loaded')
        });
    };

    self._getEncounterData = function () {
        return self.encounterData;
    }

    return self;
}
