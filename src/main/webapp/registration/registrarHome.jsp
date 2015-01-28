<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/registration/bootstrap/css/custom-registration.css" rel="stylesheet" type="text/css">

    <script src="/dependencies/jquery/jquery-latest.js" type="text/javascript"></script>
    <script src="/dependencies/underscore/underscore.js" type="text/javascript"></script>
    <script src="/dependencies/backbone/backbone.js" type="text/javascript"></script>
    <script src="/dependencies/jsRender/jsrender.js" type="text/javascript"></script>

    <script src="/common/js/lib/Namespaces.js" type="text/javascript"></script>
    <script src="/common/js/lib/PRCore.js" type="text/javascript"></script>
    <script src="/common/js/lib/PRCore.Utils.js" type="text/javascript"></script>
    <script src="/common/js/lib/PRCore.Ajax.js" type="text/javascript"></script>
    <script src="/common/js/lib/PRCore.Templates.js" type="text/javascript"></script>

    <script src="/registration/js/views/BaseView.js" type="text/javascript"></script>
    <script src="/registration/js/views/HomePageView.js" type="text/javascript"></script>
    <script src="/registration/js/views/GlobalNavView.js" type="text/javascript"></script>
    <script src="/registration/js/views/NewEncounterView.js" type="text/javascript"></script>

    <script src="/registration/js/widgets/SDSCommon.js" type="text/javascript"></script>

    <script src="/registration/require.templates.js" type="text/javascript"></script>

    <script src="/registration/js/repositories/HomePageRepository.js" type="text/javascript"></script>
    <script src="/registration/js/repositories/NewEncounterRepository.js" type="text/javascript"></script>
    <script src="/registration/js/controllers/HomePageController.js" type="text/javascript"></script>
    <script src="/registration/js/controllers/EncounterController.js" type="text/javascript"></script>
    <script src="/registration/js/App_Config.js" type="text/javascript"></script>

</head>
<body>
<div id="container" class="container">
    <div class="row">
        <div id="ErrorBar"></div>
    </div>
    <div id="headercontainer" class="row pad-btm-10"></div>
    <div id="toolbar" class="row pad-btm-10"></div>
    <div id="main" class="pad-btm-10 row">
        <!-- screen views go here -->
    </div>
    <div id="applets">
    </div>
</div>

<script type="text/javascript">
    PR.App();
    $('#add-patient-btn').on('click', function () {
        PR.controller.navigate('#new-encounter', {trigger: true});
    });
</script>


</body>
</html>