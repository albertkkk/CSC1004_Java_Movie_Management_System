<%--
  Created by IntelliJ IDEA.
  User:
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>电影管理</title>
    <link href="management/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="management/assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="management/assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="management/assets/libs/datatables.net-select-bs4/css/select.bootstrap4.min.css" rel="stylesheet"
          type="text/css"/>

    <!-- Sweet Alert css -->
    <link href="management/assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css"/>

    <!-- App favicon -->
    <link rel="shortcut icon" href="img/logo.png">

    <!-- Custom box css -->
    <link href="management/assets/libs/custombox/custombox.min.css" rel="stylesheet">

    <!-- Icons css -->
    <link href="management/assets/libs/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet" type="text/css"/>
    <link href="management/assets/libs/dripicons/webfont/webfont.css" rel="stylesheet" type="text/css"/>
    <link href="management/assets/libs/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css"/>


    <link href="management/assets/css/app.css" rel="stylesheet" type="text/css"/>
</head>

<body>
<!-- Navigation Bar-->
<header id="topnav">
    <nav class="navbar-custom">

        <div class="container-fluid">
            <ul class="list-unstyled topbar-right-menu float-right mb-0">

                <li class="dropdown notification-list">
                    <!-- Mobile menu toggle-->
                    <a class="navbar-toggle nav-link">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                    <!-- End mobile menu toggle-->
                </li>

                <li class="dropdown notification-list">
                    <a class="nav-link dropdown-toggle arrow-none" data-toggle="dropdown" href="#" role="button"
                       aria-haspopup="false" aria-expanded="false">
                        <i class="dripicons-bell noti-icon"></i>
                        <span class="badge badge-danger badge-pill noti-icon-badge">4</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-lg">

                        <!-- item-->
                        <div class="dropdown-item noti-title">
                            <h5 class="m-0"><span class="float-right"><a href="" class="text-dark"><small>Clear
                                                All</small></a> </span>Notification</h5>
                        </div>

                        <div class="slimscroll noti-scroll">
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon bg-warning"><i class="mdi mdi-comment-account-outline"></i>
                                </div>
                                <p class="notify-details">Caleb Flakelar commented on Admin<small
                                        class="text-muted">1 min ago</small></p>
                            </a>

                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon bg-info"><i class="mdi mdi-account-plus"></i></div>
                                <p class="notify-details">New user registered.<small class="text-muted">5 hours
                                    ago</small></p>
                            </a>

                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon"><img src="management/assets/images/users/avatar-2.jpg"
                                                              class="img-fluid rounded-circle" alt=""/></div>
                                <p class="notify-details">Cristina Pride</p>
                                <p class="text-muted font-13 mb-0 user-msg">Hi, How are you? What about our next
                                    meeting</p>
                            </a>

                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon bg-danger"><i class="mdi mdi-comment-account-outline"></i>
                                </div>
                                <p class="notify-details">Caleb Flakelar commented on Admin<small
                                        class="text-muted">4 days ago</small></p>
                            </a>

                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon"><img src="management/assets/images/users/avatar-4.jpg"
                                                              class="img-fluid rounded-circle" alt=""/></div>
                                <p class="notify-details">Karen Robinson</p>
                                <p class="text-muted font-13 mb-0 user-msg">Wow that's great</p>
                            </a>

                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                <div class="notify-icon bg-primary"><i class="mdi mdi-heart"></i></div>
                                <p class="notify-details">Carlos Crouch liked <b>Admin</b><small
                                        class="text-muted">13 days ago</small></p>
                            </a>
                        </div>

                        <!-- All-->
                        <a href="javascript:void(0);"
                           class="dropdown-item text-center text-primary notify-item notify-all">
                            View all <i class="fi-arrow-right"></i>
                        </a>

                    </div>
                </li>

                <li class="dropdown notification-list">
                    <a class="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button"
                       aria-haspopup="false" aria-expanded="false">
                        <img src="management/assets/images/users/avatar-1.jpg" alt="user" class="rounded-circle"> <span
                            class="ml-1">${user.username}<i class="mdi mdi-chevron-down"></i> </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                        <!-- item-->
                        <div class="dropdown-item noti-title">
                            <h6 class="text-overflow m-0">Welcome !</h6>
                        </div>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <i class="dripicons-user"></i> <span>My Account</span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <i class="dripicons-gear"></i> <span>Settings</span>
                        </a>

                        <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                            <i class="dripicons-help"></i> <span>Support</span>
                        </a>

                        <!-- item-->
                        <a href="management/auth-lock-screen.html" class="dropdown-item notify-item">
                            <i class="dripicons-lock"></i> <span>Lock Screen</span>
                        </a>

                        <!-- item-->
                        <a href="${pageContext.request.contextPath}/logout.do" class="dropdown-item notify-item">
                            <i class="dripicons-power"></i> <span>退出</span>
                        </a>

                    </div>
                </li>
                <li class="dropdown notification-list">
                    <a href="javascript:void(0);" class="nav-link right-bar-toggle">
                        <i class="dripicons-gear noti-icon"></i>
                    </a>
                </li>

            </ul>

            <ul class="list-inline menu-left mb-0">
                <li class="float-left">
                    <a href="main.jsp" class="logo" style="text-decoration: none; color: #fff; text-align: center">
                        <img src="img/logo.png" alt="" style="height: auto; width: 40px;">
                        <%-- <span class="logo-lg">
                             <img src="assets/images/logo.png" alt="" height="20">
                         </span>
                         <span class="logo-sm">
                             <img src="assets/images/logo_sm.png" alt="" height="28">
                         </span>--%>
                    </a>
                </li>
                <li class="app-search">
                    <form>
                        <input type="text" placeholder="Search..." class="form-control">
                        <button type="submit" class="sr-only"></button>
                    </form>
                </li>
            </ul>
        </div>

    </nav>
    <!-- end topbar-main -->

    <div class="topbar-menu">
        <div class="container-fluid">
            <div id="navigation">
                <!-- Navigation Menu-->
                <ul class="navigation-menu">
                    <li class="">
                        <a href="${pageContext.request.contextPath}/movieManagement"><i
                                class="mdi mdi-file-multiple"></i>电影管理</a>
                    </li>

                </ul>
                <!-- End navigation menu -->

                <div class="clearfix"></div>
            </div> <!-- end #navigation -->
        </div> <!-- end container -->
    </div> <!-- end navbar-custom -->
