<%--
  Created by IntelliJ IDEA.
  User: bbodey
  Date: 1/20/15
  Time: 4:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <script src="../dependencies/jquery/jquery-latest.js"></script>
</head>
<body>
<div class="row pad-btm-10">
    <a class="pull-right pad-top-10" id="logout" href="/j_spring_security_logout">Logout</a>

    <div class="span16"><h1 class="pull-left">administration panel</h1></div>
</div>
</body>

<script type="text/javascript">
    var includeContextPath = function () {
        $('#logout').attr('href','<%=request.getContextPath()%>' + $('#logout').attr('href'));
    };

    includeContextPath();
</script>

</html>