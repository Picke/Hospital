<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Hospital</title>
    <link href="/resources/admin/bootstrap/css/custom-admin.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="container">
    <%@ include file="adminHeader.jsp" %>
    <div class="row">
        <div class="span14">
            <div id="adminTile" class="tileLarge">
                <div id="main" style="margin-left: 0px">
                    <div class="span15">
                        <div id="divAdministrationPanel" class="row pad-top-10">
                            <div style="float:left" id="divComponents" class="span2">
                                <label class="pull-right">Components:</label>
                            </div>
                            <div style="float:left" class="span13">
                                <div id="divAdministrationComponents" class="sub-header-big">
                                    <div id="link_create-user">
                                        <a class="componentLinks" href="create">Create User</a>
                                    </div>
                                    <div id="link_user-list">
                                        <a class="componentLinks" href="users">User List</a>
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

<div id="div-tmpl-holder">
</div>

</body>
</html>