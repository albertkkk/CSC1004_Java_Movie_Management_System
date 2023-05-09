<%--
  Created by IntelliJ IDEA.
  User:
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="referrer" content="no-referrer"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="font/iconfont.css">


    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="css/category.css">
    <link rel="stylesheet" href="css/dreamlike.css"/>
    <title>分类</title>
    <link rel="icon" type="image/x-icon" href="img/logo.png">
</head>

<style>
    body {
        /*  字体  */
        font-family: -apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif;

        /*  字号 */
        font-size: 16px;

        /*  字体颜色  */
        color: #333;

        /* 行距 */
        line-height: 1.75;


    }

    a {
        text-decoration: none;
        color: grey;
    }
</style>
<link rel="stylesheet" href="css/mofang.css">

<script>
    function hideOrShow() {
        var $left = $("#left-arr");
        var $right = $("#right-arr");
        var $dongzuo = $("#dongzuo");
        var $xuanyi = $("#xuanyi");
        // 判断动作按钮是否已经移动
        if ($dongzuo.offset().left >= 107) {
            console.log($dongzuo.offset().left)
            $right.show();
            $left.hide();
            $dongzuo.css("margin-left", "-=110px");
            $dongzuo.hide();
            $xuanyi.show();

        } else {
            console.log($dongzuo.offset().left)
            $left.show()
            $right.hide()
            $xuanyi.hide();
            $dongzuo.css("margin-left", "+=110px");
            $dongzuo.show();

        }
    }
</script>

<body class="bg-dark">
<script>
    $(document).ready(function () {
        if ($(window).load) {
            $("#atome").addClass("d-none");
            $("#main").removeClass("d-none")
        }
    });

</script>
<div id="atome" class="atome">
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
    <div class="circle"><span class="dot"></span><span class="dot"></span></div>
</div>
<div id="main" class="d-none">
    <script src='js/TweenMax.min.js'></script>
    <script src="js/index.js"></script>
    <jsp:include page="header.jsp"/>
    <div class="middle-show clearfix">
        <div class="row mt-4">
        </div>


        <div class="row mt-4" style="opacity: 0.7">
            <div class="row">
                <div class="col-md-12">
                    <div class="card-deck text-white">
                        <c:forEach var="m" items="${movies}" varStatus="status">
                            <c:if test="${status.index < 6}">
                                <div class="card bg-dark" style="max-width: 200px; max-height: 450px">
                                    <a href="${pageContext.request.contextPath}/detail.do?movieid=${m.id}">
                                        <img src="${m.image }" class="card-img-top" alt="">
                                    </a>
                                    <div class="card-body">
                                        <h5 class="card-title">${m.name}</h5>
                                        <p class="card-text  align-middle">
                                            <small class="text-muted">${m.years}</small>
                                            <small class="float-right">
                                                <a href="#" onclick="collection(this);return false;"
                                                   style="text-decoration: none">
                                                    <span class="iconfont iconaixin">&nbsp;</span>
                                                </a>
                                                <span class="iconfont iconwujiaoxing-"
                                                      style="color: yellow;">&nbsp;</span>
                                                <span id="m-score" class="align-middle"
                                                      style="color: yellow;">${m.score}</span>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </c:if>
                        </c:forEach>


                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="card-deck text-white">
                        <c:forEach var="m" items="${movies}" varStatus="status">
                            <c:if test="${status.index >= 6}">
                                <div class="card bg-dark" style="max-width: 200px; max-height: 450px">
                                    <a href="${pageContext.request.contextPath}/detail.do?movieid=${m.id}">
                                        <img src="${m.image }" class="card-img-top" alt="">
                                    </a>
                                    <div class="card-body">
                                        <h5 class="card-title">${m.name}</h5>
                                        <p class="card-text  align-middle">
                                            <small class="text-muted">${m.years}
                                            </small>
                                            <small class="float-right">

                                                <a href="#" onclick="collection(this);return false;"
                                                   style="text-decoration: none">
                                                    <span class="iconfont iconaixin">&nbsp;</span>
                                                </a>

                                                <a href="###" style="text-decoration: none">
                                                    <span class="iconfont iconai-eye">&nbsp;</span>
                                                </a>
                                                <span class="iconfont iconwujiaoxing-"
                                                      style="color: yellow;">&nbsp;</span>
                                                <span id="m-score" class="align-middle"
                                                      style="color: yellow;">${m.score}</span>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </c:if>
                        </c:forEach>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="js/category.js"></script>

</div>
</body>
</html>
