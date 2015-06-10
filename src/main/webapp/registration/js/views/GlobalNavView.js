PR.Views.GlobalNavView = function () {

    var self = new PR.BaseView();

    self.render = function () {
        var $container = $('#headercontainer');
        var contextPath = ''
        if (window.location.pathname.split('/').length > 3) {
            contextPath = window.location.pathname.split('/')[1]
        }
        var html = $.render.globalNavTemplate({contextPath: contextPath});
        $container.html(html);

        return self;
    };

    return self;

};