var introduceText = $("#introduce").text().trim();
console.log(introduceText);
$("#introduce").blur(function () {
    if (introduceText !== $(this).text().trim()) {
        console.log("改变了");
        var introduce = $(this).text().trim();
        $.ajax({
            url: "alterUserInfo.do",
            data:"introduce=" + introduce,
            success: function (data) {
                if (data === "ok") {
                    $(this).text(introduce);
                } else {
                    alert("更改密码出错！");
                }

            },
            error: function (e) {
                console.log(e)
            }
        });
    } else {
        console.log("没有改变");
    }
});


function alterPassword() {
    var password = $("#new-password").val();
    var password2 = $("#confirm-password").val();
    if(password === password2){
        $.ajax({
            url: "alterUserInfo.do",
            data:"password=" + password,
            success: function (data) {
                if (data === "ok") {
                    alert("修改密码成功")
                } else {
                    alert("修改密码出错！");
                }

            },
            error: function (e) {
                console.log(e)
            }
        });
    }
}


