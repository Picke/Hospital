PR.SDS.Common = (function () {
    var self = {};

    self._loadPatientsData = function (successFn) {
        return $.get('/registration/getAllPatients', successFn);
    };

    return self;
}());
