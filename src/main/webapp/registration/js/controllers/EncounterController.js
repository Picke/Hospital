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

    _.extend(EncounterController.prototype, {

        medicalServiceCodeView: function(patientId, onNextBtnClick, parentView) {
            var medicalServiceCodeView = new PR.Views.MedicalServiceCodeView({
                patientId: patientId,
                onNextBtnClick: onNextBtnClick,
                parentView: parentView
            });
            return medicalServiceCodeView;
        },

        newEncounter: function (patientId, repository, msc) {
            var newEncounterView = new PR.Views.NewEncounterView({
                    patientId: patientId,
                    repository: repository,
                    msc: msc
                });

            newEncounterView.render();

            return newEncounterView;
        },

        editEncounter: function (patientId, encounterId, repository) {
            var editEncounterView = new PR.Views.EditEncounterView({
                patientId: patientId,
                encounterId: encounterId,
                repository: repository
            });

            editEncounterView.render();

            return editEncounterView;
        },

        loadEncounterDetailedTemplates: function(callback) {
            var templates = PR.require.moduleTemplates.encounter;

            PR.registerJSRenderTemplates(templates, callback);
        }

    });

    exports.EncounterController = EncounterController;
})(
        PR.Controllers
    )