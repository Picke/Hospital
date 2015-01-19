<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js"></script>
</head>
<body>
<form id="main-form" method="post" action="">
    <div class="container">
        <div class="row pad-btm-10">
            <div class="span16"><h1 class="pull-left">users</h1></div>
        </div>
        <div class="row">
            <div class="span16">
                <div id="adminTile" class="tileLarge">
                    <div id="main">
                        <table id="users-table">
                            <tr>
                                <th>Username</th>
                                <th>Authorities</th>
                            <tr>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<div id="div-tmpl-holder">
</div>

<script type="text/javascript">
    var fillTable = function () {
        $.each(${users}, function(index, user) {
            userHTML = "<tr><td>" + user.username + "</td><td>";
            $.each(user.roles, function (index, role) {
                userHTML += role + "  ";
            });
            userHTML += "</td></tr>";
            $('#users-table > tbody:last').append(userHTML);
        });
    };

    fillTable();
</script>

</body>
</html>