<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js"></script>
</head>
<body>
<div class="container">
    <div class="row pad-btm-10">
        <div class="span16"><h1 class="pull-left">users</h1></div>
    </div>
    <div class="row">
        <div class="span16">
            <div id="adminTile" class="tileLarge">
                <div id="main">
                    <table id="users-table" class="pad-left-10 pad-btm-30">
                        <tr>
                            <th style="width : 140px">Username</th>
                            <th>Authorities</th>
                        <tr>
                    </table>
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
                            "<button class='btn btn-warning pad-left-10' style='padding: 0px 4px; font-size: 10px'>Delete</button>" +
                            "</td></tr>";
            $('#users-table > tbody:last').append(userHTML);
            $($('#users-table > tbody:last > tr:last .btn')[0]).on('click', function () {
                deleteUser(user.username);
                var tr = $(this).closest('tr');
                tr.fadeOut(400, function(){
                    tr.remove();
                });
            });
        });
    };

    var deleteUser = function (username) {
        $.post("users", {username : username});
    }

    fillTable();
</script>

</body>
</html>