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
                "new-encounter/:patientId": "newEncounter",
                "encounter/:patientId/:encounterId/:tileCode": "enconterDeatailed",
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

            back: function (isHard) {
                if (this._history.length > 1) {
                    this.navigate('#' + this._history[this._history.length - 2].fragment, {trigger: isHard});
                } else {
                    window.history.back();
                }
            },

            home: function () {
                homePageCtrl.loadHomePageTemplates($.proxy(function () {
                    var repo = PR.Repositories.HomePageRepository();
                    var homePageView = homePageCtrl.homePageView(repo);
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

            encounterDetailed: function (patientId, encounterId, tileCode) {
                if (this._currentRouteHandler != 'encounterDetailed') {
                    this._preDestroyCurrentView();
                    // this is temp solution for PL-51239(150 Mb memory leak with each opening of LT page); should be removed after fixing all memory leaks there

                    encounterCtrl.loadEncounterDetailedTemplates($.proxy(function() {
                        this.encounterDetailedView = encounterCtrl.encounterDetailed(patientId, encounterId, tileCode);
                        this._routeChanged({view: this.encounterDetailedView, routeHandler: 'encounterDetailed'});
                    }, this));
                } else if (this.encounterDetailedView && this.encounterDetailedView.getCurrentTileKey() !== tileCode) {
                    this.encounterDetailedView.switchTile(tileCode);
                }
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