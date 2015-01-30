var PR = PR || {};
PR.Views = {};

PR.BaseView = function () {
};
PR.BaseView.prototype = (function () {
    var prototype = new EventEmitter();
    prototype.on = prototype.addListener;
    prototype.publish = prototype.emit;
    prototype.clear = prototype.removeAllListeners;
    prototype.reinitializeEvent = function (eventName, handler) {
        return this.clear(eventName).on(eventName, handler);
    };
    return prototype;
})();

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
