<%@  taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en">
<head>
    <title>HOSPITAL</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link href="/resources/common/bootstrap/css/custom-bootstrap.css" rel="stylesheet" type="text/css">
    <script src="/dependencies/jquery/jquery-latest.js"></script>

    <style type="text/css">
        html {
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizelegibility;
        }

        .content {
            width: 250px;
            margin: 100px auto 20px auto;
            padding: 30px 30px 20px 30px;
            background: #fff;

            border-radius: 3px;

            -webkit-box-shadow: 0px -2px 0px #b7b7b7 inset;
            -moz-box-shadow: 0px -2px 0px #b7b7b7 inset;
            -o-box-shadow: 0px -2px 0px #b7b7b7 inset;
            -ms-box-shadow: 0px -2px 0px #b7b7b7 inset;
            box-shadow: 0px -2px 0px #b7b7b7 inset;
        }

        #logo {
            text-indent: -10000em;
            width: 200px;
            height: 227px;
            background: url(/resources/common/bootstrap/img/hospital-logo.png) no-repeat;
            margin: 0;
        }

        li label, input[type="text"], input[type="password"], select {
            width: 200px;
            height: 30px;
            color: black;
        }

        input[type="text"], input[type="password"] {
            border: 1px solid #cccccc;
        }

        #username {
            margin-bottom: 0px;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        ul li {
            margin: 0 0 5px 0;
            position: relative;
        }

        li label {
            position: absolute;
            top: 2px;
            left: 4px;
            text-align: left;
        }

        .error {
            color: red;
        }

        .error-border {
            border-color: #b94a48 !important;
        }

        sup {
            vertical-align: super;
            font-size: .7em;
        }

        #copyright {
            margin: 20px auto 0px;
            padding: 0 0px;
            width: 250px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        #copyright, #copyright a {
            color: #888;
            font-size: 11px;
        }

        #logoutheader {
            /*float: right;*/
            margin-right: 20px;
            margin-top: 10px;
            display: none;
            position: absolute;
            top: 0;
            right: 0;
        }

        #logout {
            margin: 0 0 0 0;
            padding: 4px 0 0 0;
            cursor: pointer;
            float: left;
            font-size: 13px;
        }

    </style>
</head>

<body>

<div class="content">
    <div id="logoutheader" class="btn-group">
        <a href="/j_spring_security_logout" id="logout">Log Out</a>
    </div>
    <div id="logo">&nbsp;</div>
    <form action="/j_spring_security_check" method='POST' id="logonForm" name="logonForm">
        <div id="logoninfo_section">
            <ul>
                <li><input type="text" id="username" name="username" autofocus placeholder="username"/></li>
                <li><input class="pad-top-5" type="password" id="password" name="password" placeholder="password"/></li>
                <c:if test="${not empty error}">
                    <li><div class="error">${error}</div></li>
                </c:if>
                <c:if test="${not empty msg}">
                    <li><div class="msg">${msg}</div></li>
                </c:if>
                <li>
                    <button class="btn btn-primary pad-top-5" name="submit"  id="login">Log In</button>
                </li>
            </ul>
        </div>
    </form>
        <div id="roles_section" style="display: none;">
            <ul>
                <li style="margin-top: -1px;"><select class="pad-btm-5" id="userRoles"></select></li>
                <li>
                    <button class="btn btn-primary" name="loadpage" id="loadpage" onclick="navigate()">Go</button>
                </li>
            </ul>
        </div>
    <div id="error" class="error"></div>
</div>

</body>

<c:if test="${not empty roles}">
<script type="text/javascript">
    var init = function () {
        $("#logoninfo_section").hide();
        $("#roles_section").show();
        $('#logonForm').removeAttr("action");
        $('#logonForm').removeAttr("method");
        $("#logoutheader").show();
        $.each(${roles}, function(index, role) {
            $("#userRoles").append("<option value=" + role.authority + ">" + role.authority + "</option>");
        });
    };

    var navigate = function () {
        var path = $('#userRoles').val() == "Admin" ? "/administration" : "/registration";
        window.location.href = window.location.origin + path
    };

    init();
</script>
</c:if>
</html>