<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
</head>
<body>
<form id="main-form" method="post" action="">
    <div class="container">
        <div class="row pad-btm-10">
            <div class="span16"><h1 class="pull-left">administration panel</h1></div>
        </div>
        <div class="row">
            <div class="span16">
                <div id="adminTile" class="tileLarge">
                    <div id="main">
                        <div class="span15">
                            <div id="divAdministrationPanel" class="row pad-top-10">
                                <div style="float:left" id="divComponents" class="span2">
                                    <label class="pull-right">Components</label>
                                </div>
                                <div style="float:left" class="span13">
                                    <div id="divAdministrationComponents" class="sub-header-big">
                                        <div id="link_create-user">
                                            <a class="componentLinks" href="create">Create User</a>
                                        </div>
                                        <div id="link_user-list">
                                            <a class="componentLinks" href="users">Users List</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<div id="div-tmpl-holder">
</div>

</body>
</html>