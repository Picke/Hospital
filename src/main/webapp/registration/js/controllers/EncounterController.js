PR.createNS = function (namespace) {
    var parts = namespace.split('.'), parent = PR, i;

    if (parts[0] === 'PR') {
        parts = parts.splice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

PR.createNS('PR.Controllers');

(function (exports) {

    var instance = null;

    function EncounterController() {
        if (instance === null) {
            instance = this;
        } else {
            return instance;
        }
    }

    $();

    _.extend(EncounterController.prototype, {

        newEncounter: function (patientId, previousEncounterId, empiModel, repository, msc) {
            var newEncounterView = new PR.Views.NewEncounterView({
                    patientId: patientId,
                    previousEncounterId: previousEncounterId,
                    empiData: empiModel,
                    repository: repository,
                    msc: msc,
                    appointmentModel: preBookedAppt,
                    filterMedicalServices: filterCallback
                });
//            this.loadEncounterDetailedTemplates(true, function () {
//                newEncounterView.render();
//            });
            return newEncounterView;
        }

    });

    exports.EncounterController = EncounterController;
})(
        PR.Controllers
    )