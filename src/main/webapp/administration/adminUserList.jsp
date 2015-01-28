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
<div class="container">
    <%@ include file="adminHeader.jsp" %>
    <div class="row">
        <div class="span14">
            <div id="adminTile" class="tileLarge" style="padding-bottom: 10px">
                <div id="main" style="margin-left: 0px">
                    <table id="users-table" class="pad-left-10">
                        <tr>
                            <th style   ="width : 120px">Username</th>
                            <th>Authorities</th>
                            <th>&nbsp</th>
                        <tr>
                    </table>
                    <button class="btn pad-left-10 pad-top-10" id="back-btn" onclick="cancelButtonHandler()">Cancel</button>
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
                            "<button class='btn btn-danger pad-left-10' style='padding: 0px 4px; font-size: 10px; height: 20px' " +
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
            });
            $($('#users-table > tbody:last > tr:last .btn')[0]).trigger('click');
        });
    };

    var deleteUser = function (username) {
        $.post("users", {username: username});
    };

    var cancelButtonHandler = function () {
        window.location.href = window.location.origin + "/administration"
    }

    fillTable();
</script>

</body>
</html>