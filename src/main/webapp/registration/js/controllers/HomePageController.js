PR.createNS('PR.Controllers');

(function (exports) {

    var instance = null;
    var homePageView = null;

    function HomePageController() {
        if (instance === null) {
            instance = this;
        } else {
            return instance;
        }
    }

    _.extend(HomePageController.prototype, {
        homePageView: function() {
            if (!homePageView) {
                homePageView = new PR.Views.HomePageView();
            }
            return homePageView;
        },

        loadHomePageTemplates: function(callback) {
            PR.registerJSRenderTemplates(PR.require.moduleTemplates.homePage, callback);
        }
    });

    exports.HomePageController = HomePageController;

})(
        /* exports */
        PR.Controllers
    );
