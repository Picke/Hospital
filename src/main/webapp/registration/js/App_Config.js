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
            _history: [],

            routes: {
                "new-encounter": "newEncounter",
                "new-encounter/:patientId": "newEncounter",
                "encounter/:patientId/:encounterId/:tileCode": "editEncounter",
                "*path": "home",
                "*path/:tab": "home"
            },

            initialize: function () {
                $.when(this._initViews())
                    .done($.proxy(function () {
                        this._renderHeaderBar(),
                        this._attachEvents()
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

            home: function () {
                homePageCtrl.loadHomePageTemplates($.proxy(function () {
                    var repo = PR.Repositories.HomePageRepository();
                    var homePageView = homePageCtrl.homePageView(repo);
                    repo._loadAllData();
                    this._preDestroyCurrentView();
                    homePageView.render();
                    this._routeChanged({view: homePageView, routeHandler: "patientList"});
                    this.navigate('#patientList');
                }, this));

            },

            newEncounter: function (patientId) {
                encounterCtrl.loadEncounterDetailedTemplates($.proxy(function () {
                    var repo = PR.Repositories.NewEncounterRepository();

                    var onNextBtnClick = $.proxy(function (msc) {
                        var newEncounterView = encounterCtrl.newEncounter(
                            patientId,
                            repo,
                            msc);
                        patientId && repo._loadPatientData(patientId);
                        this._preDestroyCurrentView();
                        this._routeChanged({view: newEncounterView, routeHandler: 'newEncounter'});
                    }, this);
                    var medicalServiceView = encounterCtrl.medicalServiceCodeView(patientId, onNextBtnClick, this._currentView);
                    this._routeChanged({view: medicalServiceView, routeHandler: 'newEncounter'}); // we need the view (to remove it), for case when used browser back from MedicalServiceCodeView
                    medicalServiceView.render();
                }, this));

            },

            editEncounter: function (patientId, encounterId) {
                encounterCtrl.loadEncounterDetailedTemplates($.proxy(function () {
                    var repo = PR.Repositories.EditEncounterRepository();
                    repo._loadEncounterData(patientId, encounterId);
                    var editEncounterView = encounterCtrl.editEncounter(
                        patientId,
                        encounterId,
                        repo);

                    this._preDestroyCurrentView();
                    this._routeChanged({view: editEncounterView, routeHandler: 'editEncounter'});
                }, this));
            },

            _routeChanged: function (e) {
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