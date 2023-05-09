<%@ page import="domain.Movie" %>
<%@ page import="java.util.List" %><%--
  Created by IntelliJ IDEA.
  User:
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>
<html>
<head>
    <title>Movie</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="font/iconfont.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
</head>
<body class="bg-white">
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<%
    List<Movie> movies = (List<Movie>) request.getAttribute("collects");
    int length = (int) Math.ceil(movies.size() / 5.0);
%>


<div class="container-fluid p-0" style="">
    <jsp:include page="userHeader.jsp"/>
    <div class="container">
        <%
            for (int i = 0; i < length; i++) {
            request.setAttribute("i", i);

        %>
        <div class="row">
            <div class="card-deck">
                <c:forEach var="m" items="${collects}" varStatus="status">
                    <c:if test="${ (status.index < (i + 1) * 5) && (status.index >= i * 5)}">
                        <div class="card mt-3"  style="max-width: 200px; max-height: 450px">
                            <img src="${m.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${m.name}</h5>
                            </div>
                        </div>
                    </c:if>
                </c:forEach>
            </div>
        </div>
        <%
            }
        %>

    </div>
</div>
</body>
</html>
