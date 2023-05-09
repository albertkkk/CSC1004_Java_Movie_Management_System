<%@page import="domain.User" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>

<div class="container-fluid" style="opacity: 0.7;; position: absolute; top: 0; z-index: 1000;">
    <header class="ml-5">
        <nav class="navbar navbar-expand-md navbar-dark">
            <a class="navbar-brand" href="${pageContext.request.contextPath}/main.do">
                <img src="images/movie.png" alt="" style="height: auto; width: 40px;">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="${pageContext.request.contextPath}/main.do">首页
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=喜剧">喜剧</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=剧情">剧情</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=奇幻">奇幻</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=科幻">科幻</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=动画">动画</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=恐怖">恐怖</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=悬疑">悬疑</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=犯罪">犯罪</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=冒险">冒险</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/category.do?category=动作">动作</a></li>
                </ul>


                <form class="form-inline mt-2 mt-md-0 mr-3" action="${pageContext.request.contextPath}/search.do"
                      method="get">
                    <input class="form-control mr-sm-2" type="text" name="search" placeholder="电影名" value=""
                           aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                        <span class="iconfont iconsousuo"></span></button>
                </form>


                <ul class="navbar-nav mr-4">
                    <li class="nav-item dropdown">
                        <%
                            User user = (User) session.getAttribute("user");
                            if (user != null) {
                        %>
                        <c:if test="${user.username == \"admin\"}">
                            <a href="management/index.jsp" onclick="jump()">
                                    ${user.username }
                            </a>
                        </c:if>
                        <c:if test="${user.username != \"admin\"}">
                            <a class="nav-link dropdown-toggle" href=""
                               id="navbardrop" data-toggle="dropdown">
                                    ${user.username }
                            </a>
                        </c:if>
                        <%
                        } else {
                        %>
                        <a href="${pageContext.request.contextPath}/loginOrRegister.do">我的账户</a>
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

            </div>
        </nav>
    </header>

    <!-- 结束 -->
</div>
