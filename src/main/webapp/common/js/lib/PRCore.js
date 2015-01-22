var PR = PR || {};
PR.Views = {};

PR.Views.BaseView = function () {
};

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
