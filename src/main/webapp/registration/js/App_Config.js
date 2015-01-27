PR.createNS('PR.Views');
PR.createNS('PR.Models');
PR.createNS('PR.Collections');

PR.App = function () {
    var errorBar,

        encounterCtrl = new PR.Controllers.EncounterController(),
        homePageCtrl = new PR.Controllers.HomePageController(),

        PRController = Backbone.Router.extend({
            _currentView: null,
            _currentRouteHandler: '',
            _connexSentAfterEncounterCreation: false,
            _history: [],

            routes: {
                "new-encounter": "newEncounter",
                "patients": "patientList",
                "*path": "home",
                "*path/:tab": "home"
            },

            initialize: function () {
                $.when(this._initViews())
                    .done($.proxy(function () {
                        this._renderHeaderBar(),
//                this._attachGlobalHandlers();
                        this._attachEvents()
//                Temporary fix by setTimeout
//                setTimeout(function () {
//                    _errorBar = HMS.Controls.ErrorBar();
//                    _errorBar.render();
//                }, 100);
                    }, this));
            },

            _initViews: function () {
                return PR.registerJSRenderTemplates(PR.require.moduleTemplates.global);
            },

            _renderHeaderBar: function () {
                var globalNavView = new PR.Views.GlobalNavView();
                globalNavView.render();
            },

            _attachEvents: function () {
                this.listenTo(this, 'route', function (name, args) {
                    this._history.push({
                        name: name,
                        args: args,
                        fragment: Backbone.history.fragment
                    });
                });
            },

            back: function (isHard) {
                if (this._history.length > 1) {
                    this.navigate('#' + this._history[this._history.length - 2].fragment, {trigger: isHard});
                } else {
                    window.history.back();
                }
            },

            home: function (tab) {
                homePageCtrl.loadHomePageTemplates($.proxy(function () {
                    var homePageView = homePageCtrl.homePageView();
                    this._preDestroyCurrentView();
                    homePageView.render();
                    this._routeChanged({view: homePageView, routeHandler: "patientList"});

                }, this));

            },

            newEncounter: function (patientId, previousEncounterId) {
                encounterCtrl.loadEncounterDetailedTemplates($.proxy(function () {
                    var repo = PR.Repositories.NewEncounterRepository();

                    var newEncounterView = encounterCtrl.newEncounter();
                    this._preDestroyCurrentView();
                    newEncounterView.render();
                    this._routeChanged({view: newEncounterView, routeHandler: "newEncounter"});

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
//                homePageView.closeSubViewsPopups();
//                var medicalServiceView = encounterCtrl.medicalServiceCodeView(patientId, previousEncounterId, onNextBtnClick, this._currentView);
//                this._routeChanged({view: medicalServiceView, routeHandler: 'newEncounter'}); // we need the view (to remove it), for case when used browser back from MedicalServiceCodeView
//                medicalServiceView.render();
                }, this));

            },

            _routeChanged: function (e) {
//                this._clearHeader();
//                this._unlockModalUI(e.view);
                this._currentRouteHandler = e.routeHandler;
                this._currentView = e.view;
            },

            _preDestroyCurrentView: function () {
                if (this._currentView && this._currentView.preDestroy) {
                    this._currentView.preDestroy();
                }
            }
        });
    PR.controller = new PRController();
    Backbone.history.start();
}