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
    <meta charset="utf-8"/>
    <title>后台管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description"/>
    <meta content="Coderthemes" name="author"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- App favicon -->
    <link rel="shortcut icon" href="../img/logo.png">

    <!-- jvectormap -->
    <link href="assets/libs/jqvmap/jqvmap.min.css" rel="stylesheet"/>

    <!-- DataTables -->
    <link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css" rel="stylesheet"
          type="text/css"/>

    <!-- Icons css -->
    <link href="assets/libs/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/libs/dripicons/webfont/webfont.css" rel="stylesheet" type="text/css"/>
    <link href="assets/libs/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css"/>

    <!-- App css -->
    <!-- build:css -->
    <link href="assets/css/app.css" rel="stylesheet" type="text/css"/>
    <!-- endbuild -->

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
                                <div class="notify-icon"><img src="assets/images/users/avatar-2.jpg"
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
                                <div class="notify-icon"><img src="assets/images/users/avatar-4.jpg"
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
                        <img src="assets/images/users/avatar-1.jpg" alt="user" class="rounded-circle"> <span
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
                    <a href="../main.jsp" class="logo" style="text-decoration: none; color: #fff; text-align: center">
                        <img src="../img/logo.png" alt="" style="height: auto; width: 40px;">

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

                    <li class="has-submenu">
                        <a href="index.jsp"><i class="mdi mdi-view-dashboard"></i>主页</a>
                    </li>

                    <li class="">
                        <a href="${pageContext.request.contextPath}/movieManagement"><i class="mdi mdi-file-multiple"></i>电影管理</a>
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
                <li class="breadcrumb-item active">主页</li>
            </ol>
            <h4 class="page-title">主页</h4>
        </div>
        <!-- End page title box -->

        <div class="row">
            <div class="col-xl-4">

                <div class="card-box">
                    <h4 class="header-title">总用户人数</h4>
                    <p class="text-muted" id="time"></p>
                    <div class="mb-3 mt-4">
                        <h2 class="font-weight-light">40</h2>
                    </div>
                    <div class="chartjs-chart dash-sales-chart">
                        <canvas id="sales-chart"></canvas>
                    </div>
                </div><!-- end card-box-->

                <div class="card-box gradient-success bx-shadow-lg">
                    <div class="float-left">
                        <h2 class="text-white mb-0 mt-2">在线人数</h2>
                    </div>
                    <div class="text-right">
                        <h3 class="text-white" id="onlineNumber">
                            <%=request.getServletContext().getAttribute("onlineNumber")%>
                        </h3>
                        <script>
                            function updateOnlineNumber() {
                                $.ajax({
                                    url: "../managementAjax",
                                    data: "choose=online",
                                    success: function (data) {
                                        // console.log(data);
                                        $("#onlineNumber").text(data);
                                    }
                                });
                            }

                            setInterval(updateOnlineNumber, 30000);
                        </script>
                    </div>
                </div> <!-- end card-box-->

            </div> <!-- end col -->
            <div class="col-xl-8">
                <div class="card-box">
                    <div class="dropdown float-right">
                        <a href="#" class="dropdown-toggle arrow-none card-drop" data-toggle="dropdown"
                           aria-expanded="false">
                            <i class="mdi mdi-dots-horizontal"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item">Settings</a>
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item">Download</a>
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item">Upload</a>
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item">Action</a>
                        </div>
                    </div>
                    <h4 class="header-title mb-3">访问者信息</h4>

                    <div class="table-responsive">
                        <table class="table table-centered table-hover mb-0" id="datatable">
                            <thead>
                            <tr>
                                <th class="border-top-0">SessionId</th>
                                <th class="border-top-0">IP地址</th>
                                <th class="border-top-0">第一次登陆时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="visit" items="${userList}">
                                <tr>
                                    <td>
                                        <img src="assets/images/users/avatar-2.jpg" alt="user-pic"
                                             class="rounded-circle thumb-sm bx-shadow-lg"/>
                                        <span class="ml-2">${visit.sessionId}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">${visit.ip}</span>
                                    </td>
                                    <td>${visit.firstTime}</td>

                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div> <!-- end table-responsive -->

                </div> <!-- end card-box-->
            </div> <!-- end col-->

        </div>
        <!-- end row -->


        <!-- Right Sidebar -->
        <div class="right-bar">
            <div class="rightbar-title">
                <a href="javascript:void(0);" class="right-bar-toggle float-right">
                    <i class="dripicons-cross noti-icon"></i>
                </a>
                <h5 class="m-0">Settings</h5>
            </div>
            <div class="slimscroll-menu">
                <!-- User box -->
                <div class="user-box">
                    <div class="user-img">
                        <img src="assets/images/users/avatar-1.jpg" alt="user-img" title="Mat Helme"
                             class="rounded-circle img-fluid">
                        <a href="" class="user-edit"><i class="mdi mdi-pencil"></i></a>
                    </div>

                    <h5><a href="#">${user.username}</a></h5>
                    <p class="text-muted mb-0"><small>${user.introduce}</small></p>
                </div>

                <!-- Settings -->
                <hr class="mt-0"/>
                <h5 class="pl-3">Basic Settings</h5>
                <hr class="mb-0"/>

                <div class="p-3">
                    <div class="checkbox checkbox-primary mb-2">
                        <input id="checkbox1" type="checkbox" checked>
                        <label for="checkbox1">
                            Notifications
                        </label>
                    </div>
                    <div class="checkbox checkbox-primary mb-2">
                        <input id="checkbox2" type="checkbox" checked>
                        <label for="checkbox2">
                            API Access
                        </label>
                    </div>
                    <div class="checkbox checkbox-primary mb-2">
                        <input id="checkbox3" type="checkbox">
                        <label for="checkbox3">
                            Auto Updates
                        </label>
                    </div>
                    <div class="checkbox checkbox-primary mb-2">
                        <input id="checkbox4" type="checkbox" checked>
                        <label for="checkbox4">
                            Online Status
                        </label>
                    </div>
                    <div class="checkbox checkbox-primary mb-0">
                        <input id="checkbox5" type="checkbox" checked>
                        <label for="checkbox5">
                            Auto Payout
                        </label>
                    </div>
                </div>


                <!-- Timeline -->
                <hr class="mt-0"/>
                <h5 class="pl-3 pr-3">Messages <span class="float-right badge badge-pill badge-danger">25</span></h5>
                <hr class="mb-0"/>
                <div class="p-3">
                    <div class="inbox-widget">
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="assets/images/users/avatar-1.jpg"
                                                                 class="rounded-circle" alt=""></div>
                                <p class="inbox-item-author">Chadengle</p>
                                <p class="inbox-item-text">Hey! there I'm available...</p>
                                <p class="inbox-item-date">13:40 PM</p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="assets/images/users/avatar-2.jpg"
                                                                 class="rounded-circle" alt=""></div>
                                <p class="inbox-item-author">Tomaslau</p>
                                <p class="inbox-item-text">I've finished it! See you so...</p>
                                <p class="inbox-item-date">13:34 PM</p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="assets/images/users/avatar-3.jpg"
                                                                 class="rounded-circle" alt=""></div>
                                <p class="inbox-item-author">Stillnotdavid</p>
                                <p class="inbox-item-text">This theme is awesome!</p>
                                <p class="inbox-item-date">13:17 PM</p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="assets/images/users/avatar-4.jpg"
                                                                 class="rounded-circle" alt=""></div>
                                <p class="inbox-item-author">Kurafire</p>
                                <p class="inbox-item-text">Nice to meet you</p>
                                <p class="inbox-item-date">12:20 PM</p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
