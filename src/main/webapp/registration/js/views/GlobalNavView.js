PR.Views.GlobalNavView = function () {

    var self = new PR.BaseView();

    self.render = function () {
        var $container = $('#headercontainer');
        var html = $.render.globalNavTemplate();
        $container.html(html);

        return self;
    };

    return self;

};