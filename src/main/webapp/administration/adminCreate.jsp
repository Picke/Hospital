<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js"></script>
</head>
<body>
<div id="validation-alert" style="display: none" class="alert alert-danger alert-dismissable">
    <a class="close" onclick="hideAlert()">x</a>
    Please fill all required fields
</div>
<c:if test="${not empty username}">
    <div class="alert alert-success alert-dismissable">
        <a class="close" onclick="hideAlert()">x</a>
        User ${username} saved succesfully
    </div>
</c:if>
<form:form id="create-user-form" method="POST" action="/administration/create" modelAttribute="user">
    <div class="container">
        <div class="row pad-btm-10">
            <div class="span16"><h1 class="pull-left">administration panel</h1></div>
        </div>
        <div class="row">
            <div class="span16">
                <div id="adminTile" class="tileLarge">

                    <h3 class="pad-left-10">user creation</h3>

                    <div class="span15 row">
                        <div id="divRegistrationLabelComponents" class="pad-top-10">
                            <div class="control-group">
                                <label class="control-label" id="username-label">
                                    <span class="validation-required-prefix">*</span>
                                    Username
                                </label>

                                <div class="controls">
                                    <form:input cssClass="span5" id="username" maxlength="10" path="username" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" id="password-label">
                                    <span class="validation-required-prefix">*</span>
                                    Password
                                </label>

                                <div class="controls">
                                    <form:input cssClass="span5" id="password" title=""
                                           maxlength="10"  path="password"/>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" id="repeat-password-label">
                                    <span class="validation-required-prefix">*</span>
                                    Repeat password
                                </label>

                                <div class="controls">
                                    <input type="text" class="span5" id="repeat-password"
                                           maxlength="10">
                                </div>
                            </div>
                            <div class="control-group pad-btm-30">
                                <label class="control-label" id="roles-label">
                                    <span class="validation-required-prefix">*</span>
                                    Roles
                                </label>

                                <div class="controls">
                                    <input type="text" class="span5" id="roles"
                                           maxlength="10">
                                </div>
                            </div>
                            <div class="control-group ">
                                <button class="btn btn-primary" type="button" id="create-btn">Create</button>

                                <button class="btn" name="cancel-btn" id="cancel" type="button"
                                        onclick="cancelButtonHandler()">Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form:form>

<div id="div-tmpl-holder">
</div>

</body>
</html>

<script type="text/javascript">
    var init = function() {
        $("#username").val("");
        $("#password").val("");
        $("#repeat-password").val("");
        $("#roles").val("");
    }

    var cancelButtonHandler = function () {
        window.location.href = window.location.origin + "/administration"
    }

    $("#create-btn").on("click", function () {
        if ($("#username").val() == "" || $("#password").val() == "" || $("#repeat-password").val() == "" ||
                $("#roles").val() == "") {
            $("#validation-alert").show();
        } else {
            $("#validation-alert").hide();
            $("#create-user-form").submit();
        }
    })

    var hideAlert = function () {
            $(".alert").slideUp("slow");
    }

    init();
</script>