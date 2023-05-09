<%@page import="domain.User" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<div class="container-fluid bg-dark">
    <header class="ml-5">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="${pageContext.request.contextPath}/main.do">
                <img src="images/movie.png" alt="" style="height: auto; width: 40px;">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                </ul>


                <form class="form-inline mt-2 mt-md-0 mr-3" action="${pageContext.request.contextPath}/search.do"
                      method="get">
                    <input class="form-control mr-sm-2" type="text" name="search" placeholder="电影名" value=""
                           aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><span
                            class="iconfont iconsousuo"></span></button>
                </form>


                <ul class="navbar-nav mr-4">
                    <li class="nav-item dropdown" >
                        <%
                            User user = (User) session.getAttribute("user");
                            if (user != null) {
                        %>
                        <c:if test="${user.username == \"admin\"}">
                            <a href="movieManagement" onclick="jump()" style="color: rgba(255,255,255,.5)">
                                    ${user.username }
                            </a>
                        </c:if>
                        <c:if test="${user.username != \"admin\"}">
                            <a class="nav-link dropdown-toggle" href=""
                               id="navbardrop" data-toggle="dropdown" style="color: rgba(255,255,255,.5)">
                                    ${user.username }
                            </a>
                        </c:if>
                        <%
                        } else {
                        %>
                        <a href="${pageContext.request.contextPath}/loginOrRegister.do" id="navbardrop" style="color: rgba(255,255,255,.5)">我的账户</a>
                        <%
                            }
                        %>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="${pageContext.request.contextPath}/userInfo">修改账户</a>
                            <div class="dropdown-divider"></div>
                            <%
                                if (user != null) {
                            %>
                            <a class="dropdown-item" href="${pageContext.request.contextPath}/logout.do">退出</a>
                            <%
                            } else {
                            %>
                            <a class="dropdown-item" href="${pageContext.request.contextPath}/login.do">登录</a>
                            <%
                                }
                            %>
                        </div>
                    </li>
                </ul>
                <script>
                    function jump() {
                        window.location.href="http://localhost:8080/MovieWebsite/management/index.jsp";
                    }
                </script>
            </div>
        </nav>
    </header>

    <!-- 结束 -->
</div>

<script>
    var url = decodeURI(window.location.search);
    var type = url.substring(url.lastIndexOf("=") + 1);
    $(".navbar-nav").children().each(function () {
        var temp = $(this).children().text().trim();
        if (type !== temp) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });
</script>
