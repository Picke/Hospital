PR.Utils = (function () {
    var self = {};
    //public

    self.getQueryParam = function (name) {
        var results = window.location.href.match("[\\?&]" + name + "=([^&#/]*)");
        if (!results){
            return "";
        }else {
            return results[1];
        }
    };

    self.setQueryParam = function (url, name, value) {
        var re = new RegExp("([?|&])" + name + "=.*?(&|$)", "i"),
            seperator = url.split("#")[1].indexOf('?') !== -1 ? "&" : "?";
        if (url.match(re)) {
            return url.replace(re, '$1' + name + "=" + encodeURIComponent(value) + '$2');
        } else {
            return url + seperator + name + "=" + value;
        }
    };

    self.setFacility = function (facility) {
        var url = window.location.href,
            re = new RegExp("([?|&])" + "facility=.*?(&|$)", "i");

        if (url.match(re)) {
            //when you change the facility you have to go back to the patient list for that facility
            url = url.replace(re, '$1' + "facility=" + encodeURIComponent(facility)) + "/#/";
            url = url.replace("cpoe", "ce");
            window.location = url;
        }
    };

    self.getTimezone = function() {
        return HMS.Storage.get("timezone");
    };

    self.setTimezone = function(timezone) {
        HMS.Storage.set("timezone", timezone);
    };

    self.dateDiff = function (earlierDate, laterDate) {
        var nTotalDiff = laterDate.getTime() - earlierDate.getTime(),
            oDiff = {};

        oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
        nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

        oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
        nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

        oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
        nTotalDiff -= oDiff.minutes * 1000 * 60;

        oDiff.seconds = Math.floor(nTotalDiff / 1000);

        return oDiff;
    };

    self.portNumber = function () {
        var url = window.location.href,
            url_parts = url.split('/'),
            domain_name_parts = url_parts[2].split(':'),
            port_number = domain_name_parts[1];
        return port_number || 80;
    };

    self.domainName = function () {
        var url = window.location.href,
            url_parts = url.split('/'),
            domain_name_parts = url_parts[2].split(':'),
            domain_name = domain_name_parts[0];
        return domain_name;

    };

    self.formToJSON = function (selector) {
        var form = {};
        $(selector).find(':input[name]:enabled').each(function () {
            var self = $(this),
                name = self.attr('name');

            if (form[name]) {
                form[name] = form[name] + ',' + self.val();
            }
            else {
                form[name] = self.val();
            }
        });
        return form;
    };

    self.roundUp = function (val) {
        if (val && typeof val === "number") {
            if (val % 1 > 0) {
                return parseInt(val, 10) + 1;
            }
        }
        return parseInt(val, 10);
    };

    self.parseJSON = function(json) {
        return JSON.parse(json, function(key, value) {
            return Datezone.tryParseStringDatezone(value);
        });
    };

    self.createSelectOptions = function (data, keyName, valName) {
        var opts = [];
        $.each(data, function (key, val) {
            opts.push("<option value=" + val[keyName] + ">" + val[valName] + "</option>");
        });
        return opts;
    };

    /**
     *   @deprecated
     */
    self.formatDate = function (date) {
        var returnDate = date,
            chkMonth, month, day;

        if (date && date.getMonth) {

            chkMonth = date.getMonth() + 1;
            month = (chkMonth < 10 ? "0" : "") + chkMonth;
            day = (date.getDate() < 10 ? "0" : "") + date.getDate();

            returnDate = date.getFullYear() + "-" + month + "-" + day;
            //equivalent to HMS.Utils.HMSDatePickerFormat
        }

        return returnDate;
    };

    /**
     *   @deprecated
     */
    self.formatDateTime = function (date) {
        var returnDate = date,
            dateStr, hours, minutes;

        if (date && date.getMonth) {
            dateStr = self.formatDate(date);
            hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
            minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            returnDate = dateStr +  " " + hours + ":" + minutes;
        }

        return returnDate;
    };

    /// <summary>Error handler function.</summary>
    /// <param name="errors">Collection of errors.</param>
    self.onError = function (errorData) {
        var errorText = 'SERVER ERROR: \r\n\r\n', response = $.parseJSON(errorData.responseText);

        _.each(response.errors, function (error) {
            errorText += error + '\r\n \r\n';
        });

        alert(errorText);
    };

    self.getDefaultViewName = function () {
        var user = HMS.Storage.get("user");
        return user.selectedPersona.defaultView;
    };
    return self;
}());