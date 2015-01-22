<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js" type="text/javascript"></script>
    <script src="/dependencies/underscore/underscore.js" type="text/javascript"></script>
    <script src="/dependencies/backbone/backbone.js" type="text/javascript"></script>
    <script src="/common/js/lib/Namespaces.js" type="text/javascript"></script>
    <script src="/common/js/lib/PRCore.js" type="text/javascript"></script>

    <script src="/registration/js/repositories/NewEncounterRepository.js" type="text/javascript"></script>
    <script src="/registration/js/controllers/EncounterController.js" type="text/javascript"></script>
    <script src="/registration/js/App_Config.js" type="text/javascript"></script>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="span16">
                <div id="adminTile" class="tileLarge">
                    <button id="add-patient-btn" class="btn">Add Patient</button>
                    <h2></h2>
                    <!-- blank h2 for titles to be attached-->
                    <div id="main">
                        <!-- views go here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

<div id="div-tmpl-holder">
</div>
<script type="text/javascript">
    $('#add-patient-btn').on('click', function () {
        PR.App();
        PR.controller.navigate('#new-encounter', {trigger  : true});
    });
</script>


</body>
</body>
</html>