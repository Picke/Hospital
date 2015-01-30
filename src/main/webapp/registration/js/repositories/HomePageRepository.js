PR.createNS('PR.Repositories');

PR.Repositories.HomePageRepository = function () {
    var self = new PR.BaseView();
    var eventsPublisher = PR.BaseView.prototype;



    self.patientsData = null;


    self._loadAllData = function () {
        self._loadPatientsData().done(function () {
            eventsPublisher.publish('dataReady');
        });
    };

    self._loadPatientsData = function () {
        return PR.SDS.Common._loadPatientsData(function (data) {
            self.patientsData = data;
        })
    };

    self._getPatientsData = function () {
        return self.patientsData;
    }

    self._loadAllData();

    return self;
}