</header>
<!-- End Navigation Bar-->

<div class="wrapper">
    <div class="container-fluid">
        <!-- Page title box -->
        <div class="page-title-alt-bg"></div>
        <div class="page-title-box">
            <ol class="breadcrumb float-right">
                <li class="breadcrumb-item"><a href="javascript:void(0);">Movie</a></li>
                <li class="breadcrumb-item active">电影管理</li>
            </ol>
            <h4 class="page-title">电影管理</h4>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card-box">
                    <div class="row w-100">
                        <div class="col-md-12">
                            <h4 class="header-title float-left">所有电影</h4>
                            <a href="#custom-modal" class="btn btn-primary waves-effect w-md mr-2 mb-2 float-right"
                               data-animation="blur" data-plugin="custommodal"
                               data-overlaySpeed="100" data-overlayColor="#36404a">添加电影</a>
                        </div>
                    </div>
                    <table id="datatable" class="table table-bordered dt-responsive nowrap">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>名字</th>
                            <th>评分</th>
                            <th>导演</th>
                            <th>上映日期</th>
                            <th>上映国家</th>
                            <th>类型</th>
                            <th>删除 / 修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="movie" items="${allMovies}">
                            <tr>
                                <td>${movie.id}</td>
                                <td>${movie.name}</td>
                                <td>${movie.score}</td>
                                <td>${movie.director}</td>
                                <td>${movie.years}</td>
                                <td>${movie.country}</td>
                                <td>${movie.type}</td>
                                <td>
                                    <button type="button" id="sa-warning" class="btn btn-sm btn-icon btn-danger">
                                        <span><i class="mdi mdi-close"></i></span>
                                    </button>
                                    <button type="button" id="custom-html-alert"
                                            class="btn float-right btn-sm  btn-icon btn-warning">
                                        <i class="mdi mdi-wrench"></i></button>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div> <!-- end card-box -->
            </div> <!-- end col -->
        </div> <!-- end row -->

    </div>
</div>
<!-- Custom Modal -->
<div id="custom-modal" class="modal-demo" style="margin-top: 20%; height: 860px">
    <button type="button" class="close" onclick="Custombox.modal.close();">
        <span>&times;</span><span class="sr-only">Close</span>
    </button>
    <h4 class="custom-modal-title">添加电影</h4>
    <form class="form-horizontal m-2" method="post"
          action="${pageContext.request.contextPath}/managementAjax?choose=insert"
          enctype="multipart/form-data">
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">电影名</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="name">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">评分</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="score">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">导演</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="director">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">编剧</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="scriptwriter">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">演员</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="actor">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">上映日期</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="years">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">上映国家</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="country">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">语言</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="languages">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">片长</label>
            <div class="col-sm-10">
                <input class="form-control" type="number" name="length">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">电影海报图片</label>
            <div class="col-sm-10">
                <input type="file" class="form-control" name="image"
                       accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">电影描述</label>
            <div class="col-sm-10">
                <textarea class="form-control" rows="5" name="des"></textarea>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">播放地址</label>
            <div class="col-sm-10">
                <input class="form-control" type="url" name="url">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">类型</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" value="" name="type">
            </div>
        </div>
        <div class="form-group row ">
            <div class="col-md-12 text-center align-content-center">
                <button type="submit" class="btn btn-primary btn-rounded w-md">提交</button>
            </div>
        </div>
    </form>
</div>
</body>
<!-- jQuery  -->
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="management/assets/libs/jquery-slimscroll/jquery.slimscroll.min.js"></script>

<!-- Datatable js -->
<script src="management/assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="management/assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="management/assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"
        type="text/javascript"></script>
<%--<script src="management/assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>--%>
<%--<script src="management/assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>--%>

<!-- Sweet Alert Js  -->
<script src="management/assets/libs/sweetalert2/sweetalert2.min.js"></script>
<script src="management/assets/js/jquery.sweet-alert.init.js"></script>

<!-- Modal-Effect -->
<script src="management/assets/libs/custombox/custombox.min.js"></script>


<!-- App js -->
<script src="management/assets/js/jquery.core.js"></script>
<script src="management/assets/js/jquery.app.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        // Default Datatable
        $('#datatable').DataTable({
            keys: true
        });

    });

</script>

</html>
