<%@ page import="domain.User" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>电影详情页</title>
    <link rel="stylesheet" href="font/iconfont.css">
    <link rel="icon" type="image/x-icon" href="img/logo.png">
    <link rel="stylesheet" href="css/comment.css"/>
    <link rel="stylesheet" href="css/sinaFaceAndEffec.css"/>
    <link rel="stylesheet" href="css/dreamlike.css"/>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/info.css">

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
</style>
<body class="bg-dark">

<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/popper.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="js/comment.js"></script>
<script type="text/javascript" src="js/sinaFaceAndEffec.js"></script>

<div id="main" class="d-none">
    <jsp:include page="header.jsp"/>

    <div class="mid" style="margin-top: 10px">
        <!--电影详情 开始 -->
        <div class="row detail-info" style="height: 500px;">
            <div class="col-md-6 detail">
                <p id="movieName" class="d-none">${detail.name}</p>
                <input id="movieId" type="hidden" value="${detail.id}">
                <img src="${detail.image }" alt="" style="border: 5px solid gray;">
                <table class="info">
                    <tr class="info-tr">
                        <td>上映日期</td>
                        <td>${detail.years}</td>
                    </tr>
                    <tr class="info-tr">
                        <td>导演</td>
                        <td>${detail.director}</td>
                    </tr>
                    <tr class="info-tr">
                        <td>地区</td>
                        <td>${detail.country}</td>
                    </tr>
                    <tr class="info-tr">
                        <td>类型</td>
                        <td>${detail.type }</td>
                    </tr>
                    <tr class="info-tr">
                        <td>主演</td>
                        <td><span style=" text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;">${detail.actor }
                        </span></td>
                    </tr>
                    <tr class="info-tr">
                        <td>评分</td>
                        <td>${detail.score }分</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <div class="juqing">
                    <h3>${detail.type}</h3>
                </div>
                <span style="
                    width: auto;
                    text-overflow:ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                     -webkit-line-clamp:9;
                     overflow: hidden;">
                    ${detail.des } </span>

                <div class="float-right">
                    <a class="btn btn-success" href="${detail.url}" role="button">
                        <span class="">&nbsp;在线播放</span>
                    </a>
                </div>
            </div>
            <!-- 电影详情 结束 -->

        </div>
        <!-- Large modal -->
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div id="content" style="width: 700px; height: 500px;">
                        <div class="wrap">
                            <div class="comment">
                                <div class="content">
                                    <div class="cont-box">
                                        <textarea class="text" placeholder="请输入..." id="description"></textarea>
                                    </div>
                                    <div class="cont-box">
                                       <input type="radio" name="score" class="score" value="1"> 1&nbsp;&nbsp;
                                       <input type="radio" name="score" class="score"  value="2"> 2&nbsp;&nbsp;
                                       <input type="radio" name="score" class="score"  value="3"> 3&nbsp;&nbsp;
                                       <input type="radio" name="score" class="score"  value="4"> 4&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score"  value="5"> 5&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score" value="6"> 6&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score"  value="7"> 7&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score"  value="8"> 8&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score"  value="9"> 9&nbsp;&nbsp;
                                        <input type="radio" name="score" class="score"  value="10"> 10&nbsp;&nbsp;

                                    </div>
                                    <div class="tools-box">
                                        <div class="operator-box-btn">
                                            <span class="face-icon" style="margin-top: -5px">☺</span>
<%--                                            <span class="img-icon" style="margin-top: -15px">▧</span>--%>
                                        </div>
                                        <div class="submit-btn">
                                            <input type="button" onClick="addComment()" value="提交评论"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%-- <div id="info-show">
                                 <ul></ul>
                             </div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评论部分 开始 -->
        <div class="row" style="background: white;">
            <div class="row" style="width: 100%;">
                <div class="col-md-12">
                    <%
                        User user = (User) request.getSession().getAttribute("user");
                        if (user == null) {

                    %>
                    <a href="${pageContext.request.contextPath}/login.do" class="float-right text-muted">
                        <span style="font-size: 1.2em;" data-toggle="modal" data-target=".bd-example-modal-lg">评论</span>
                    </a>
                    <%
                    } else {


                    %>
                    <a href="#" class="float-right text-muted">
                        <span style="font-size: 1.2em;" data-toggle="modal" data-target=".bd-example-modal-lg">评论</span>
                    </a>
                    <%
                        }
                    %>
                </div>
            </div>
            <div class="row">
                <div class="row comment" style="width: 100%;">
                    <c:forEach var="comment" items="${comments}" varStatus="status">
                                <div class="c-info ml-5 mr-5 mt-5">
                                    <div class="row">
                                        <!-- 头像图片 -->
                                        <div class="col-md-3">
                                            <img src="img/bg2.png"
                                                 alt="140*140"
                                                 class="rounded-circle mt-2" width="80px" height="80px">
                                        </div>
                                        <div class="col-md-8">
                                            <h4>${comment.userName}</h4>
                                            <span style="color: gray;">${comment.addTime}</span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-12" style="padding-left:20px; ">
                                                    评论：${comment.description}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12" style="padding-left:20px; ">
                                                评分：${comment.score}
                                        </div>
                                    </div>
                                </div>
                    </c:forEach>
                </div>
            </div>
            <!-- 评论部分 结束 -->
        </div>


        <script type="text/javascript">
            // 绑定表情
            $('.face-icon').SinaEmotion($('.text'));
            function addComment() {
                var description = $("#description").val();
                var score = $(":radio:checked").val();
                var movieId = $("#movieId").val();
                console.log(description + " " + movieId);
                $.ajax({
                    url: "comment.do",
                    data: "description=" + description + "&movieId=" + movieId+"&score=" + score,
                    type: "POST",
                    success: function (data) {
                        if (data === "ok") {
                            //刷新当前页面.
                            window.location.reload();
                        }
                    },
                    error: function (e) {
                        console.log(e)
                    }
                })
            }

            function transform() {
                $(".des").each(function () {
                    var info = $(this).text().trim();
                    var newInfo = AnalyticEmotion(info);
                    console.log("newInfo: " + newInfo);
                    $(this).text("");
                    var newEle = '<p>';
                    newEle += newInfo;
                    newEle += '</p>';
                    $(this).append(newEle)
                });
                return true;

            }

            $(window).on('load', function () {
                var flag = transform();
                console.log("flag:"+flag);
                // 如果表情图片已经获取到了，则显示
                if(flag){
                    $("#atome").addClass("d-none");
                    $("#main").removeClass("d-none")
                }


            });
        </script>

    </div>
</body>

</html>
