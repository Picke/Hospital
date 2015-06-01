PR.Views.HomePageView = PR.Views.BaseView.extend({

    _repository: null,
    eventsPublisher: PR.BaseView.prototype,

    _selectors: {
        createPatientButton: "#create-patient-button",
        addEncounterButton: '.js-add-encounter',
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
            $(this._selectors.addEncounterButton).on("click", function (e) {
                e.preventDefault();
                var patientId = $(this).closest('.pad-top-20').data('patientid');
                PR.controller.navigate("#new-encounter/"+ patientId, {trigger: true});
            });
        }, this));
        $(this._selectors.patientSearch).on('keyup', this._patientSearch)
    },

    _buildPatientList: function () {
        var patientListEl = this._selectors.patientList;
        var html = "";
        $.each(this._repository._getPatientsData(), function (index, encounter) {
            var dob = encounter.patientDob ? encounter.patientDob : 'unknown';
            html += "<div class='row pad-top-20' data-encounterid=" + encounter.encounterId + " data-patientid=" + encounter.patientId + ">" +
                "<a href ='#encounter/" + encounter.patientId + "/" + encounter.encounterId + "' style='display:inline-block;width: 800px' >" +
                "<div class='row'><h2 class='js-patient-name' style='display:inline-block'>" + encounter.patientName + "</h2><button class='btn pull-right pad-top-10 js-add-encounter'>Add encounter</button></div>" +
                "<div class='row'> <div style='display: inline-block' class='patient-list-data'>PCN: " + encounter.patientId + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>ERN: " + encounter.encounterId + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>DOB: " + dob + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Phone: " + encounter.patientPhone + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Service: " + "Outpatient" + "</div>" +
                "<div style='display: inline-block' class='patient-list-data'>Registered: " + encounter.registrationDate + "</div>" +
                "</div></a></div>"

            $(patientListEl).html(html);
            $(patientListEl).hide().fadeIn('slow');
        });
    },

    _patientSearch: function () {
        var el = $(this);
        $(".js-patient-name").each(function () {
            var encounterId = $(this).closest('.pad-top-20').data('encounterid').toString();
            var patientId = $(this).closest('.pad-top-20').data('patientid').toString();
            $(this).closest('.pad-top-20').show();
            if (($(this).text().indexOf(el.val()) == -1) &&
                (encounterId.indexOf(el.val()) == -1) &&
                (patientId.indexOf(el.val()) == -1)) {
                    $(this).closest('.pad-top-20').hide();
            }
        })
    }



});