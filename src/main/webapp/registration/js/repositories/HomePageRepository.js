PR.createNS('PR.Repositories');

PR.Repositories.HomePageRepository = function () {
    var self = new PR.Views.BaseView();

    self.encounterData = null;


    self._loadAllData = function () {
        self._loadPatientsData();
    };

    self._loadPatientsData = function () {
        PR.SDS.Common._loadPatientsData(function (data) {
            self.encounterData = data;
        })
    };

    self._getEncounterData = function () {
        return self.encounterData;
    }

    self._loadAllData();

    return self;
}