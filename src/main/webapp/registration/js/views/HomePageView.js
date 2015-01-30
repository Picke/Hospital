PR.Views.HomePageView = PR.Views.BaseView.extend({

    repository: null,
    eventsPublisher: PR.BaseView.prototype,

    _selectors: {
        createPatientButton: "#create-patient-button",
        patientList: "#patient-list",
        patientSearch: "#patient-search"
    },

    initialize: function (repo) {
        this._repository = repo;
        this._build();
    },

    _build: function () {
        var html = $.render.homePageTemplate();
        this.setHtml(html);
    },

    _postRender: function () {
        this._addListeners();
    },

    _addListeners: function () {
        $(this._selectors.createPatientButton).on("click", function () {
            PR.controller.navigate("#new-encounter", {trigger: true});
        });
        this.eventsPublisher.on('dataReady', $.proxy(function () {
            this._buildPatientList();
        }, this));
        $(this._selectors.patientSearch).on('keyup', this._patientSearch)
    },

    _buildPatientList: function () {
        var patientListEl = this._selectors.patientList;
        var html = "";
        $.each(this._repository._getPatientsData(), function (index, encounter) {
            html += "<div class='row pad-top-20'>" +
                "<a href ='#encounter/" + encounter.patientId + "/" + encounter.encounterId + "/PD' style='display:inline-block' >" +
                "<div class='row'><h2>" + encounter.patientName + "</h2></div>" +
                "<div class='row'> <div style='display: inline-block' class='patient-list-data'>PCN: " + encounter.patientId + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>ERN: " + encounter.encounterId + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>DOB: " + encounter.patientDob + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Phone: " + encounter.patientPhone + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Service: " + "Outpatient" + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Registered: " + encounter.registrationDate + "</div>" +
                "</div></a></div>"

            $(patientListEl).html(html);
        });
    },

    _patientSearch: function () {
        var el = $(this);
        $("h2").each(function () {
            $(this).closest('.pad-top-20').show();
            if ($(this).text().indexOf(el.val()) == -1) {
                $(this).closest('.pad-top-20').hide();
            }
        })
    }

});