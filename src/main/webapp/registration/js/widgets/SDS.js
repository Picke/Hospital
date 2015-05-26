PR.SDS = (function () {
    var self = {};

    self._saveEncounter = function (data, successFn) {
        return $.ajax({
            type: 'POST',
            url: '/registration/patient/' + data.patientId + '/save',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data.model.toJSON()),
            success: successFn
        });
    }

    return self;

}());