PR.createNS('PR.Views');
PR.createNS('PR.Models');
PR.createNS('PR.Collections');

PR.App = function () {
    var errorBar,

        encounterCtrl = new PR.Controllers.EncounterController(),

        PRController = Backbone.Router.extend({
            _currentView: null,
            _currentRouteHandler: '',
            _connexSentAfterEncounterCreation: false,
            _history: [],

            routes: {
                "new-encounter": "newEncounter",
                "patients": "patientList"
            },

            initialize: function () {
                this._initViews();
//                _renderHeaderBar();
//                this._attachGlobalHandlers();
                this._attachEvents();
//                Temporary fix by setTimeout
//                setTimeout(function () {
//                    _errorBar = HMS.Controls.ErrorBar();
//                    _errorBar.render();
//                }, 100);
            },

            _initViews: function () {

            },

            _attachEvents: function() {
                this.listenTo(this, 'route', function (name, args) {
                    this._history.push({
                        name : name,
                        args : args,
                        fragment : Backbone.history.fragment
                    });
                });
            },

            back: function(isHard) {
                if (this._history.length > 1) {
                    this.navigate('#' + this._history[this._history.length - 2].fragment, {trigger: isHard});
                } else {
                    window.history.back();
                }
            },

            newEncounter: function (patientId, previousEncounterId) {
                var repo = PR.Repositories.NewEncounterRepository();

                var onNextBtnClick = $.proxy(function (msc) {
                    var newEncounterView = encounterCtrl.newEncounter(
                        patientId,
                        previousEncounterId,
                        homePageView.getSubview('registration').getEmpiSearchPatientListView().getSelectedEmpiModel(),
                        repo,
                        msc);
                    this._preDestroyCurrentView();
                    this._routeChanged({view: newEncounterView, routeHandler: 'newEncounter'});
                }, this);
                homePageView.closeSubViewsPopups();
                var medicalServiceView = encounterCtrl.medicalServiceCodeView(patientId, previousEncounterId, onNextBtnClick, this._currentView);
                this._routeChanged({view: medicalServiceView, routeHandler: 'newEncounter'}); // we need the view (to remove it), for case when used browser back from MedicalServiceCodeView
                medicalServiceView.render();
            }
        });
    PR.controller = new PRController();
    Backbone.history.start();
}