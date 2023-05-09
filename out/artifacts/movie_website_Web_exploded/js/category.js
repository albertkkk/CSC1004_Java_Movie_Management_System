// 获得地址栏中category的值
var url = decodeURI(window.location.search);
var type = url.substring(url.lastIndexOf('=') + 1);
var country;
var year;
var score;

function collection(obj) {
    var movieId = $(obj).parent().parent().prev().text().trim();
    var userName = $("#navbardrop").text().trim();
    if (userName !== "我的账户") {
        $(obj).toggleClass("text-danger");
        $.ajax({
            url: "collection.do",
            data: "movieId=" + movieId + "&userName=" + userName,
        });
    }
}
