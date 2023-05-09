(function (a) {
    a(".mainmenu ul#primary-menu").slicknav({
        allowParentLinks: true,
        prependTo: ".responsive-menu",
    });
    a(window).on("scroll", function () {
        if (a(this).scrollTop() > 600) {
            a(".scrollToTop").fadeIn()
        } else {
            a(".scrollToTop").fadeOut()
        }
    });
    a(".scrollToTop").on("click", function () {
        a("html, body").animate({
            scrollTop: 0
        }, 2000);
        return false
    });
    a(".menu-area ul > li > .theme-btn").on("click", function () {
        a(".buy-ticket").show();
        return false
    });
    a(".buy-ticket .buy-ticket-area > a").on("click", function () {
        a(".buy-ticket").hide();
        return false
    });
    a(".login-popup").on("click", function () {
        a(".login-area").show();
        return false
    });
    a(".login-box > a").on("click", function () {
        a(".login-area").hide();
        return false
    });
    var b = a(".hero-area-slider");
    b.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        items: 1,
        responsive: {
            992: {
                dots: false,
            }
        }
    });
    b.on("changed.owl.carousel", function (h) {
        var e = h.item.index;
        var g = a(h.target).find(".owl-item").eq(e).prev().find(".hero-area-slide").html();
        var f = a(h.target).find(".owl-item").eq(e).next().find(".hero-area-slide").html();
        a(".thumb-prev .hero-area-slide").html(g);
        a(".thumb-next .hero-area-slide").html(f)
    });
    a(".thumb-next").on("click", function () {
        b.trigger("next.owl.carousel", [300]);
        return false
    });
    a(".thumb-prev").on("click", function () {
        b.trigger("prev.owl.carousel", [300]);
        return false
    });
    var c = a(".news-slider");
    c.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        items: 1,
        responsive: {
            992: {
                dots: false,
            }
        }
    });
    c.on("changed.owl.carousel", function (h) {
        var e = h.item.index;
        var g = a(h.target).find(".owl-item").eq(e).prev().find(".single-news").html();
        var f = a(h.target).find(".owl-item").eq(e).next().find(".single-news").html();
        a(".news-prev .single-news").html(g);
        a(".news-next .single-news").html(f)
    });
    a(".news-next").on("click", function () {
        c.trigger("next.owl.carousel", [300]);
        return false
    });
    a(".news-prev").on("click", function () {
        c.trigger("prev.owl.carousel", [300]);
        return false
    });
    var d = a(".video-slider");
    d.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            576: {
                items: 2,
                margin: 30
            },
            768: {
                items: 3,
                margin: 30
            },
            992: {
                items: 4,
                margin: 30
            }
        }
    });
    a(".popup-youtube").magnificPopup({
        type: "iframe"
    });
    a.extend(true, a.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: "youtube.com/",
                    id: "v=",
                    src: "https://www.youtube.com/embed/%id%?autoplay=1"
                }
            }
        }
    });
    jQuery(".portfolio-item").isotope();
    a(".portfolio-menu li").on("click", function () {
        a(".portfolio-menu li").removeClass("active");
        a(this).addClass("active");
        var e = a(this).attr("data-filter");
        a(".portfolio-item").isotope({
            filter: e
        })
    });
    // jQuery(window).load(function () {
    //     jQuery("#preloader").fadeOut(500)
    // })
}(jQuery));