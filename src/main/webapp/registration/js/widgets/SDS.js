PR.SDS = (function () {
    var self = {};

    var prefixURL = window.location.pathname;

    self._saveEncounter = function (data, successFn) {
        var url = data.patientId ? prefixURL + 'patient/' + data.patientId + '/save' : prefixURL + 'patient/save'
        return $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data.model.toJSON()),
            success: successFn
        });
    };

    self._updateEncounter = function (data, successFn) {
        return $.ajax({
            type: 'POST',
            url: prefixURL + 'patient/' + data.patientId + '/encounter/' + data.encounterId + '/update',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data.model.toJSON()),
            success: successFn
        });
    }

    return self;

}());