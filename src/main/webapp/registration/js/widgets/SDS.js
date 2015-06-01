PR.SDS = (function () {
    var self = {};

    self._saveEncounter = function (data, successFn) {
        var url = data.patientId ? '/registration/patient/' + data.patientId + '/save' : '/registration/patient/save'
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
            url: '/registration/patient/' + data.patientId + '/encounter/' + data.encounterId + '/update',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data.model.toJSON()),
            success: successFn
        });
    }

    return self;

}());