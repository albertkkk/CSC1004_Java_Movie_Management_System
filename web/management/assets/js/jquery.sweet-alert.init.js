/*
Template Name: Greeva - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
File: Sweet Alerts
*/

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples
    SweetAlert.prototype.init = function () {

        //Basic
        $('#sa-basic').on('click', function () {
            swal(
                {
                    title: 'Any fool can use a computer!',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                }
            ).catch(swal.noop)
        });

        //A title with a text under
        $('#sa-title').click(function () {
            swal(
                {
                    title: "The Internet?",
                    text: 'That thing is still around?',
                    type: 'question',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                }
            )
        });

        //Success Message
        $('#sa-success').click(function () {
            swal(
                {
                    title: 'Good job!',
                    text: 'You clicked the button!',
                    type: 'success',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                }
            )
        });
        //Warning Message
        $(document).on('click', '#sa-warning', function () {
            var id = $(this).parent().prevAll().eq(6).text();
            var name = $(this).parent().prevAll().eq(5).text();
            var hide = $(this).parent().parent();
            swal({
                title: '确认删除？',
                text: "是否删除该电影",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-confirm mt-2',
                cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                confirmButtonText: '是',
                cancelButtonText: "否"
            }).then(function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                console.log(dismiss);
                if (dismiss['dismiss'] === 'cancel') {
                    swal({
                        title: '取消操作',
                        text: "取消删除",
                        type: 'error',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    });
                } else {
                    $.ajax({
                        url: "managementAjax",
                        data: "choose=delete&movieId=" + id,
                        success: function (data) {
                            console.log("删除成功  " + data);
                            if (data === "OK") {
                                $(hide).addClass("d-none");
                                swal({
                                        title: 'Deleted !',
                                        text: "删除成功",
                                        type: 'success',
                                        confirmButtonClass: 'btn btn-confirm mt-2'
                                    }
                                );
                            }


                        },
                        error: function () {
                            swal({
                                title: '取消操作',
                                text: "取消删除",
                                type: 'error',
                                confirmButtonClass: 'btn btn-confirm mt-2'
                            });
                        }
                    });
                }
            })
        });


        //Parameter
        $('#sa-params').click(function () {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'cancel',
                confirmButtonClass: 'btn btn-success mt-2',
                cancelButtonClass: 'btn btn-danger ml-2 mt-2',
                buttonsStyling: false
            }).then(function () {
                swal({
                        title: 'Deleted !',
                        text: "Your file has been deleted",
                        type: 'success',
                        confirmButtonClass: 'btn btn-confirm mt-2'
                    }
                )
            }, function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                console.log(dismiss);
                if (dismiss === 'cancel') {
                    swal({
                            title: 'Cancelled',
                            text: "Your imaginary file is safe :)",
                            type: 'error',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        }
                    )
                }
            })
        });

        //Custom Image
        $('#sa-image').click(function () {
            swal({
                title: 'Greeva',
                text: 'Responsive Bootstrap 4 Admin Dashboard',
                imageUrl: 'assets/images/logo_sm.png',
                imageHeight: 50,
                animation: false,
                confirmButtonClass: 'btn btn-confirm mt-2'
            })
        });

        //Auto Close Timer
        $('#sa-close').click(function () {
            swal({
                title: 'Auto close alert!',
                text: 'I will close in 2 seconds.',
                timer: 2000,
                confirmButtonClass: 'btn btn-confirm mt-2'
            }).then(
                function () {
                },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }
            )
        });

        //custom html alert
        $(document).on('click', '#custom-html-alert', function () {
            var parents = $(this).parent().prevAll();
            var name;
            var score;
            var year;
            var country;
            var type;
            var id;
            var s = swal({
                title: '<h2>更改信息</h2>',
                type: 'info',
                html: '<form class="form-horizontal">' +
                    '<div class="form-group row">' +
                    '<label class="col-sm-2 col-form-label">电影名</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="hidden" class="form-control" id="id" value="' + parents.eq(6).text() + '">' +
                    '<input type="text" class="form-control" id="name" value="' + parents.eq(5).text() + '">' +
                    '</div>' +
                    ' </div>' +
                    '<div class="form-group row">' +
                    '<label class="col-sm-2 col-form-label">电影评分</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="score" value="' + parents.eq(4).text() + '">' +
                    '</div>' +
                    ' </div>' +
                    '<div class="form-group row">' +
                    '<label class="col-sm-2 col-form-label">电影上映年份</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="year" value="' + parents.eq(2).text() + '">' +
                    '</div>' +
                    ' </div>' +
                    '<div class="form-group row">' +
                    '<label class="col-sm-2 col-form-label">电影上映国家</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="country" value="' + parents.eq(1).text() + '">' +
                    '</div>' +
                    ' </div>' +
                    '<div class="form-group row">' +
                    '<label class="col-sm-2 col-form-label">电影类型</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="type" value="' + parents.eq(0).text() + '">' +
                    '</div>' +
                    ' </div>' +
                    '</form>',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonClass: 'btn btn-confirm mt-2',
                cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                confirmButtonText: '<h3>提交修改</h3>',
                cancelButtonText: '<h3>取消</h3>',
                preConfirm: function () {
                    id = $("#id").val();
                    name = $("#name").val();
                    score = $("#score").val();
                    year = $("#year").val();
                    country = $("#country").val();
                    type = $("#type").val();
                    console.log(name);
                }
            });
            var originName = $("#name").val();
            s.then(function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                console.log(dismiss);
                if (dismiss['dismiss'] === 'cancel') {
                    swal({
                            title: '取消操作',
                            text: "取消修改",
                            type: 'error',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        }
                    )
                } else {
                    $.ajax({
                        url: "managementAjax",
                        data: "choose=modify&movieId="+id+"&movieName=" + name + "&score=" + score + "&year=" + year
                            + "&country=" + country + "&type=" + type +"&originName=" + originName,
                        success: function (data) {
                            if (data === "OK") {
                                swal({
                                    title: '提交中',
                                    text: "修改成功",
                                    type: 'success',
                                    confirmButtonClass: 'btn btn-confirm mt-2'
                                });
                                console.log(parents);
                                parents.eq(5).text(name);
                                parents.eq(4).text(score);
                                parents.eq(2).text(year);
                                parents.eq(1).text(country);
                                parents.eq(0).text(type);
                            } else {
                                swal({
                                    title: '发生错误',
                                    text: "修改信息失败",
                                    type: 'error',
                                    confirmButtonClass: 'btn btn-confirm mt-2'
                                })
                            }
                        },
                        error: function () {
                            swal({
                                title: '发生错误',
                                text: "修改信息失败",
                                type: 'error',
                                confirmButtonClass: 'btn btn-confirm mt-2'
                            })
                        }
                    });

                }
            });
        });


        //Custom width padding
        $('#custom-padding-width-alert').click(function () {
            swal({
                title: 'Custom width, padding, background.',
                width: 600,
                padding: 100,
                confirmButtonClass: 'btn btn-confirm mt-2',
                background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
            })
        });

        //Ajax
        $('#ajax-alert').click(function () {
            swal({
                title: 'Submit email to run ajax request',
                input: 'email',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonClass: 'btn btn-confirm mt-2',
                cancelButtonClass: 'btn btn-cancel ml-2 mt-2',
                preConfirm: function (email) {
                    console.log(email);
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 2000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                swal({
                    type: 'success',
                    title: 'Ajax request finished!',
                    html: 'Submitted email: ' + email,
                    confirmButtonClass: 'btn btn-confirm mt-2'
                })
            })
        });

        //chaining modal alert
        $('#chaining-alert').click(function () {
            swal.setDefaults({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                animation: false,
                progressSteps: ['1', '2', '3'],
                confirmButtonClass: 'btn btn-confirm mt-2',
                cancelButtonClass: 'btn btn-cancel ml-2 mt-2'
            })

            var steps = [
                {
                    title: 'Question 1',
                    text: 'Chaining swal2 modals is easy'
                },
                'Question 2',
                'Question 3'
            ]

            swal.queue(steps).then(function (result) {
                swal.resetDefaults()
                swal({
                    title: 'All done!',
                    confirmButtonClass: 'btn btn-confirm mt-2',
                    html: 'Your answers: <pre>' +
                        JSON.stringify(result) +
                        '</pre>',
                    confirmButtonText: 'Lovely!',
                    showCancelButton: false
                })
            }, function () {
                swal.resetDefaults()
            })
        });

        //Danger
        $('#dynamic-alert').click(function () {
            swal.queue([{
                title: 'Your public IP',
                confirmButtonText: 'Show my public IP',
                confirmButtonClass: 'btn btn-confirm mt-2',
                text: 'Your public IP will be received ' +
                    'via AJAX request',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        $.get('https://api.ipify.org?format=json')
                            .done(function (data) {
                                swal.insertQueueStep(data.ip)
                                resolve()
                            })
                    })
                }
            }])
        });


    },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.SweetAlert.init()
    }(window.jQuery);