<%--                                <div class="inbox-item-img"><img src="assets/images/users/avatar-5.jpg"--%>
<%--                                                                 class="rounded-circle" alt=""></div>--%>
                                <p class="inbox-item-author">Shahedk</p>
                                <p class="inbox-item-text">Hey! there I'm available...</p>
                                <p class="inbox-item-date">10:15 AM</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Right-bar -->


        <!-- jQuery  -->
        <script src="assets/libs/jquery/jquery.min.js"></script>
        <script src="assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/libs/jquery-slimscroll/jquery.slimscroll.min.js"></script>

        <!-- KNOB JS -->
        <script src="assets/libs/jquery-knob/jquery.knob.min.js"></script>
        <!-- Chart JS -->
        <script src="assets/libs/chart.js/Chart.bundle.min.js"></script>

        <!-- Jvector map -->
        <script src="assets/libs/jqvmap/jquery.vmap.min.js"></script>
        <script src="assets/libs/jqvmap/maps/jquery.vmap.usa.js"></script>

        <!-- Datatable js -->
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>

        <!-- Dashboard Init JS -->
        <script src="assets/js/jquery.dashboard.js"></script>

        <!-- App js -->
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>
        <script>
            $(document).ready(function () {
                // Default Datatable
                $('#datatable').DataTable({
                    "pageLength": 5,
                    "searching": false,
                    "lengthChange": false
                });
            });
            var date = new Date().toLocaleString();
            $("#time").text(date);
        </script>

</body>

</html>
