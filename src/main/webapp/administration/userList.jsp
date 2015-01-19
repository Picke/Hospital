<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js"></script>
    <script src="/dependencies/bootstrap-confirmation/bootstrap.js"></script>
    <script src="/dependencies/bootstrap-confirmation/bootstrap-confirmation.js"></script>
</head>
<body>
<c:if test="${not empty username}">
    <div class="alert alert-success alert-dismissable">
        <a class="close" onclick="hideAlert()">x</a>
        User ${username} saved succesfully
    </div>
</c:if>
<div class="container">
    <div class="row pad-btm-10">
        <div class="span16"><h1 class="pull-left">users</h1></div>
    </div>
    <div class="row">
        <div class="span16">
            <div id="adminTile" class="tileLarge" style="padding-bottom: 10px">
                <div id="main">
                    <table id="users-table" class="pad-left-10">
                        <tr>
                            <th style   ="width : 120px">Username</th>
                            <th>Authorities</th>
                        <tr>
                    </table>
                    <button class="btn pad-left-10 pad-top-10" id="back-btn" onclick="cancelButtonHandler()">Back</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<div id="div-tmpl-holder">
</div>

<script type="text/javascript">
    var fillTable = function () {
        $.each(${users}, function (index, user) {
            userHTML = "<tr><td>" + user.username + "</td><td>";
            $.each(user.roles, function (index, role) {
                userHTML += role + "  ";
            });
            userHTML += "</td>";
            userHTML +=
                    "<td>" +
                            "<button class='btn btn-danger pad-left-10' style='padding: 0px 4px; font-size: 10px' " +
                            "data-toggle='confirmation'  data-placement='right'>Delete</button>" +
                            "</td></tr>";
            $('#users-table > tbody:last').append(userHTML);
            $($('#users-table > tbody:last > tr:last .btn')[0]).on('click', function () {
                $(this).confirmation({
                    animation: true,
                    onConfirm: function () {
                        deleteUser(user.username);
                        var tr = $(this).closest('tr');
                        tr.fadeOut(400, function () {
                            tr.remove();
                        });
                    }
                });
                $(this).confirmation('show');
            });
        });
    };

    var deleteUser = function (username) {
        $.post("users", {username: username});
    };

    var hideAlert = function () {
        $(".alert").slideUp("slow");
    };

    var cancelButtonHandler = function () {
        window.location.href = window.location.origin + "/administration"
    }

    fillTable();
</script>

</body>
</html>