var includeCaption = true;
var zoomTime = 5;
var zoomSteps = 15;
var includeFade = 1;
var minBorder = 90;
var shadowSettings = "0px 5px 25px rgba(0, 0, 0, ";
var zoomImagesURI = "/images-global/zoom/";
var myWidth = 0, myHeight = 0, myScroll = 0;
myScrollWidth = 0;
myScrollHeight = 0;
var zoomOpen = false, preloadFrame = 1, preloadActive = false, preloadTime = 0, imgPreload = new Image();
var zoomActive = new Array();
var zoomTimer = new Array();
var zoomOrigW = new Array();
var zoomOrigH = new Array();
var zoomOrigX = new Array();
var zoomOrigY = new Array();
var zoomID = "ZoomBox";
var theID = "ZoomImage";
var zoomCaption = "ZoomCaption";
var zoomCaptionDiv = "ZoomCapDiv";
if (navigator.userAgent.indexOf("MSIE") != -1) {
    var browserIsIE = true
}

function setupZoom() {
    prepZooms();
    insertZoomHTML();
    zoomdiv = document.getElementById(zoomID);
    zoomimg = document.getElementById(theID)
}

function prepZooms() {
    if (!document.getElementsByTagName) {
        return
    }
    var a = document.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].getAttribute("href")) {
            if (a[i].getAttribute("href").search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1) {
                if (a[i].getAttribute("rel") != "nozoom") {
                    a[i].onclick = function (b) {
                        zoomClick(this, b);
                        return false
                    };
                    a[i].onmouseover = function () {
                        zoomPreload(this)
                    }
                }
            }
        }
    }
}

function zoomPreload(b) {
    var a = b.getAttribute("href");
    if (imgPreload.src.indexOf(b.getAttribute("href").substr(b.getAttribute("href").lastIndexOf("/"))) == -1) {
        preloadActive = true;
        imgPreload = new Image();
        imgPreload.onload = function () {
            preloadActive = false
        };
        imgPreload.src = a
    }
}

function preloadAnimStart() {
    preloadTime = new Date();
    document.getElementById("ZoomSpin").style.left = (myWidth / 2) + "px";
    document.getElementById("ZoomSpin").style.top = ((myHeight / 2) + myScroll) + "px";
    document.getElementById("ZoomSpin").style.visibility = "visible";
    preloadFrame = 1;
    document.getElementById("SpinImage").src = zoomImagesURI + "zoom-spin-" + preloadFrame + ".png";
    preloadAnimTimer = setInterval("preloadAnim()", 100)
}

function preloadAnim(a) {
    if (preloadActive != false) {
        document.getElementById("SpinImage").src = zoomImagesURI + "zoom-spin-" + preloadFrame + ".png";
        preloadFrame++;
        if (preloadFrame > 12) {
            preloadFrame = 1
        }
    } else {
        document.getElementById("ZoomSpin").style.visibility = "hidden";
        clearInterval(preloadAnimTimer);
        zoomIn(preloadFrom)
    }
}

function zoomClick(c, b) {
    var a = getShift(b);
    getSize();
    if (preloadActive == true) {
        preloadFrom = c;
        preloadAnimStart()
    } else {
        zoomIn(c, a)
    }
}

function zoomIn(b, a) {
    zoomimg.src = b.getAttribute("href");
    if (b.childNodes[0].width) {
        startW = b.childNodes[0].width;
        startH = b.childNodes[0].height;
        startPos = findElementPos(b.childNodes[0])
    } else {
        startW = 50;
        startH = 12;
        startPos = findElementPos(b)
    }
    hostX = startPos[0];
    hostY = startPos[1];
    if (document.getElementById("scroller")) {
        hostX = hostX - document.getElementById("scroller").scrollLeft
    }
    endW = imgPreload.width;
    endH = imgPreload.height;
    if (zoomActive[theID] != true) {
        if (document.getElementById("ShadowBox")) {
            document.getElementById("ShadowBox").style.visibility = "hidden"
        } else {
            if (!browserIsIE) {
                if (fadeActive.ZoomImage) {
                    clearInterval(fadeTimer.ZoomImage);
                    fadeActive.ZoomImage = false;
                    fadeTimer.ZoomImage = false
                }
                document.getElementById("ZoomImage").style.webkitBoxShadow = shadowSettings + "0.0)"
            }
        }
        document.getElementById("ZoomClose").style.visibility = "hidden";
        if (includeCaption) {
            if (b.getAttribute("title") && includeCaption) {
                document.getElementById(zoomCaption).innerHTML = b.getAttribute("title")
            } else {
                document.getElementById(zoomCaption).innerHTML = ""
            }
        }
        zoomOrigW[theID] = startW;
        zoomOrigH[theID] = startH;
        zoomOrigX[theID] = hostX;
        zoomOrigY[theID] = hostY;
        zoomimg.style.width = startW + "px";
        zoomimg.style.height = startH + "px";
        zoomdiv.style.left = hostX + "px";
        zoomdiv.style.top = hostY + "px";
        if (includeFade == 1) {
            setOpacity(0, zoomID)
        }
        zoomdiv.style.visibility = "visible";
        sizeRatio = endW / endH;
        if (endW > myWidth - minBorder) {
            endW = myWidth - minBorder;
            endH = endW / sizeRatio
        }
        if (endH > myHeight - minBorder) {
            endH = myHeight - minBorder;
            endW = endH * sizeRatio
        }
        zoomChangeX = ((myWidth / 2) - (endW / 2) - hostX);
        zoomChangeY = (((myHeight / 2) - (endH / 2) - hostY) + myScroll);
        zoomChangeW = (endW - startW);
        zoomChangeH = (endH - startH);
        if (a) {
            tempSteps = zoomSteps * 7
        } else {
            tempSteps = zoomSteps
        }
        zoomCurrent = 0;
        if (includeFade == 1) {
            fadeCurrent = 0;
            fadeAmount = (0 - 100) / tempSteps
        } else {
            fadeAmount = 0
        }
        zoomTimer[theID] = setInterval("zoomElement('" + zoomID + "', '" + theID + "', " + zoomCurrent + ", " + startW + ", " + zoomChangeW + ", " + startH + ", " + zoomChangeH + ", " + hostX + ", " + zoomChangeX + ", " + hostY + ", " + zoomChangeY + ", " + tempSteps + ", " + includeFade + ", " + fadeAmount + ", 'zoomDoneIn(zoomID)')", zoomTime);
        zoomActive[theID] = true
    }
}

function zoomOut(b, a) {
    if (getShift(a)) {
        tempSteps = zoomSteps * 7
    } else {
        tempSteps = zoomSteps
    }
    if (zoomActive[theID] != true) {
        if (document.getElementById("ShadowBox")) {
            document.getElementById("ShadowBox").style.visibility = "hidden"
        } else {
            if (!browserIsIE) {
                if (fadeActive.ZoomImage) {
                    clearInterval(fadeTimer.ZoomImage);
                    fadeActive.ZoomImage = false;
                    fadeTimer.ZoomImage = false
                }
                document.getElementById("ZoomImage").style.webkitBoxShadow = shadowSettings + "0.0)"
            }
        }
        document.getElementById("ZoomClose").style.visibility = "hidden";
        if (includeCaption && document.getElementById(zoomCaption).innerHTML != "") {
            document.getElementById(zoomCaptionDiv).style.visibility = "hidden"
        }
        startX = parseInt(zoomdiv.style.left);
        startY = parseInt(zoomdiv.style.top);
        startW = zoomimg.width;
        startH = zoomimg.height;
        zoomChangeX = zoomOrigX[theID] - startX;
        zoomChangeY = zoomOrigY[theID] - startY;
        zoomChangeW = zoomOrigW[theID] - startW;
        zoomChangeH = zoomOrigH[theID] - startH;
        zoomCurrent = 0;
        if (includeFade == 1) {
            fadeCurrent = 0;
            fadeAmount = (100 - 0) / tempSteps
        } else {
            fadeAmount = 0
        }
        zoomTimer[theID] = setInterval("zoomElement('" + zoomID + "', '" + theID + "', " + zoomCurrent + ", " + startW + ", " + zoomChangeW + ", " + startH + ", " + zoomChangeH + ", " + startX + ", " + zoomChangeX + ", " + startY + ", " + zoomChangeY + ", " + tempSteps + ", " + includeFade + ", " + fadeAmount + ", 'zoomDone(zoomID, theID)')", zoomTime);
        zoomActive[theID] = true
    }
}

function zoomDoneIn(a, b) {
    zoomOpen = true;
    a = document.getElementById(a);
    if (document.getElementById("ShadowBox")) {
        setOpacity(0, "ShadowBox");
        shadowdiv = document.getElementById("ShadowBox");
        shadowLeft = parseInt(a.style.left) - 13;
        shadowTop = parseInt(a.style.top) - 8;
        shadowWidth = a.offsetWidth + 26;
        shadowHeight = a.offsetHeight + 26;
        shadowdiv.style.width = shadowWidth + "px";
        shadowdiv.style.height = shadowHeight + "px";
        shadowdiv.style.left = shadowLeft + "px";
        shadowdiv.style.top = shadowTop + "px";
        document.getElementById("ShadowBox").style.visibility = "visible";
        fadeElementSetup("ShadowBox", 0, 100, 5)
    } else {
        if (!browserIsIE) {
            fadeElementSetup("ZoomImage", 0, 0.8, 5, 0, "shadow")
        }
    }
    if (includeCaption && document.getElementById(zoomCaption).innerHTML != "") {
        zoomcapd = document.getElementById(zoomCaptionDiv);
        zoomcapd.style.top = parseInt(a.style.top) + (a.offsetHeight + 15) + "px";
        zoomcapd.style.left = (myWidth / 2) - (zoomcapd.offsetWidth / 2) + "px";
        zoomcapd.style.visibility = "visible"
    }
    if (!browserIsIE) {
        setOpacity(0, "ZoomClose")
    }
    document.getElementById("ZoomClose").style.visibility = "visible";
    if (!browserIsIE) {
        fadeElementSetup("ZoomClose", 0, 100, 5)
    }
    document.onkeypress = getKey
}

function zoomDone(a, b) {
    zoomOpen = false;
    zoomOrigH[b] = "";
    zoomOrigW[b] = "";
    document.getElementById(a).style.visibility = "hidden";
    zoomActive[b] == false;
    document.onkeypress = null
}

function zoomElement(zoomdiv, theID, zoomCurrent, zoomStartW, zoomChangeW, zoomStartH, zoomChangeH, zoomStartX, zoomChangeX, zoomStartY, zoomChangeY, zoomSteps, includeFade, fadeAmount, execWhenDone) {
    if (zoomCurrent == (zoomSteps + 1)) {
        zoomActive[theID] = false;
        clearInterval(zoomTimer[theID]);
        if (execWhenDone != "") {
            eval(execWhenDone)
        }
    } else {
        if (includeFade == 1) {
            if (fadeAmount < 0) {
                setOpacity(Math.abs(zoomCurrent * fadeAmount), zoomdiv)
            } else {
                setOpacity(100 - (zoomCurrent * fadeAmount), zoomdiv)
            }
        }
        moveW = cubicInOut(zoomCurrent, zoomStartW, zoomChangeW, zoomSteps);
        moveH = cubicInOut(zoomCurrent, zoomStartH, zoomChangeH, zoomSteps);
        moveX = cubicInOut(zoomCurrent, zoomStartX, zoomChangeX, zoomSteps);
        moveY = cubicInOut(zoomCurrent, zoomStartY, zoomChangeY, zoomSteps);
        document.getElementById(zoomdiv).style.left = moveX + "px";
        document.getElementById(zoomdiv).style.top = moveY + "px";
        zoomimg.style.width = moveW + "px";
        zoomimg.style.height = moveH + "px";
        zoomCurrent++;
        clearInterval(zoomTimer[theID]);
        zoomTimer[theID] = setInterval("zoomElement('" + zoomdiv + "', '" + theID + "', " + zoomCurrent + ", " + zoomStartW + ", " + zoomChangeW + ", " + zoomStartH + ", " + zoomChangeH + ", " + zoomStartX + ", " + zoomChangeX + ", " + zoomStartY + ", " + zoomChangeY + ", " + zoomSteps + ", " + includeFade + ", " + fadeAmount + ", '" + execWhenDone + "')", zoomTime)
    }
}

function getKey(a) {
    if (!a) {
        theKey = event.keyCode
    } else {
        theKey = a.keyCode
    }
    if (theKey == 27) {
        zoomOut(this, a)
    }
}

function fadeOut(a) {
    if (a.id) {
        fadeElementSetup(a.id, 100, 0, 10)
    }
}

function fadeIn(a) {
    if (a.id) {
        fadeElementSetup(a.id, 0, 100, 10)
    }
}

var fadeActive = new Array();
var fadeQueue = new Array();
var fadeTimer = new Array();
var fadeClose = new Array();
var fadeMode = new Array();

function fadeElementSetup(d, f, c, b, e, a) {
    if (fadeActive[d] == true) {
        fadeQueue[d] = new Array(d, f, c, b)
    } else {
        fadeSteps = b;
        fadeCurrent = 0;
        fadeAmount = (f - c) / fadeSteps;
        fadeTimer[d] = setInterval("fadeElement('" + d + "', '" + fadeCurrent + "', '" + fadeAmount + "', '" + fadeSteps + "')", 15);
        fadeActive[d] = true;
        fadeMode[d] = a;
        if (e == 1) {
            fadeClose[d] = true
        } else {
            fadeClose[d] = false
        }
    }
}

function fadeElement(b, d, a, c) {
    if (d == c) {
        clearInterval(fadeTimer[b]);
        fadeActive[b] = false;
        fadeTimer[b] = false;
        if (fadeClose[b] == true) {
            document.getElementById(b).style.visibility = "hidden"
        }
        if (fadeQueue[b] && fadeQueue[b] != false) {
            fadeElementSetup(fadeQueue[b][0], fadeQueue[b][1], fadeQueue[b][2], fadeQueue[b][3]);
            fadeQueue[b] = false
        }
    } else {
        d++;
        if (fadeMode[b] == "shadow") {
            if (a < 0) {
                document.getElementById(b).style.webkitBoxShadow = shadowSettings + (Math.abs(d * a)) + ")"
            } else {
                document.getElementById(b).style.webkitBoxShadow = shadowSettings + (100 - (d * a)) + ")"
            }
        } else {
            if (a < 0) {
                setOpacity(Math.abs(d * a), b)
            } else {
                setOpacity(100 - (d * a), b)
            }
        }
        clearInterval(fadeTimer[b]);
        fadeTimer[b] = setInterval("fadeElement('" + b + "', '" + d + "', '" + a + "', '" + c + "')", 15)
    }
}

function setOpacity(c, a) {
    var b = document.getElementById(a).style;
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        if (c == 100) {
            c = 99.9999
        }
    }
    b.filter = "alpha(opacity=" + c + ")";
    b.opacity = (c / 100)
}

function linear(e, a, g, f) {
    return g * e / f + a
}

function sineInOut(e, a, g, f) {
    return -g / 2 * (Math.cos(Math.PI * e / f) - 1) + a
}

function cubicIn(e, a, g, f) {
    return g * (e /= f) * e * e + a
}

function cubicOut(e, a, g, f) {
    return g * ((e = e / f - 1) * e * e + 1) + a
}

function cubicInOut(e, a, g, f) {
    if ((e /= f / 2) < 1) {
        return g / 2 * e * e * e + a
    }
    return g / 2 * ((e -= 2) * e * e + 2) + a
}

function bounceOut(e, a, g, f) {
    if ((e /= f) < (1 / 2.75)) {
        return g * (7.5625 * e * e) + a
    } else {
        if (e < (2 / 2.75)) {
            return g * (7.5625 * (e -= (1.5 / 2.75)) * e + 0.75) + a
        } else {
            if (e < (2.5 / 2.75)) {
                return g * (7.5625 * (e -= (2.25 / 2.75)) * e + 0.9375) + a
            } else {
                return g * (7.5625 * (e -= (2.625 / 2.75)) * e + 0.984375) + a
            }
        }
    }
}

function getSize() {
    if (document.all) {
        myWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.clientWidth;
        myHeight = (document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.clientHeight;
        myScroll = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop
    } else {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
        myScroll = window.pageYOffset
    }
    if (window.innerHeight && window.scrollMaxY) {
        myScrollWidth = document.body.scrollWidth;
        myScrollHeight = window.innerHeight + window.scrollMaxY
    } else {
        if (document.body.scrollHeight > document.body.offsetHeight) {
            myScrollWidth = document.body.scrollWidth;
            myScrollHeight = document.body.scrollHeight
        } else {
            myScrollWidth = document.body.offsetWidth;
            myScrollHeight = document.body.offsetHeight
        }
    }
}

function getShift(b) {
    var a = false;
    if (!b && window.event) {
        a = window.event.shiftKey
    } else {
        if (b) {
            b.stopPropagation();
            a = b.shiftKey
        }
    }
    return a
}

function findElementPos(a) {
    var c = 0;
    var b = 0;
    do {
        c += a.offsetLeft;
        b += a.offsetTop
    } while (a = a.offsetParent);
    return Array(c, b)
}

function insertZoomHTML() {
    var m = document.getElementsByTagName("body").item(0);
    var I = document.createElement("div");
    I.setAttribute("id", "ZoomSpin");
    I.style.position = "absolute";
    I.style.left = "10px";
    I.style.top = "10px";
    I.style.visibility = "hidden";
    I.style.zIndex = "525";
    m.insertBefore(I, m.firstChild);
    var u = document.createElement("img");
    u.setAttribute("id", "SpinImage");
    u.setAttribute("src", zoomImagesURI + "zoom-spin-1.png");
    I.appendChild(u);
    var l = document.createElement("div");
    l.setAttribute("id", "ZoomBox");
    l.style.position = "absolute";
    l.style.left = "10px";
    l.style.top = "10px";
    l.style.visibility = "hidden";
    l.style.zIndex = "499";
    m.insertBefore(l, I.nextSibling);
    var v = document.createElement("img");
    v.onclick = function (P) {
        zoomOut(this, P);
        return false
    };
    v.setAttribute("src", zoomImagesURI + "spacer.gif");
    v.setAttribute("id", "ZoomImage");
    v.setAttribute("border", "0");
    v.setAttribute("style", "-webkit-box-shadow: " + shadowSettings + "0.0)");
    v.style.display = "block";
    v.style.width = "10px";
    v.style.height = "10px";
    v.style.cursor = "pointer";
    l.appendChild(v);
    var r = document.createElement("div");
    r.setAttribute("id", "ZoomClose");
    r.style.position = "absolute";
    if (browserIsIE) {
        r.style.left = "-1px";
        r.style.top = "0px"
    } else {
        r.style.left = "-15px";
        r.style.top = "-15px"
    }
    r.style.visibility = "hidden";
    l.appendChild(r);
    var s = document.createElement("img");
    s.onclick = function (P) {
        zoomOut(this, P);
        return false
    };
    s.setAttribute("src", zoomImagesURI + "closebox.png");
    s.setAttribute("width", "30");
    s.setAttribute("height", "30");
    s.setAttribute("border", "0");
    s.style.cursor = "pointer";
    r.appendChild(s);
    if (!document.getElementById("ZoomImage").style.webkitBoxShadow && !browserIsIE) {
        var q = document.createElement("div");
        q.setAttribute("id", "ShadowBox");
        q.style.position = "absolute";
        q.style.left = "50px";
        q.style.top = "50px";
        q.style.width = "100px";
        q.style.height = "100px";
        q.style.visibility = "hidden";
        q.style.zIndex = "498";
        m.insertBefore(q, l.nextSibling);
        var t = document.createElement("table");
        t.setAttribute("border", "0");
        t.setAttribute("width", "100%");
        t.setAttribute("height", "100%");
        t.setAttribute("cellpadding", "0");
        t.setAttribute("cellspacing", "0");
        q.appendChild(t);
        var d = document.createElement("tbody");
        t.appendChild(d);
        var p = document.createElement("tr");
        p.style.height = "25px";
        d.appendChild(p);
        var M = document.createElement("td");
        M.style.width = "27px";
        p.appendChild(M);
        var F = document.createElement("img");
        F.setAttribute("src", zoomImagesURI + "zoom-shadow1.png");
        F.setAttribute("width", "27");
        F.setAttribute("height", "25");
        F.style.display = "block";
        M.appendChild(F);
        var L = document.createElement("td");
        L.setAttribute("background", zoomImagesURI + "zoom-shadow2.png");
        p.appendChild(L);
        var c = document.createElement("img");
        c.setAttribute("src", zoomImagesURI + "spacer.gif");
        c.setAttribute("height", "1");
        c.setAttribute("width", "1");
        c.style.display = "block";
        L.appendChild(c);
        var K = document.createElement("td");
        K.style.width = "27px";
        p.appendChild(K);
        var C = document.createElement("img");
        C.setAttribute("src", zoomImagesURI + "zoom-shadow3.png");
        C.setAttribute("width", "27");
        C.setAttribute("height", "25");
        C.style.display = "block";
        K.appendChild(C);
        inRow2 = document.createElement("tr");
        d.appendChild(inRow2);
        var J = document.createElement("td");
        J.setAttribute("background", zoomImagesURI + "zoom-shadow4.png");
        inRow2.appendChild(J);
        var b = document.createElement("img");
        b.setAttribute("src", zoomImagesURI + "spacer.gif");
        b.setAttribute("height", "1");
        b.setAttribute("width", "1");
        b.style.display = "block";
        J.appendChild(b);
        var H = document.createElement("td");
        H.setAttribute("bgcolor", "#ffffff");
        inRow2.appendChild(H);
        var a = document.createElement("img");
        a.setAttribute("src", zoomImagesURI + "spacer.gif");
        a.setAttribute("height", "1");
        a.setAttribute("width", "1");
        a.style.display = "block";
        H.appendChild(a);
        var G = document.createElement("td");
        G.setAttribute("background", zoomImagesURI + "zoom-shadow5.png");
        inRow2.appendChild(G);
        var O = document.createElement("img");
        O.setAttribute("src", zoomImagesURI + "spacer.gif");
        O.setAttribute("height", "1");
        O.setAttribute("width", "1");
        O.style.display = "block";
        G.appendChild(O);
        var o = document.createElement("tr");
        o.style.height = "26px";
        d.appendChild(o);
        var E = document.createElement("td");
        E.style.width = "27px";
        o.appendChild(E);
        var A = document.createElement("img");
        A.setAttribute("src", zoomImagesURI + "zoom-shadow6.png");
        A.setAttribute("width", "27");
        A.setAttribute("height", "26");
        A.style.display = "block";
        E.appendChild(A);
        var D = document.createElement("td");
        D.setAttribute("background", zoomImagesURI + "zoom-shadow7.png");
        o.appendChild(D);
        var N = document.createElement("img");
        N.setAttribute("src", zoomImagesURI + "spacer.gif");
        N.setAttribute("height", "1");
        N.setAttribute("width", "1");
        N.style.display = "block";
        D.appendChild(N);
        var B = document.createElement("td");
        B.style.width = "27px";
        o.appendChild(B);
        var z = document.createElement("img");
        z.setAttribute("src", zoomImagesURI + "zoom-shadow8.png");
        z.setAttribute("width", "27");
        z.setAttribute("height", "26");
        z.style.display = "block";
        B.appendChild(z)
    }
    if (includeCaption) {
        var f = document.createElement("div");
        f.setAttribute("id", "ZoomCapDiv");
        f.style.position = "absolute";
        f.style.visibility = "hidden";
        f.style.marginLeft = "auto";
        f.style.marginRight = "auto";
        f.style.zIndex = "501";
        m.insertBefore(f, l.nextSibling);
        var h = document.createElement("table");
        h.setAttribute("border", "0");
        h.setAttribute("cellPadding", "0");
        h.setAttribute("cellSpacing", "0");
        f.appendChild(h);
        var n = document.createElement("tbody");
        h.appendChild(n);
        var k = document.createElement("tr");
        n.appendChild(k);
        var y = document.createElement("td");
        y.setAttribute("align", "right");
        k.appendChild(y);
        var g = document.createElement("img");
        g.setAttribute("src", zoomImagesURI + "zoom-caption-l.png");
        g.setAttribute("width", "13");
        g.setAttribute("height", "26");
        g.style.display = "block";
        y.appendChild(g);
        var x = document.createElement("td");
        x.setAttribute("background", zoomImagesURI + "zoom-caption-fill.png");
        x.setAttribute("id", "ZoomCaption");
        x.setAttribute("valign", "middle");
        x.style.fontSize = "14px";
        x.style.fontFamily = "Helvetica";
        x.style.fontWeight = "bold";
        x.style.color = "#ffffff";
        x.style.textShadow = "0px 2px 4px #000000";
        x.style.whiteSpace = "nowrap";
        k.appendChild(x);
        var w = document.createElement("td");
        k.appendChild(w);
        var e = document.createElement("img");
        e.setAttribute("src", zoomImagesURI + "zoom-caption-r.png");
        e.setAttribute("width", "13");
        e.setAttribute("height", "26");
        e.style.display = "block";
        w.appendChild(e)
    }
}

(function () {
    var W = this, ab, F = W.jQuery, S = W.$, T = W.jQuery = W.$ = function (b, a) {
        return new T.fn.init(b, a)
    }, M = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/, ac = /^.[^:#\[\.,]*$/;
    T.fn = T.prototype = {
        init: function (e, b) {
            e = e || document;
            if (e.nodeType) {
                this[0] = e;
                this.length = 1;
                this.context = e;
                return this
            }
            if (typeof e === "string") {
                var c = M.exec(e);
                if (c && (c[1] || !b)) {
                    if (c[1]) {
                        e = T.clean([c[1]], b)
                    } else {
                        var a = document.getElementById(c[3]);
                        if (a && a.id != c[3]) {
                            return T().find(e)
                        }
                        var d = T(a || []);
                        d.context = document;
                        d.selector = e;
                        return d
                    }
                } else {
                    return T(b).find(e)
                }
            } else {
                if (T.isFunction(e)) {
                    return T(document).ready(e)
                }
            }
            if (e.selector && e.context) {
                this.selector = e.selector;
                this.context = e.context
            }
            return this.setArray(T.isArray(e) ? e : T.makeArray(e))
        }, selector: "", jquery: "1.3.2", size: function () {
            return this.length
        }, get: function (a) {
            return a === ab ? Array.prototype.slice.call(this) : this[a]
        }, pushStack: function (c, a, d) {
            var b = T(c);
            b.prevObject = this;
            b.context = this.context;
            if (a === "find") {
                b.selector = this.selector + (this.selector ? " " : "") + d
            } else {
                if (a) {
                    b.selector = this.selector + "." + a + "(" + d + ")"
                }
            }
            return b
        }, setArray: function (a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        }, each: function (a, b) {
            return T.each(this, a, b)
        }, index: function (a) {
            return T.inArray(a && a.jquery ? a[0] : a, this)
        }, attr: function (c, a, b) {
            var d = c;
            if (typeof c === "string") {
                if (a === ab) {
                    return this[0] && T[b || "attr"](this[0], c)
                } else {
                    d = {};
                    d[c] = a
                }
            }
            return this.each(function (e) {
                for (c in d) {
                    T.attr(b ? this.style : this, c, T.prop(this, d[c], b, e, c))
                }
            })
        }, css: function (b, a) {
            if ((b == "width" || b == "height") && parseFloat(a) < 0) {
                a = ab
            }
            return this.attr(b, a, "curCSS")
        }, text: function (a) {
            if (typeof a !== "object" && a != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(a))
            }
            var b = "";
            T.each(a || this, function () {
                T.each(this.childNodes, function () {
                    if (this.nodeType != 8) {
                        b += this.nodeType != 1 ? this.nodeValue : T.fn.text([this])
                    }
                })
            });
            return b
        }, wrapAll: function (b) {
            if (this[0]) {
                var a = T(b, this[0].ownerDocument).clone();
                if (this[0].parentNode) {
                    a.insertBefore(this[0])
                }
                a.map(function () {
                    var c = this;
                    while (c.firstChild) {
                        c = c.firstChild
                    }
                    return c
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return this.each(function () {
                T(this).contents().wrapAll(a)
            })
        }, wrap: function (a) {
            return this.each(function () {
                T(this).wrapAll(a)
            })
        }, append: function () {
            return this.domManip(arguments, true, function (a) {
                if (this.nodeType == 1) {
                    this.appendChild(a)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, true, function (a) {
                if (this.nodeType == 1) {
                    this.insertBefore(a, this.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, false, function (a) {
                this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return this.domManip(arguments, false, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, end: function () {
            return this.prevObject || T([])
        }, push: [].push, sort: [].sort, splice: [].splice, find: function (b) {
            if (this.length === 1) {
                var a = this.pushStack([], "find", b);
                a.length = 0;
                T.find(b, this[0], a);
                return a
            } else {
                return this.pushStack(T.unique(T.map(this, function (c) {
                    return T.find(b, c)
                })), "find", b)
            }
        }, clone: function (b) {
            var d = this.map(function () {
                if (!T.support.noCloneEvent && !T.isXMLDoc(this)) {
                    var f = this.outerHTML;
                    if (!f) {
                        var e = this.ownerDocument.createElement("div");
                        e.appendChild(this.cloneNode(true));
                        f = e.innerHTML
                    }
                    return T.clean([f.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (b === true) {
                var a = this.find("*").andSelf(), c = 0;
                d.find("*").andSelf().each(function () {
                    if (this.nodeName !== a[c].nodeName) {
                        return
                    }
                    var g = T.data(a[c], "events");
                    for (var e in g) {
                        for (var f in g[e]) {
                            T.event.add(this, e, g[e][f], g[e][f].data)
                        }
                    }
                    c++
                })
            }
            return d
        }, filter: function (a) {
            return this.pushStack(T.isFunction(a) && T.grep(this, function (b, c) {
                return a.call(b, c)
            }) || T.multiFilter(a, T.grep(this, function (b) {
                return b.nodeType === 1
            })), "filter", a)
        }, closest: function (c) {
            var a = T.expr.match.POS.test(c) ? T(c) : null, b = 0;
            return this.map(function () {
                var d = this;
                while (d && d.ownerDocument) {
                    if (a ? a.index(d) > -1 : T(d).is(c)) {
                        T.data(d, "closest", b);
                        return d
                    }
                    d = d.parentNode;
                    b++
                }
            })
        }, not: function (b) {
            if (typeof b === "string") {
                if (ac.test(b)) {
                    return this.pushStack(T.multiFilter(b, this, true), "not", b)
                } else {
                    b = T.multiFilter(b, this)
                }
            }
            var a = b.length && b[b.length - 1] !== ab && !b.nodeType;
            return this.filter(function () {
                return a ? T.inArray(this, b) < 0 : this != b
            })
        }, add: function (a) {
            return this.pushStack(T.unique(T.merge(this.get(), typeof a === "string" ? T(a) : T.makeArray(a))))
        }, is: function (a) {
            return !!a && T.multiFilter(a, this).length > 0
        }, hasClass: function (a) {
            return !!a && this.is("." + a)
        }, val: function (c) {
            if (c === ab) {
                var k = this[0];
                if (k) {
                    if (T.nodeName(k, "option")) {
                        return (k.attributes.value || {}).specified ? k.value : k.text
                    }
                    if (T.nodeName(k, "select")) {
                        var e = k.selectedIndex, b = [], a = k.options, f = k.type == "select-one";
                        if (e < 0) {
                            return null
                        }
                        for (var h = f ? e : 0, d = f ? e + 1 : a.length; h < d; h++) {
                            var g = a[h];
                            if (g.selected) {
                                c = T(g).val();
                                if (f) {
                                    return c
                                }
                                b.push(c)
                            }
                        }
                        return b
                    }
                    return (k.value || "").replace(/\r/g, "")
                }
                return ab
            }
            if (typeof c === "number") {
                c += ""
            }
            return this.each(function () {
                if (this.nodeType != 1) {
                    return
                }
                if (T.isArray(c) && /radio|checkbox/.test(this.type)) {
                    this.checked = (T.inArray(this.value, c) >= 0 || T.inArray(this.name, c) >= 0)
                } else {
                    if (T.nodeName(this, "select")) {
                        var l = T.makeArray(c);
                        T("option", this).each(function () {
                            this.selected = (T.inArray(this.value, l) >= 0 || T.inArray(this.text, l) >= 0)
                        });
                        if (!l.length) {
                            this.selectedIndex = -1
                        }
                    } else {
                        this.value = c
                    }
                }
            })
        }, html: function (a) {
            return a === ab ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty().append(a)
        }, replaceWith: function (a) {
            return this.after(a).remove()
        }, eq: function (a) {
            return this.slice(a, +a + 1)
        }, slice: function () {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), "slice", Array.prototype.slice.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack(T.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }, domManip: function (d, a, b) {
            if (this[0]) {
                var e = (this[0].ownerDocument || this[0]).createDocumentFragment(),
                    h = T.clean(d, (this[0].ownerDocument || this[0]), e), f = e.firstChild;
                if (f) {
                    for (var g = 0, k = this.length; g < k; g++) {
                        b.call(c(this[g], f), this.length > 1 || g > 0 ? e.cloneNode(true) : e)
                    }
                }
                if (h) {
                    T.each(h, E)
                }
            }
            return this;

            function c(m, l) {
                return a && T.nodeName(m, "table") && T.nodeName(l, "tr") ? (m.getElementsByTagName("tbody")[0] || m.appendChild(m.ownerDocument.createElement("tbody"))) : m
            }
        }
    };
    T.fn.init.prototype = T.fn;

    function E(b, a) {
        if (a.src) {
            T.ajax({url: a.src, async: false, dataType: "script"})
        } else {
            T.globalEval(a.text || a.textContent || a.innerHTML || "")
        }
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
    }

    function ad() {
        return +new Date
    }

    T.extend = T.fn.extend = function () {
        var c = arguments[0] || {}, e = 1, d = arguments.length, h = false, f;
        if (typeof c === "boolean") {
            h = c;
            c = arguments[1] || {};
            e = 2
        }
        if (typeof c !== "object" && !T.isFunction(c)) {
            c = {}
        }
        if (d == e) {
            c = this;
            --e
        }
        for (; e < d; e++) {
            if ((f = arguments[e]) != null) {
                for (var g in f) {
                    var b = c[g], a = f[g];
                    if (c === a) {
                        continue
                    }
                    if (h && a && typeof a === "object" && !a.nodeType) {
                        c[g] = T.extend(h, b || (a.length != null ? [] : {}), a)
                    } else {
                        if (a !== ab) {
                            c[g] = a
                        }
                    }
                }
            }
        }
        return c
    };
    var ag = /z-?index|font-?weight|opacity|zoom|line-?height/i, Q = document.defaultView || {},
        L = Object.prototype.toString;
    T.extend({
        noConflict: function (a) {
            W.$ = S;
            if (a) {
                W.jQuery = F
            }
            return T
        }, isFunction: function (a) {
            return L.call(a) === "[object Function]"
        }, isArray: function (a) {
            return L.call(a) === "[object Array]"
        }, isXMLDoc: function (a) {
            return a.nodeType === 9 && a.documentElement.nodeName !== "HTML" || !!a.ownerDocument && T.isXMLDoc(a.ownerDocument)
        }, globalEval: function (a) {
            if (a && /\S/.test(a)) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                    c = document.createElement("script");
                c.type = "text/javascript";
                if (T.support.scriptEval) {
                    c.appendChild(document.createTextNode(a))
                } else {
                    c.text = a
                }
                b.insertBefore(c, b.firstChild);
                b.removeChild(c)
            }
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() == b.toUpperCase()
        }, each: function (e, a, f) {
            var g, d = 0, c = e.length;
            if (f) {
                if (c === ab) {
                    for (g in e) {
                        if (a.apply(e[g], f) === false) {
                            break
                        }
                    }
                } else {
                    for (; d < c;) {
                        if (a.apply(e[d++], f) === false) {
                            break
                        }
                    }
                }
            } else {
                if (c === ab) {
                    for (g in e) {
                        if (a.call(e[g], g, e[g]) === false) {
                            break
                        }
                    }
                } else {
                    for (var b = e[0]; d < c && a.call(b, d, b) !== false; b = e[++d]) {
                    }
                }
            }
            return e
        }, prop: function (b, a, c, d, e) {
            if (T.isFunction(a)) {
                a = a.call(b, d)
            }
            return typeof a === "number" && c == "curCSS" && !ag.test(e) ? a + "px" : a
        }, className: {
            add: function (b, a) {
                T.each((a || "").split(/\s+/), function (d, c) {
                    if (b.nodeType == 1 && !T.className.has(b.className, c)) {
                        b.className += (b.className ? " " : "") + c
                    }
                })
            }, remove: function (b, a) {
                if (b.nodeType == 1) {
                    b.className = a !== ab ? T.grep(b.className.split(/\s+/), function (c) {
                        return !T.className.has(a, c)
                    }).join(" ") : ""
                }
            }, has: function (a, b) {
                return a && T.inArray(b, (a.className || a).toString().split(/\s+/)) > -1
            }
        }, swap: function (b, c, a) {
            var e = {};
            for (var d in c) {
                e[d] = b.style[d];
                b.style[d] = c[d]
            }
            a.call(b);
            for (var d in c) {
                b.style[d] = e[d]
            }
        }, css: function (e, g, c, h) {
            if (g == "width" || g == "height") {
                var a, f = {position: "absolute", visibility: "hidden", display: "block"},
                    b = g == "width" ? ["Left", "Right"] : ["Top", "Bottom"];

                function d() {
                    a = g == "width" ? e.offsetWidth : e.offsetHeight;
                    if (h === "border") {
                        return
                    }
                    T.each(b, function () {
                        if (!h) {
                            a -= parseFloat(T.curCSS(e, "padding" + this, true)) || 0
                        }
                        if (h === "margin") {
                            a += parseFloat(T.curCSS(e, "margin" + this, true)) || 0
                        } else {
                            a -= parseFloat(T.curCSS(e, "border" + this + "Width", true)) || 0
                        }
                    })
                }

                if (e.offsetWidth !== 0) {
                    d()
                } else {
                    T.swap(e, f, d)
                }
                return Math.max(0, Math.round(a))
            }
            return T.curCSS(e, g, c)
        }, curCSS: function (e, h, g) {
            var b, k = e.style;
            if (h == "opacity" && !T.support.opacity) {
                b = T.attr(k, "opacity");
                return b == "" ? "1" : b
            }
            if (h.match(/float/i)) {
                h = H
            }
            if (!g && k && k[h]) {
                b = k[h]
            } else {
                if (Q.getComputedStyle) {
                    if (h.match(/float/i)) {
                        h = "float"
                    }
                    h = h.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var a = Q.getComputedStyle(e, null);
                    if (a) {
                        b = a.getPropertyValue(h)
                    }
                    if (h == "opacity" && b == "") {
                        b = "1"
                    }
                } else {
                    if (e.currentStyle) {
                        var d = h.replace(/\-(\w)/g, function (m, l) {
                            return l.toUpperCase()
                        });
                        b = e.currentStyle[h] || e.currentStyle[d];
                        if (!/^\d+(px)?$/i.test(b) && /^\d/.test(b)) {
                            var f = k.left, c = e.runtimeStyle.left;
                            e.runtimeStyle.left = e.currentStyle.left;
                            k.left = b || 0;
                            b = k.pixelLeft + "px";
                            k.left = f;
                            e.runtimeStyle.left = c
                        }
                    }
                }
            }
            return b
        }, clean: function (g, b, d) {
            b = b || document;
            if (typeof b.createElement === "undefined") {
                b = b.ownerDocument || b[0] && b[0].ownerDocument || document
            }
            if (!d && g.length === 1 && typeof g[0] === "string") {
                var e = /^<(\w+)\s*\/?>$/.exec(g[0]);
                if (e) {
                    return [b.createElement(e[1])]
                }
            }
            var f = [], h = [], a = b.createElement("div");
            T.each(g, function (n, k) {
                if (typeof k === "number") {
                    k += ""
                }
                if (!k) {
                    return
                }
                if (typeof k === "string") {
                    k = k.replace(/(<(\w+)[^>]*?)\/>/g, function (s, r, t) {
                        return t.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? s : r + "></" + t + ">"
                    });
                    var o = k.replace(/^\s+/, "").substring(0, 10).toLowerCase();
                    var m = !o.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !o.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || o.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !o.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!o.indexOf("<td") || !o.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !o.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || !T.support.htmlSerialize && [1, "div<div>", "</div>"] || [0, "", ""];
                    a.innerHTML = m[1] + k + m[2];
                    while (m[0]--) {
                        a = a.lastChild
                    }
                    if (!T.support.tbody) {
                        var l = /<tbody/i.test(k),
                            p = !o.indexOf("<table") && !l ? a.firstChild && a.firstChild.childNodes : m[1] == "<table>" && !l ? a.childNodes : [];
                        for (var q = p.length - 1; q >= 0; --q) {
                            if (T.nodeName(p[q], "tbody") && !p[q].childNodes.length) {
                                p[q].parentNode.removeChild(p[q])
                            }
                        }
                    }
                    if (!T.support.leadingWhitespace && /^\s/.test(k)) {
                        a.insertBefore(b.createTextNode(k.match(/^\s*/)[0]), a.firstChild)
                    }
                    k = T.makeArray(a.childNodes)
                }
                if (k.nodeType) {
                    f.push(k)
                } else {
                    f = T.merge(f, k)
                }
            });
            if (d) {
                for (var c = 0; f[c]; c++) {
                    if (T.nodeName(f[c], "script") && (!f[c].type || f[c].type.toLowerCase() === "text/javascript")) {
                        h.push(f[c].parentNode ? f[c].parentNode.removeChild(f[c]) : f[c])
                    } else {
                        if (f[c].nodeType === 1) {
                            f.splice.apply(f, [c + 1, 0].concat(T.makeArray(f[c].getElementsByTagName("script"))))
                        }
                        d.appendChild(f[c])
                    }
                }
                return h
            }
            return f
        }, attr: function (c, f, b) {
            if (!c || c.nodeType == 3 || c.nodeType == 8) {
                return ab
            }
            var e = !T.isXMLDoc(c), a = b !== ab;
            f = e && T.props[f] || f;
            if (c.tagName) {
                var g = /href|src|style/.test(f);
                if (f == "selected" && c.parentNode) {
                    c.parentNode.selectedIndex
                }
                if (f in c && e && !g) {
                    if (a) {
                        if (f == "type" && T.nodeName(c, "input") && c.parentNode) {
                            throw"type property can't be changed"
                        }
                        c[f] = b
                    }
                    if (T.nodeName(c, "form") && c.getAttributeNode(f)) {
                        return c.getAttributeNode(f).nodeValue
                    }
                    if (f == "tabIndex") {
                        var d = c.getAttributeNode("tabIndex");
                        return d && d.specified ? d.value : c.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : c.nodeName.match(/^(a|area)$/i) && c.href ? 0 : ab
                    }
                    return c[f]
                }
                if (!T.support.style && e && f == "style") {
                    return T.attr(c.style, "cssText", b)
                }
                if (a) {
                    c.setAttribute(f, "" + b)
                }
                var h = !T.support.hrefNormalized && e && g ? c.getAttribute(f, 2) : c.getAttribute(f);
                return h === null ? ab : h
            }
            if (!T.support.opacity && f == "opacity") {
                if (a) {
                    c.zoom = 1;
                    c.filter = (c.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(b) + "" == "NaN" ? "" : "alpha(opacity=" + b * 100 + ")")
                }
                return c.filter && c.filter.indexOf("opacity=") >= 0 ? (parseFloat(c.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : ""
            }
            f = f.replace(/-([a-z])/ig, function (l, k) {
                return k.toUpperCase()
            });
            if (a) {
                c[f] = b
            }
            return c[f]
        }, trim: function (a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        }, makeArray: function (a) {
            var c = [];
            if (a != null) {
                var b = a.length;
                if (b == null || typeof a === "string" || T.isFunction(a) || a.setInterval) {
                    c[0] = a
                } else {
                    while (b) {
                        c[--b] = a[b]
                    }
                }
            }
            return c
        }, inArray: function (b, a) {
            for (var d = 0, c = a.length; d < c; d++) {
                if (a[d] === b) {
                    return d
                }
            }
            return -1
        }, merge: function (b, e) {
            var d = 0, c, a = b.length;
            if (!T.support.getAll) {
                while ((c = e[d++]) != null) {
                    if (c.nodeType != 8) {
                        b[a++] = c
                    }
                }
            } else {
                while ((c = e[d++]) != null) {
                    b[a++] = c
                }
            }
            return b
        }, unique: function (a) {
            var f = [], g = {};
            try {
                for (var e = 0, d = a.length; e < d; e++) {
                    var b = T.data(a[e]);
                    if (!g[b]) {
                        g[b] = true;
                        f.push(a[e])
                    }
                }
            } catch (c) {
                f = a
            }
            return f
        }, grep: function (e, a, f) {
            var d = [];
            for (var c = 0, b = e.length; c < b; c++) {
                if (!f != !a(e[c], c)) {
                    d.push(e[c])
                }
            }
            return d
        }, map: function (f, a) {
            var e = [];
            for (var d = 0, c = f.length; d < c; d++) {
                var b = a(f[d], d);
                if (b != null) {
                    e[e.length] = b
                }
            }
            return e.concat.apply([], e)
        }
    });
    var O = navigator.userAgent.toLowerCase();
    T.browser = {
        version: (O.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        safari: /webkit/.test(O),
        opera: /opera/.test(O),
        msie: /msie/.test(O) && !/opera/.test(O),
        mozilla: /mozilla/.test(O) && !/(compatible|webkit)/.test(O)
    };
    T.each({
        parent: function (a) {
            return a.parentNode
        }, parents: function (a) {
            return T.dir(a, "parentNode")
        }, next: function (a) {
            return T.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return T.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return T.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return T.dir(a, "previousSibling")
        }, siblings: function (a) {
            return T.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return T.sibling(a.firstChild)
        }, contents: function (a) {
            return T.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : T.makeArray(a.childNodes)
        }
    }, function (b, a) {
        T.fn[b] = function (d) {
            var c = T.map(this, a);
            if (d && typeof d == "string") {
                c = T.multiFilter(d, c)
            }
            return this.pushStack(T.unique(c), b, d)
        }
    });
    T.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (b, a) {
        T.fn[b] = function (h) {
            var e = [], c = T(h);
            for (var d = 0, g = c.length; d < g; d++) {
                var f = (d > 0 ? this.clone(true) : this).get();
                T.fn[a].apply(T(c[d]), f);
                e = e.concat(f)
            }
            return this.pushStack(e, b, h)
        }
    });
    T.each({
        removeAttr: function (a) {
            T.attr(this, a, "");
            if (this.nodeType == 1) {
                this.removeAttribute(a)
            }
        }, addClass: function (a) {
            T.className.add(this, a)
        }, removeClass: function (a) {
            T.className.remove(this, a)
        }, toggleClass: function (a, b) {
            if (typeof b !== "boolean") {
                b = !T.className.has(this, a)
            }
            T.className[b ? "add" : "remove"](this, a)
        }, remove: function (a) {
            if (!a || T.filter(a, [this]).length) {
                T("*", this).add([this]).each(function () {
                    T.event.remove(this);
                    T.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        }, empty: function () {
            T(this).children().remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    }, function (b, a) {
        T.fn[b] = function () {
            return this.each(a, arguments)
        }
    });

    function Y(b, a) {
        return b[0] && parseInt(T.curCSS(b[0], a, true), 10) || 0
    }

    var aa = "jQuery" + ad(), I = 0, R = {};
    T.extend({
        cache: {}, data: function (c, d, b) {
            c = c == W ? R : c;
            var a = c[aa];
            if (!a) {
                a = c[aa] = ++I
            }
            if (d && !T.cache[a]) {
                T.cache[a] = {}
            }
            if (b !== ab) {
                T.cache[a][d] = b
            }
            return d ? T.cache[a][d] : a
        }, removeData: function (c, d) {
            c = c == W ? R : c;
            var a = c[aa];
            if (d) {
                if (T.cache[a]) {
                    delete T.cache[a][d];
                    d = "";
                    for (d in T.cache[a]) {
                        break
                    }
                    if (!d) {
                        T.removeData(c)
                    }
                }
            } else {
                try {
                    delete c[aa]
                } catch (b) {
                    if (c.removeAttribute) {
                        c.removeAttribute(aa)
                    }
                }
                delete T.cache[a]
            }
        }, queue: function (c, d, a) {
            if (c) {
                d = (d || "fx") + "queue";
                var b = T.data(c, d);
                if (!b || T.isArray(a)) {
                    b = T.data(c, d, T.makeArray(a))
                } else {
                    if (a) {
                        b.push(a)
                    }
                }
            }
            return b
        }, dequeue: function (a, b) {
            var d = T.queue(a, b), c = d.shift();
            if (!b || b === "fx") {
                c = d[0]
            }
            if (c !== ab) {
                c.call(a)
            }
        }
    });
    T.fn.extend({
        data: function (d, b) {
            var a = d.split(".");
            a[1] = a[1] ? "." + a[1] : "";
            if (b === ab) {
                var c = this.triggerHandler("getData" + a[1] + "!", [a[0]]);
                if (c === ab && this.length) {
                    c = T.data(this[0], d)
                }
                return c === ab && a[1] ? this.data(a[0]) : c
            } else {
                return this.trigger("setData" + a[1] + "!", [a[0], b]).each(function () {
                    T.data(this, d, b)
                })
            }
        }, removeData: function (a) {
            return this.each(function () {
                T.removeData(this, a)
            })
        }, queue: function (b, a) {
            if (typeof b !== "string") {
                a = b;
                b = "fx"
            }
            if (a === ab) {
                return T.queue(this[0], b)
            }
            return this.each(function () {
                var c = T.queue(this, b, a);
                if (b == "fx" && c.length == 1) {
                    c[0].call(this)
                }
            })
        }, dequeue: function (a) {
            return this.each(function () {
                T.dequeue(this, a)
            })
        }
    });
    (function () {
        var b = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
            h = 0, n = Object.prototype.toString;
        var p = function (t, x, ak, aj) {
            ak = ak || [];
            x = x || document;
            if (x.nodeType !== 1 && x.nodeType !== 9) {
                return []
            }
            if (!t || typeof t !== "string") {
                return ak
            }
            var s = [], v, C, z, y, ai, w, u = true;
            b.lastIndex = 0;
            while ((v = b.exec(t)) !== null) {
                s.push(v[1]);
                if (v[2]) {
                    w = RegExp.rightContext;
                    break
                }
            }
            if (s.length > 1 && g.exec(t)) {
                if (s.length === 2 && m.relative[s[0]]) {
                    C = l(s[0] + s[1], x)
                } else {
                    C = m.relative[s[0]] ? [x] : p(s.shift(), x);
                    while (s.length) {
                        t = s.shift();
                        if (m.relative[t]) {
                            t += s.shift()
                        }
                        C = l(t, C)
                    }
                }
            } else {
                var D = aj ? {
                    expr: s.pop(),
                    set: q(aj)
                } : p.find(s.pop(), s.length === 1 && x.parentNode ? x.parentNode : x, c(x));
                C = p.filter(D.expr, D.set);
                if (s.length > 0) {
                    z = q(C)
                } else {
                    u = false
                }
                while (s.length) {
                    var A = s.pop(), B = A;
                    if (!m.relative[A]) {
                        A = ""
                    } else {
                        B = s.pop()
                    }
                    if (B == null) {
                        B = x
                    }
                    m.relative[A](z, B, c(x))
                }
            }
            if (!z) {
                z = C
            }
            if (!z) {
                throw"Syntax error, unrecognized expression: " + (A || t)
            }
            if (n.call(z) === "[object Array]") {
                if (!u) {
                    ak.push.apply(ak, z)
                } else {
                    if (x.nodeType === 1) {
                        for (var r = 0; z[r] != null; r++) {
                            if (z[r] && (z[r] === true || z[r].nodeType === 1 && k(x, z[r]))) {
                                ak.push(C[r])
                            }
                        }
                    } else {
                        for (var r = 0; z[r] != null; r++) {
                            if (z[r] && z[r].nodeType === 1) {
                                ak.push(C[r])
                            }
                        }
                    }
                }
            } else {
                q(z, ak)
            }
            if (w) {
                p(w, x, ak, aj);
                if (o) {
                    hasDuplicate = false;
                    ak.sort(o);
                    if (hasDuplicate) {
                        for (var r = 1; r < ak.length; r++) {
                            if (ak[r] === ak[r - 1]) {
                                ak.splice(r--, 1)
                            }
                        }
                    }
                }
            }
            return ak
        };
        p.matches = function (s, r) {
            return p(s, null, null, r)
        };
        p.find = function (r, y, z) {
            var s, u;
            if (!r) {
                return []
            }
            for (var v = 0, w = m.order.length; v < w; v++) {
                var t = m.order[v], u;
                if ((u = m.match[t].exec(r))) {
                    var x = RegExp.leftContext;
                    if (x.substr(x.length - 1) !== "\\") {
                        u[1] = (u[1] || "").replace(/\\/g, "");
                        s = m.find[t](u, y, z);
                        if (s != null) {
                            r = r.replace(m.match[t], "");
                            break
                        }
                    }
                }
            }
            if (!s) {
                s = y.getElementsByTagName("*")
            }
            return {set: s, expr: r}
        };
        p.filter = function (ai, aj, B, v) {
            var w = ai, z = [], r = aj, t, y, s = aj && aj[0] && c(aj[0]);
            while (ai && aj.length) {
                for (var ak in m.filter) {
                    if ((t = m.match[ak].exec(ai)) != null) {
                        var x = m.filter[ak], A, C;
                        y = false;
                        if (r == z) {
                            z = []
                        }
                        if (m.preFilter[ak]) {
                            t = m.preFilter[ak](t, r, B, z, v, s);
                            if (!t) {
                                y = A = true
                            } else {
                                if (t === true) {
                                    continue
                                }
                            }
                        }
                        if (t) {
                            for (var u = 0; (C = r[u]) != null; u++) {
                                if (C) {
                                    A = x(C, t, u, r);
                                    var D = v ^ !!A;
                                    if (B && A != null) {
                                        if (D) {
                                            y = true
                                        } else {
                                            r[u] = false
                                        }
                                    } else {
                                        if (D) {
                                            z.push(C);
                                            y = true
                                        }
                                    }
                                }
                            }
                        }
                        if (A !== ab) {
                            if (!B) {
                                r = z
                            }
                            ai = ai.replace(m.match[ak], "");
                            if (!y) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (ai == w) {
                    if (y == null) {
                        throw"Syntax error, unrecognized expression: " + ai
                    } else {
                        break
                    }
                }
                w = ai
            }
            return r
        };
        var m = p.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (r) {
                    return r.getAttribute("href")
                }
            },
            relative: {
                "+": function (r, y, s) {
                    var u = typeof y === "string", z = u && !/\W/.test(y), t = u && !z;
                    if (z && !s) {
                        y = y.toUpperCase()
                    }
                    for (var v = 0, w = r.length, x; v < w; v++) {
                        if ((x = r[v])) {
                            while ((x = x.previousSibling) && x.nodeType !== 1) {
                            }
                            r[v] = t || x && x.nodeName === y ? x || false : x === y
                        }
                    }
                    if (t) {
                        p.filter(y, r, true)
                    }
                }, ">": function (w, t, v) {
                    var y = typeof t === "string";
                    if (y && !/\W/.test(t)) {
                        t = v ? t : t.toUpperCase();
                        for (var s = 0, u = w.length; s < u; s++) {
                            var x = w[s];
                            if (x) {
                                var r = x.parentNode;
                                w[s] = r.nodeName === t ? r : false
                            }
                        }
                    } else {
                        for (var s = 0, u = w.length; s < u; s++) {
                            var x = w[s];
                            if (x) {
                                w[s] = y ? x.parentNode : x.parentNode === t
                            }
                        }
                        if (y) {
                            p.filter(t, w, true)
                        }
                    }
                }, "": function (r, t, v) {
                    var s = h++, u = a;
                    if (!t.match(/\W/)) {
                        var w = t = v ? t : t.toUpperCase();
                        u = d
                    }
                    u("parentNode", t, s, r, w, v)
                }, "~": function (r, t, v) {
                    var s = h++, u = a;
                    if (typeof t === "string" && !t.match(/\W/)) {
                        var w = t = v ? t : t.toUpperCase();
                        u = d
                    }
                    u("previousSibling", t, s, r, w, v)
                }
            },
            find: {
                ID: function (t, s, r) {
                    if (typeof s.getElementById !== "undefined" && !r) {
                        var u = s.getElementById(t[1]);
                        return u ? [u] : []
                    }
                }, NAME: function (s, w, v) {
                    if (typeof w.getElementsByName !== "undefined") {
                        var t = [], x = w.getElementsByName(s[1]);
                        for (var r = 0, u = x.length; r < u; r++) {
                            if (x[r].getAttribute("name") === s[1]) {
                                t.push(x[r])
                            }
                        }
                        return t.length === 0 ? null : t
                    }
                }, TAG: function (s, r) {
                    return r.getElementsByTagName(s[1])
                }
            },
            preFilter: {
                CLASS: function (r, t, s, u, w, v) {
                    r = " " + r[1].replace(/\\/g, "") + " ";
                    if (v) {
                        return r
                    }
                    for (var y = 0, x; (x = t[y]) != null; y++) {
                        if (x) {
                            if (w ^ (x.className && (" " + x.className + " ").indexOf(r) >= 0)) {
                                if (!s) {
                                    u.push(x)
                                }
                            } else {
                                if (s) {
                                    t[y] = false
                                }
                            }
                        }
                    }
                    return false
                }, ID: function (r) {
                    return r[1].replace(/\\/g, "")
                }, TAG: function (s, t) {
                    for (var r = 0; t[r] === false; r++) {
                    }
                    return t[r] && c(t[r]) ? s[1] : s[1].toUpperCase()
                }, CHILD: function (s) {
                    if (s[1] == "nth") {
                        var r = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(s[2] == "even" && "2n" || s[2] == "odd" && "2n+1" || !/\D/.test(s[2]) && "0n+" + s[2] || s[2]);
                        s[2] = (r[1] + (r[2] || 1)) - 0;
                        s[3] = r[3] - 0
                    }
                    s[0] = h++;
                    return s
                }, ATTR: function (x, t, s, u, w, v) {
                    var r = x[1].replace(/\\/g, "");
                    if (!v && m.attrMap[r]) {
                        x[1] = m.attrMap[r]
                    }
                    if (x[2] === "~=") {
                        x[4] = " " + x[4] + " "
                    }
                    return x
                }, PSEUDO: function (w, t, s, u, v) {
                    if (w[1] === "not") {
                        if (w[3].match(b).length > 1 || /^\w/.test(w[3])) {
                            w[3] = p(w[3], null, null, t)
                        } else {
                            var r = p.filter(w[3], t, s, true ^ v);
                            if (!s) {
                                u.push.apply(u, r)
                            }
                            return false
                        }
                    } else {
                        if (m.match.POS.test(w[0]) || m.match.CHILD.test(w[0])) {
                            return true
                        }
                    }
                    return w
                }, POS: function (r) {
                    r.unshift(true);
                    return r
                }
            },
            filters: {
                enabled: function (r) {
                    return r.disabled === false && r.type !== "hidden"
                }, disabled: function (r) {
                    return r.disabled === true
                }, checked: function (r) {
                    return r.checked === true
                }, selected: function (r) {
                    r.parentNode.selectedIndex;
                    return r.selected === true
                }, parent: function (r) {
                    return !!r.firstChild
                }, empty: function (r) {
                    return !r.firstChild
                }, has: function (r, s, t) {
                    return !!p(t[3], r).length
                }, header: function (r) {
                    return /h\d/i.test(r.nodeName)
                }, text: function (r) {
                    return "text" === r.type
                }, radio: function (r) {
                    return "radio" === r.type
                }, checkbox: function (r) {
                    return "checkbox" === r.type
                }, file: function (r) {
                    return "file" === r.type
                }, password: function (r) {
                    return "password" === r.type
                }, submit: function (r) {
                    return "submit" === r.type
                }, image: function (r) {
                    return "image" === r.type
                }, reset: function (r) {
                    return "reset" === r.type
                }, button: function (r) {
                    return "button" === r.type || r.nodeName.toUpperCase() === "BUTTON"
                }, input: function (r) {
                    return /input|select|textarea|button/i.test(r.nodeName)
                }
            },
            setFilters: {
                first: function (r, s) {
                    return s === 0
                }, last: function (s, t, u, r) {
                    return t === r.length - 1
                }, even: function (r, s) {
                    return s % 2 === 0
                }, odd: function (r, s) {
                    return s % 2 === 1
                }, lt: function (r, s, t) {
                    return s < t[3] - 0
                }, gt: function (r, s, t) {
                    return s > t[3] - 0
                }, nth: function (r, s, t) {
                    return t[3] - 0 == s
                }, eq: function (r, s, t) {
                    return t[3] - 0 == s
                }
            },
            filter: {
                PSEUDO: function (w, s, r, v) {
                    var t = s[1], y = m.filters[t];
                    if (y) {
                        return y(w, r, s, v)
                    } else {
                        if (t === "contains") {
                            return (w.textContent || w.innerText || "").indexOf(s[3]) >= 0
                        } else {
                            if (t === "not") {
                                var x = s[3];
                                for (var r = 0, u = x.length; r < u; r++) {
                                    if (x[r] === w) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                }, CHILD: function (y, v) {
                    var s = v[1], x = y;
                    switch (s) {
                        case"only":
                        case"first":
                            while (x = x.previousSibling) {
                                if (x.nodeType === 1) {
                                    return false
                                }
                            }
                            if (s == "first") {
                                return true
                            }
                            x = y;
                        case"last":
                            while (x = x.nextSibling) {
                                if (x.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case"nth":
                            var w = v[2], z = v[3];
                            if (w == 1 && z == 0) {
                                return true
                            }
                            var t = v[0], A = y.parentNode;
                            if (A && (A.sizcache !== t || !y.nodeIndex)) {
                                var u = 0;
                                for (x = A.firstChild; x; x = x.nextSibling) {
                                    if (x.nodeType === 1) {
                                        x.nodeIndex = ++u
                                    }
                                }
                                A.sizcache = t
                            }
                            var r = y.nodeIndex - z;
                            if (w == 0) {
                                return r == 0
                            } else {
                                return (r % w == 0 && r / w >= 0)
                            }
                    }
                }, ID: function (r, s) {
                    return r.nodeType === 1 && r.getAttribute("id") === s
                }, TAG: function (r, s) {
                    return (s === "*" && r.nodeType === 1) || r.nodeName === s
                }, CLASS: function (r, s) {
                    return (" " + (r.className || r.getAttribute("class")) + " ").indexOf(s) > -1
                }, ATTR: function (w, r) {
                    var s = r[1], u = m.attrHandle[s] ? m.attrHandle[s](w) : w[s] != null ? w[s] : w.getAttribute(s),
                        v = u + "", x = r[2], t = r[4];
                    return u == null ? x === "!=" : x === "=" ? v === t : x === "*=" ? v.indexOf(t) >= 0 : x === "~=" ? (" " + v + " ").indexOf(t) >= 0 : !t ? v && u !== false : x === "!=" ? v != t : x === "^=" ? v.indexOf(t) === 0 : x === "$=" ? v.substr(v.length - t.length) === t : x === "|=" ? v === t || v.substr(0, t.length + 1) === t + "-" : false
                }, POS: function (w, t, s, v) {
                    var u = t[2], r = m.setFilters[u];
                    if (r) {
                        return r(w, s, t, v)
                    }
                }
            }
        };
        var g = m.match.POS;
        for (var e in m.match) {
            m.match[e] = RegExp(m.match[e].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var q = function (r, s) {
            r = Array.prototype.slice.call(r);
            if (s) {
                s.push.apply(s, r);
                return s
            }
            return r
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (f) {
            q = function (v, r) {
                var t = r || [];
                if (n.call(v) === "[object Array]") {
                    Array.prototype.push.apply(t, v)
                } else {
                    if (typeof v.length === "number") {
                        for (var s = 0, u = v.length; s < u; s++) {
                            t.push(v[s])
                        }
                    } else {
                        for (var s = 0; v[s]; s++) {
                            t.push(v[s])
                        }
                    }
                }
                return t
            }
        }
        var o;
        if (document.documentElement.compareDocumentPosition) {
            o = function (s, t) {
                var r = s.compareDocumentPosition(t) & 4 ? -1 : s === t ? 0 : 1;
                if (r === 0) {
                    hasDuplicate = true
                }
                return r
            }
        } else {
            if ("sourceIndex" in document.documentElement) {
                o = function (s, t) {
                    var r = s.sourceIndex - t.sourceIndex;
                    if (r === 0) {
                        hasDuplicate = true
                    }
                    return r
                }
            } else {
                if (document.createRange) {
                    o = function (r, t) {
                        var s = r.ownerDocument.createRange(), u = t.ownerDocument.createRange();
                        s.selectNode(r);
                        s.collapse(true);
                        u.selectNode(t);
                        u.collapse(true);
                        var v = s.compareBoundaryPoints(Range.START_TO_END, u);
                        if (v === 0) {
                            hasDuplicate = true
                        }
                        return v
                    }
                }
            }
        }
        (function () {
            var s = document.createElement("form"), r = "script" + (new Date).getTime();
            s.innerHTML = "<input name='" + r + "'/>";
            var t = document.documentElement;
            t.insertBefore(s, t.firstChild);
            if (!!document.getElementById(r)) {
                m.find.ID = function (x, w, v) {
                    if (typeof w.getElementById !== "undefined" && !v) {
                        var u = w.getElementById(x[1]);
                        return u ? u.id === x[1] || typeof u.getAttributeNode !== "undefined" && u.getAttributeNode("id").nodeValue === x[1] ? [u] : ab : []
                    }
                };
                m.filter.ID = function (v, u) {
                    var w = typeof v.getAttributeNode !== "undefined" && v.getAttributeNode("id");
                    return v.nodeType === 1 && w && w.nodeValue === u
                }
            }
            t.removeChild(s)
        })();
        (function () {
            var r = document.createElement("div");
            r.appendChild(document.createComment(""));
            if (r.getElementsByTagName("*").length > 0) {
                m.find.TAG = function (u, v) {
                    var w = v.getElementsByTagName(u[1]);
                    if (u[1] === "*") {
                        var s = [];
                        for (var t = 0; w[t]; t++) {
                            if (w[t].nodeType === 1) {
                                s.push(w[t])
                            }
                        }
                        w = s
                    }
                    return w
                }
            }
            r.innerHTML = "<a href='#'></a>";
            if (r.firstChild && typeof r.firstChild.getAttribute !== "undefined" && r.firstChild.getAttribute("href") !== "#") {
                m.attrHandle.href = function (s) {
                    return s.getAttribute("href", 2)
                }
            }
        })();
        if (document.querySelectorAll) {
            (function () {
                var s = p, r = document.createElement("div");
                r.innerHTML = "<p class='TEST'></p>";
                if (r.querySelectorAll && r.querySelectorAll(".TEST").length === 0) {
                    return
                }
                p = function (w, x, u, t) {
                    x = x || document;
                    if (!t && x.nodeType === 9 && !c(x)) {
                        try {
                            return q(x.querySelectorAll(w), u)
                        } catch (v) {
                        }
                    }
                    return s(w, x, u, t)
                };
                p.find = s.find;
                p.filter = s.filter;
                p.selectors = s.selectors;
                p.matches = s.matches
            })()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function () {
                var r = document.createElement("div");
                r.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (r.getElementsByClassName("e").length === 0) {
                    return
                }
                r.lastChild.className = "e";
                if (r.getElementsByClassName("e").length === 1) {
                    return
                }
                m.order.splice(1, 0, "CLASS");
                m.find.CLASS = function (u, t, s) {
                    if (typeof t.getElementsByClassName !== "undefined" && !s) {
                        return t.getElementsByClassName(u[1])
                    }
                }
            })()
        }

        function d(x, s, t, z, r, A) {
            var B = x == "previousSibling" && !A;
            for (var v = 0, w = z.length; v < w; v++) {
                var y = z[v];
                if (y) {
                    if (B && y.nodeType === 1) {
                        y.sizcache = t;
                        y.sizset = v
                    }
                    y = y[x];
                    var u = false;
                    while (y) {
                        if (y.sizcache === t) {
                            u = z[y.sizset];
                            break
                        }
                        if (y.nodeType === 1 && !A) {
                            y.sizcache = t;
                            y.sizset = v
                        }
                        if (y.nodeName === s) {
                            u = y;
                            break
                        }
                        y = y[x]
                    }
                    z[v] = u
                }
            }
        }

        function a(x, s, t, z, r, A) {
            var B = x == "previousSibling" && !A;
            for (var v = 0, w = z.length; v < w; v++) {
                var y = z[v];
                if (y) {
                    if (B && y.nodeType === 1) {
                        y.sizcache = t;
                        y.sizset = v
                    }
                    y = y[x];
                    var u = false;
                    while (y) {
                        if (y.sizcache === t) {
                            u = z[y.sizset];
                            break
                        }
                        if (y.nodeType === 1) {
                            if (!A) {
                                y.sizcache = t;
                                y.sizset = v
                            }
                            if (typeof s !== "string") {
                                if (y === s) {
                                    u = true;
                                    break
                                }
                            } else {
                                if (p.filter(s, [y]).length > 0) {
                                    u = y;
                                    break
                                }
                            }
                        }
                        y = y[x]
                    }
                    z[v] = u
                }
            }
        }

        var k = document.compareDocumentPosition ? function (r, s) {
            return r.compareDocumentPosition(s) & 16
        } : function (r, s) {
            return r !== s && (r.contains ? r.contains(s) : true)
        };
        var c = function (r) {
            return r.nodeType === 9 && r.documentElement.nodeName !== "HTML" || !!r.ownerDocument && c(r.ownerDocument)
        };
        var l = function (u, w) {
            var r = [], y = "", x, s = w.nodeType ? [w] : w;
            while ((x = m.match.PSEUDO.exec(u))) {
                y += x[0];
                u = u.replace(m.match.PSEUDO, "")
            }
            u = m.relative[u] ? u + "*" : u;
            for (var v = 0, t = s.length; v < t; v++) {
                p(u, s[v], r)
            }
            return p.filter(y, r)
        };
        T.find = p;
        T.filter = p.filter;
        T.expr = p.selectors;
        T.expr[":"] = T.expr.filters;
        p.selectors.filters.hidden = function (r) {
            return r.offsetWidth === 0 || r.offsetHeight === 0
        };
        p.selectors.filters.visible = function (r) {
            return r.offsetWidth > 0 || r.offsetHeight > 0
        };
        p.selectors.filters.animated = function (r) {
            return T.grep(T.timers, function (s) {
                return r === s.elem
            }).length
        };
        T.multiFilter = function (r, t, s) {
            if (s) {
                r = ":not(" + r + ")"
            }
            return p.matches(r, t)
        };
        T.dir = function (s, t) {
            var u = [], r = s[t];
            while (r && r != document) {
                if (r.nodeType == 1) {
                    u.push(r)
                }
                r = r[t]
            }
            return u
        };
        T.nth = function (v, u, s, r) {
            u = u || 1;
            var t = 0;
            for (; v; v = v[s]) {
                if (v.nodeType == 1 && ++t == u) {
                    break
                }
            }
            return v
        };
        T.sibling = function (r, s) {
            var t = [];
            for (; r; r = r.nextSibling) {
                if (r.nodeType == 1 && r != s) {
                    t.push(r)
                }
            }
            return t
        };
        return;
        W.Sizzle = p
    })();
    T.event = {
        add: function (c, f, d, a) {
            if (c.nodeType == 3 || c.nodeType == 8) {
                return
            }
            if (c.setInterval && c != W) {
                c = W
            }
            if (!d.guid) {
                d.guid = this.guid++
            }
            if (a !== ab) {
                var e = d;
                d = this.proxy(e);
                d.data = a
            }
            var g = T.data(c, "events") || T.data(c, "events", {}),
                b = T.data(c, "handle") || T.data(c, "handle", function () {
                    return typeof T !== "undefined" && !T.event.triggered ? T.event.handle.apply(arguments.callee.elem, arguments) : ab
                });
            b.elem = c;
            T.each(f.split(/\s+/), function (m, l) {
                var k = l.split(".");
                l = k.shift();
                d.type = k.slice().sort().join(".");
                var h = g[l];
                if (T.event.specialAll[l]) {
                    T.event.specialAll[l].setup.call(c, a, k)
                }
                if (!h) {
                    h = g[l] = {};
                    if (!T.event.special[l] || T.event.special[l].setup.call(c, a, k) === false) {
                        if (c.addEventListener) {
                            c.addEventListener(l, b, false)
                        } else {
                            if (c.attachEvent) {
                                c.attachEvent("on" + l, b)
                            }
                        }
                    }
                }
                h[d.guid] = d;
                T.event.global[l] = true
            });
            c = null
        },
        guid: 1,
        global: {},
        remove: function (b, e, c) {
            if (b.nodeType == 3 || b.nodeType == 8) {
                return
            }
            var f = T.data(b, "events"), g, h;
            if (f) {
                if (e === ab || (typeof e === "string" && e.charAt(0) == ".")) {
                    for (var d in f) {
                        this.remove(b, d + (e || ""))
                    }
                } else {
                    if (e.type) {
                        c = e.handler;
                        e = e.type
                    }
                    T.each(e.split(/\s+/), function (o, m) {
                        var k = m.split(".");
                        m = k.shift();
                        var n = RegExp("(^|\\.)" + k.slice().sort().join(".*\\.") + "(\\.|$)");
                        if (f[m]) {
                            if (c) {
                                delete f[m][c.guid]
                            } else {
                                for (var l in f[m]) {
                                    if (n.test(f[m][l].type)) {
                                        delete f[m][l]
                                    }
                                }
                            }
                            if (T.event.specialAll[m]) {
                                T.event.specialAll[m].teardown.call(b, k)
                            }
                            for (g in f[m]) {
                                break
                            }
                            if (!g) {
                                if (!T.event.special[m] || T.event.special[m].teardown.call(b, k) === false) {
                                    if (b.removeEventListener) {
                                        b.removeEventListener(m, T.data(b, "handle"), false)
                                    } else {
                                        if (b.detachEvent) {
                                            b.detachEvent("on" + m, T.data(b, "handle"))
                                        }
                                    }
                                }
                                g = null;
                                delete f[m]
                            }
                        }
                    })
                }
                for (g in f) {
                    break
                }
                if (!g) {
                    var a = T.data(b, "handle");
                    if (a) {
                        a.elem = null
                    }
                    T.removeData(b, "events");
                    T.removeData(b, "handle")
                }
            }
        },
        trigger: function (d, b, e, h) {
            var f = d.type || d;
            if (!h) {
                d = typeof d === "object" ? d[aa] ? d : T.extend(T.Event(f), d) : T.Event(f);
                if (f.indexOf("!") >= 0) {
                    d.type = f = f.slice(0, -1);
                    d.exclusive = true
                }
                if (!e) {
                    d.stopPropagation();
                    if (this.global[f]) {
                        T.each(T.cache, function () {
                            if (this.events && this.events[f]) {
                                T.event.trigger(d, b, this.handle.elem)
                            }
                        })
                    }
                }
                if (!e || e.nodeType == 3 || e.nodeType == 8) {
                    return ab
                }
                d.result = ab;
                d.target = e;
                b = T.makeArray(b);
                b.unshift(d)
            }
            d.currentTarget = e;
            var c = T.data(e, "handle");
            if (c) {
                c.apply(e, b)
            }
            if ((!e[f] || (T.nodeName(e, "a") && f == "click")) && e["on" + f] && e["on" + f].apply(e, b) === false) {
                d.result = false
            }
            if (!h && e[f] && !d.isDefaultPrevented() && !(T.nodeName(e, "a") && f == "click")) {
                this.triggered = true;
                try {
                    e[f]()
                } catch (a) {
                }
            }
            this.triggered = false;
            if (!d.isPropagationStopped()) {
                var g = e.parentNode || e.ownerDocument;
                if (g) {
                    T.event.trigger(d, b, g, true)
                }
            }
        },
        handle: function (b) {
            var c, h;
            b = arguments[0] = T.event.fix(b || W.event);
            b.currentTarget = this;
            var a = b.type.split(".");
            b.type = a.shift();
            c = !a.length && !b.exclusive;
            var d = RegExp("(^|\\.)" + a.slice().sort().join(".*\\.") + "(\\.|$)");
            h = (T.data(this, "events") || {})[b.type];
            for (var f in h) {
                var e = h[f];
                if (c || d.test(e.type)) {
                    b.handler = e;
                    b.data = e.data;
                    var g = e.apply(this, arguments);
                    if (g !== ab) {
                        b.result = g;
                        if (g === false) {
                            b.preventDefault();
                            b.stopPropagation()
                        }
                    }
                    if (b.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (c) {
            if (c[aa]) {
                return c
            }
            var e = c;
            c = T.Event(e);
            for (var d = this.props.length, a; d;) {
                a = this.props[--d];
                c[a] = e[a]
            }
            if (!c.target) {
                c.target = c.srcElement || document
            }
            if (c.target.nodeType == 3) {
                c.target = c.target.parentNode
            }
            if (!c.relatedTarget && c.fromElement) {
                c.relatedTarget = c.fromElement == c.target ? c.toElement : c.fromElement
            }
            if (c.pageX == null && c.clientX != null) {
                var b = document.documentElement, f = document.body;
                c.pageX = c.clientX + (b && b.scrollLeft || f && f.scrollLeft || 0) - (b.clientLeft || 0);
                c.pageY = c.clientY + (b && b.scrollTop || f && f.scrollTop || 0) - (b.clientTop || 0)
            }
            if (!c.which && ((c.charCode || c.charCode === 0) ? c.charCode : c.keyCode)) {
                c.which = c.charCode || c.keyCode
            }
            if (!c.metaKey && c.ctrlKey) {
                c.metaKey = c.ctrlKey
            }
            if (!c.which && c.button) {
                c.which = (c.button & 1 ? 1 : (c.button & 2 ? 3 : (c.button & 4 ? 2 : 0)))
            }
            return c
        },
        proxy: function (a, b) {
            b = b || function () {
                return a.apply(this, arguments)
            };
            b.guid = a.guid = a.guid || b.guid || this.guid++;
            return b
        },
        special: {
            ready: {
                setup: P, teardown: function () {
                }
            }
        },
        specialAll: {
            live: {
                setup: function (b, a) {
                    T.event.add(this, a[0], af)
                }, teardown: function (a) {
                    if (a.length) {
                        var c = 0, b = RegExp("(^|\\.)" + a[0] + "(\\.|$)");
                        T.each((T.data(this, "events").live || {}), function () {
                            if (b.test(this.type)) {
                                c++
                            }
                        });
                        if (c < 1) {
                            T.event.remove(this, a[0], af)
                        }
                    }
                }
            }
        }
    };
    T.Event = function (a) {
        if (!this.preventDefault) {
            return new T.Event(a)
        }
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else {
            this.type = a
        }
        this.timeStamp = ad();
        this[aa] = true
    };

    function X() {
        return false
    }

    function J() {
        return true
    }

    T.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.preventDefault) {
                a.preventDefault()
            }
            a.returnValue = false
        }, stopPropagation: function () {
            this.isPropagationStopped = J;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            if (a.stopPropagation) {
                a.stopPropagation()
            }
            a.cancelBubble = true
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = J;
            this.stopPropagation()
        }, isDefaultPrevented: X, isPropagationStopped: X, isImmediatePropagationStopped: X
    };
    var ah = function (b) {
        var c = b.relatedTarget;
        while (c && c != this) {
            try {
                c = c.parentNode
            } catch (a) {
                c = this
            }
        }
        if (c != this) {
            b.type = b.data;
            T.event.handle.apply(this, arguments)
        }
    };
    T.each({mouseover: "mouseenter", mouseout: "mouseleave"}, function (a, b) {
        T.event.special[b] = {
            setup: function () {
                T.event.add(this, a, ah, b)
            }, teardown: function () {
                T.event.remove(this, a, ah)
            }
        }
    });
    T.fn.extend({
        bind: function (b, a, c) {
            return b == "unload" ? this.one(b, a, c) : this.each(function () {
                T.event.add(this, b, c || a, c && a)
            })
        }, one: function (b, a, c) {
            var d = T.event.proxy(c || a, function (e) {
                T(this).unbind(e, d);
                return (c || a).apply(this, arguments)
            });
            return this.each(function () {
                T.event.add(this, b, d, c && a)
            })
        }, unbind: function (a, b) {
            return this.each(function () {
                T.event.remove(this, a, b)
            })
        }, trigger: function (b, a) {
            return this.each(function () {
                T.event.trigger(b, a, this)
            })
        }, triggerHandler: function (c, a) {
            if (this[0]) {
                var b = T.Event(c);
                b.preventDefault();
                b.stopPropagation();
                T.event.trigger(b, a, this[0]);
                return b.result
            }
        }, toggle: function (a) {
            var c = arguments, b = 1;
            while (b < c.length) {
                T.event.proxy(a, c[b++])
            }
            return this.click(T.event.proxy(a, function (d) {
                this.lastToggle = (this.lastToggle || 0) % b;
                d.preventDefault();
                return c[this.lastToggle++].apply(this, arguments) || false
            }))
        }, hover: function (b, a) {
            return this.mouseenter(b).mouseleave(a)
        }, ready: function (a) {
            P();
            if (T.isReady) {
                a.call(document, T)
            } else {
                T.readyList.push(a)
            }
            return this
        }, live: function (a, b) {
            var c = T.event.proxy(b);
            c.guid += this.selector + a;
            T(document).bind(Z(a, this.selector), this.selector, c);
            return this
        }, die: function (a, b) {
            T(document).unbind(Z(a, this.selector), b ? {guid: b.guid + this.selector + a} : null);
            return this
        }
    });

    function af(a) {
        var d = RegExp("(^|\\.)" + a.type + "(\\.|$)"), b = true, c = [];
        T.each(T.data(this, "events").live || [], function (g, f) {
            if (d.test(f.type)) {
                var e = T(a.target).closest(f.data)[0];
                if (e) {
                    c.push({elem: e, fn: f})
                }
            }
        });
        c.sort(function (e, f) {
            return T.data(e.elem, "closest") - T.data(f.elem, "closest")
        });
        T.each(c, function () {
            if (this.fn.call(this.elem, a, this.fn.data) === false) {
                return (b = false)
            }
        });
        return b
    }

    function Z(a, b) {
        return ["live", a, b.replace(/\./g, "`").replace(/ /g, "|")].join(".")
    }

    T.extend({
        isReady: false, readyList: [], ready: function () {
            if (!T.isReady) {
                T.isReady = true;
                if (T.readyList) {
                    T.each(T.readyList, function () {
                        this.call(document, T)
                    });
                    T.readyList = null
                }
                T(document).triggerHandler("ready")
            }
        }
    });
    var G = false;

    function P() {
        if (G) {
            return
        }
        G = true;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                T.ready()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        T.ready()
                    }
                });
                if (document.documentElement.doScroll && W == W.top) {
                    (function () {
                        if (T.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch (a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        T.ready()
                    })()
                }
            }
        }
        T.event.add(W, "load", T.ready)
    }

    T.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","), function (a, b) {
        T.fn[b] = function (c) {
            return c ? this.bind(b, c) : this.trigger(b)
        }
    });
    T(W).bind("unload", function () {
        for (var a in T.cache) {
            if (a != 1 && T.cache[a].handle) {
                T.event.remove(T.cache[a].handle.elem)
            }
        }
    });
    (function () {
        T.support = {};
        var f = document.documentElement, e = document.createElement("script"), a = document.createElement("div"),
            b = "script" + (new Date).getTime();
        a.style.display = "none";
        a.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var d = a.getElementsByTagName("*"), g = a.getElementsByTagName("a")[0];
        if (!d || !d.length || !g) {
            return
        }
        T.support = {
            leadingWhitespace: a.firstChild.nodeType == 3,
            tbody: !a.getElementsByTagName("tbody").length,
            objectAll: !!a.getElementsByTagName("object")[0].getElementsByTagName("*").length,
            htmlSerialize: !!a.getElementsByTagName("link").length,
            style: /red/.test(g.getAttribute("style")),
            hrefNormalized: g.getAttribute("href") === "/a",
            opacity: g.style.opacity === "0.5",
            cssFloat: !!g.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        e.type = "text/javascript";
        try {
            e.appendChild(document.createTextNode("window." + b + "=1;"))
        } catch (c) {
        }
        f.insertBefore(e, f.firstChild);
        if (W[b]) {
            T.support.scriptEval = true;
            delete W[b]
        }
        f.removeChild(e);
        if (a.attachEvent && a.fireEvent) {
            a.attachEvent("onclick", function () {
                T.support.noCloneEvent = false;
                a.detachEvent("onclick", arguments.callee)
            });
            a.cloneNode(true).fireEvent("onclick")
        }
        T(function () {
            var h = document.createElement("div");
            h.style.width = h.style.paddingLeft = "1px";
            document.body.appendChild(h);
            T.boxModel = T.support.boxModel = h.offsetWidth === 2;
            document.body.removeChild(h).style.display = "none"
        })
    })();
    var H = T.support.cssFloat ? "cssFloat" : "styleFloat";
    T.props = {
        "for": "htmlFor",
        "class": "className",
        "float": H,
        cssFloat: H,
        styleFloat: H,
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        tabindex: "tabIndex"
    };
    T.fn.extend({
        _load: T.fn.load, load: function (e, b, a) {
            if (typeof e !== "string") {
                return this._load(e)
            }
            var c = e.indexOf(" ");
            if (c >= 0) {
                var g = e.slice(c, e.length);
                e = e.slice(0, c)
            }
            var d = "GET";
            if (b) {
                if (T.isFunction(b)) {
                    a = b;
                    b = null
                } else {
                    if (typeof b === "object") {
                        b = T.param(b);
                        d = "POST"
                    }
                }
            }
            var f = this;
            T.ajax({
                url: e, type: d, dataType: "html", data: b, complete: function (k, h) {
                    if (h == "success" || h == "notmodified") {
                        f.html(g ? T("<div/>").append(k.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(g) : k.responseText)
                    }
                    if (a) {
                        f.each(a, [k.responseText, h, k])
                    }
                }
            });
            return this
        }, serialize: function () {
            return T.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? T.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }).map(function (c, b) {
                var a = T(this).val();
                return a == null ? null : T.isArray(a) ? T.map(a, function (d, e) {
                    return {name: b.name, value: d}
                }) : {name: b.name, value: a}
            }).get()
        }
    });
    T.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function (b, a) {
        T.fn[a] = function (c) {
            return this.bind(a, c)
        }
    });
    var N = ad();
    T.extend({
        get: function (d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = null
            }
            return T.ajax({type: "GET", url: d, data: b, success: a, dataType: c})
        },
        getScript: function (b, a) {
            return T.get(b, null, a, "script")
        },
        getJSON: function (c, b, a) {
            return T.get(c, b, a, "json")
        },
        post: function (d, b, a, c) {
            if (T.isFunction(b)) {
                a = b;
                b = {}
            }
            return T.ajax({type: "POST", url: d, data: b, success: a, dataType: c})
        },
        ajaxSetup: function (a) {
            T.extend(T.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function () {
                return W.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function (m) {
            m = T.extend(true, m, T.extend(true, {}, T.ajaxSettings, m));
            var a, t = /=\?(&|$)/g, f, b, s = m.type.toUpperCase();
            if (m.data && m.processData && typeof m.data !== "string") {
                m.data = T.param(m.data)
            }
            if (m.dataType == "jsonp") {
                if (s == "GET") {
                    if (!m.url.match(t)) {
                        m.url += (m.url.match(/\?/) ? "&" : "?") + (m.jsonp || "callback") + "=?"
                    }
                } else {
                    if (!m.data || !m.data.match(t)) {
                        m.data = (m.data ? m.data + "&" : "") + (m.jsonp || "callback") + "=?"
                    }
                }
                m.dataType = "json"
            }
            if (m.dataType == "json" && (m.data && m.data.match(t) || m.url.match(t))) {
                a = "jsonp" + N++;
                if (m.data) {
                    m.data = (m.data + "").replace(t, "=" + a + "$1")
                }
                m.url = m.url.replace(t, "=" + a + "$1");
                m.dataType = "script";
                W[a] = function (w) {
                    b = w;
                    q();
                    n();
                    W[a] = ab;
                    try {
                        delete W[a]
                    } catch (v) {
                    }
                    if (r) {
                        r.removeChild(d)
                    }
                }
            }
            if (m.dataType == "script" && m.cache == null) {
                m.cache = false
            }
            if (m.cache === false && s == "GET") {
                var u = ad();
                var c = m.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + u + "$2");
                m.url = c + ((c == m.url) ? (m.url.match(/\?/) ? "&" : "?") + "_=" + u : "")
            }
            if (m.data && s == "GET") {
                m.url += (m.url.match(/\?/) ? "&" : "?") + m.data;
                m.data = null
            }
            if (m.global && !T.active++) {
                T.event.trigger("ajaxStart")
            }
            var g = /^(\w+:)?\/\/([^\/?#]+)/.exec(m.url);
            if (m.dataType == "script" && s == "GET" && g && (g[1] && g[1] != location.protocol || g[2] != location.host)) {
                var r = document.getElementsByTagName("head")[0];
                var d = document.createElement("script");
                d.src = m.url;
                if (m.scriptCharset) {
                    d.charset = m.scriptCharset
                }
                if (!a) {
                    var k = false;
                    d.onload = d.onreadystatechange = function () {
                        if (!k && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            k = true;
                            q();
                            n();
                            d.onload = d.onreadystatechange = null;
                            r.removeChild(d)
                        }
                    }
                }
                r.appendChild(d);
                return ab
            }
            var o = false;
            var p = m.xhr();
            if (m.username) {
                p.open(s, m.url, m.async, m.username, m.password)
            } else {
                p.open(s, m.url, m.async)
            }
            try {
                if (m.data) {
                    p.setRequestHeader("Content-Type", m.contentType)
                }
                if (m.ifModified) {
                    p.setRequestHeader("If-Modified-Since", T.lastModified[m.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                }
                p.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                p.setRequestHeader("Accept", m.dataType && m.accepts[m.dataType] ? m.accepts[m.dataType] + ", */*" : m.accepts._default)
            } catch (e) {
            }
            if (m.beforeSend && m.beforeSend(p, m) === false) {
                if (m.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
                p.abort();
                return false
            }
            if (m.global) {
                T.event.trigger("ajaxSend", [p, m])
            }
            var l = function (x) {
                if (p.readyState == 0) {
                    if (h) {
                        clearInterval(h);
                        h = null;
                        if (m.global && !--T.active) {
                            T.event.trigger("ajaxStop")
                        }
                    }
                } else {
                    if (!o && p && (p.readyState == 4 || x == "timeout")) {
                        o = true;
                        if (h) {
                            clearInterval(h);
                            h = null
                        }
                        f = x == "timeout" ? "timeout" : !T.httpSuccess(p) ? "error" : m.ifModified && T.httpNotModified(p, m.url) ? "notmodified" : "success";
                        if (f == "success") {
                            try {
                                b = T.httpData(p, m.dataType, m)
                            } catch (v) {
                                f = "parsererror"
                            }
                        }
                        if (f == "success") {
                            var w;
                            try {
                                w = p.getResponseHeader("Last-Modified")
                            } catch (v) {
                            }
                            if (m.ifModified && w) {
                                T.lastModified[m.url] = w
                            }
                            if (!a) {
                                q()
                            }
                        } else {
                            T.handleError(m, p, f)
                        }
                        n();
                        if (x) {
                            p.abort()
                        }
                        if (m.async) {
                            p = null
                        }
                    }
                }
            };
            if (m.async) {
                var h = setInterval(l, 13);
                if (m.timeout > 0) {
                    setTimeout(function () {
                        if (p && !o) {
                            l("timeout")
                        }
                    }, m.timeout)
                }
            }
            try {
                p.send(m.data)
            } catch (e) {
                T.handleError(m, p, null, e)
            }
            if (!m.async) {
                l()
            }

            function q() {
                if (m.success) {
                    m.success(b, f)
                }
                if (m.global) {
                    T.event.trigger("ajaxSuccess", [p, m])
                }
            }

            function n() {
                if (m.complete) {
                    m.complete(p, f)
                }
                if (m.global) {
                    T.event.trigger("ajaxComplete", [p, m])
                }
                if (m.global && !--T.active) {
                    T.event.trigger("ajaxStop")
                }
            }

            return p
        },
        handleError: function (c, a, d, b) {
            if (c.error) {
                c.error(a, d, b)
            }
            if (c.global) {
                T.event.trigger("ajaxError", [a, c, b])
            }
        },
        active: 0,
        httpSuccess: function (a) {
            try {
                return !a.status && location.protocol == "file:" || (a.status >= 200 && a.status < 300) || a.status == 304 || a.status == 1223
            } catch (b) {
            }
            return false
        },
        httpNotModified: function (b, d) {
            try {
                var a = b.getResponseHeader("Last-Modified");
                return b.status == 304 || a == T.lastModified[d]
            } catch (c) {
            }
            return false
        },
        httpData: function (a, c, d) {
            var e = a.getResponseHeader("content-type"), f = c == "xml" || !c && e && e.indexOf("xml") >= 0,
                b = f ? a.responseXML : a.responseText;
            if (f && b.documentElement.tagName == "parsererror") {
                throw"parsererror"
            }
            if (d && d.dataFilter) {
                b = d.dataFilter(b, c)
            }
            if (typeof b === "string") {
                if (c == "script") {
                    T.globalEval(b)
                }
                if (c == "json") {
                    b = W["eval"]("(" + b + ")")
                }
            }
            return b
        },
        param: function (d) {
            var b = [];

            function a(f, e) {
                b[b.length] = encodeURIComponent(f) + "=" + encodeURIComponent(e)
            }

            if (T.isArray(d) || d.jquery) {
                T.each(d, function () {
                    a(this.name, this.value)
                })
            } else {
                for (var c in d) {
                    if (T.isArray(d[c])) {
                        T.each(d[c], function () {
                            a(c, this)
                        })
                    } else {
                        a(c, T.isFunction(d[c]) ? d[c]() : d[c])
                    }
                }
            }
            return b.join("&").replace(/%20/g, "+")
        }
    });
    var V = {}, U,
        ae = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];

    function K(b, c) {
        var a = {};
        T.each(ae.concat.apply([], ae.slice(0, c)), function () {
            a[this] = b
        });
        return a
    }

    T.fn.extend({
        show: function (c, a) {
            if (c) {
                return this.animate(K("show", 3), c, a)
            } else {
                for (var e = 0, g = this.length; e < g; e++) {
                    var h = T.data(this[e], "olddisplay");
                    this[e].style.display = h || "";
                    if (T.css(this[e], "display") === "none") {
                        var f = this[e].tagName, b;
                        if (V[f]) {
                            b = V[f]
                        } else {
                            var d = T("<" + f + " />").appendTo("body");
                            b = d.css("display");
                            if (b === "none") {
                                b = "block"
                            }
                            d.remove();
                            V[f] = b
                        }
                        T.data(this[e], "olddisplay", b)
                    }
                }
                for (var e = 0, g = this.length; e < g; e++) {
                    this[e].style.display = T.data(this[e], "olddisplay") || ""
                }
                return this
            }
        }, hide: function (b, a) {
            if (b) {
                return this.animate(K("hide", 3), b, a)
            } else {
                for (var c = 0, d = this.length; c < d; c++) {
                    var e = T.data(this[c], "olddisplay");
                    if (!e && e !== "none") {
                        T.data(this[c], "olddisplay", T.css(this[c], "display"))
                    }
                }
                for (var c = 0, d = this.length; c < d; c++) {
                    this[c].style.display = "none"
                }
                return this
            }
        }, _toggle: T.fn.toggle, toggle: function (a, b) {
            var c = typeof a === "boolean";
            return T.isFunction(a) && T.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || c ? this.each(function () {
                var d = c ? a : T(this).is(":hidden");
                T(this)[d ? "show" : "hide"]()
            }) : this.animate(K("toggle", 3), a, b)
        }, fadeTo: function (c, a, b) {
            return this.animate({opacity: a}, c, b)
        }, animate: function (a, d, b, c) {
            var e = T.speed(d, b, c);
            return this[e.queue === false ? "each" : "queue"](function () {
                var g = T.extend({}, e), k, f = this.nodeType == 1 && T(this).is(":hidden"), h = this;
                for (k in a) {
                    if (a[k] == "hide" && f || a[k] == "show" && !f) {
                        return g.complete.call(this)
                    }
                    if ((k == "height" || k == "width") && this.style) {
                        g.display = T.css(this, "display");
                        g.overflow = this.style.overflow
                    }
                }
                if (g.overflow != null) {
                    this.style.overflow = "hidden"
                }
                g.curAnim = T.extend({}, a);
                T.each(a, function (q, m) {
                    var n = new T.fx(h, g, q);
                    if (/toggle|show|hide/.test(m)) {
                        n[m == "toggle" ? f ? "show" : "hide" : m](a)
                    } else {
                        var o = m.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/), l = n.cur(true) || 0;
                        if (o) {
                            var r = parseFloat(o[2]), p = o[3] || "px";
                            if (p != "px") {
                                h.style[q] = (r || 1) + p;
                                l = ((r || 1) / n.cur(true)) * l;
                                h.style[q] = l + p
                            }
                            if (o[1]) {
                                r = ((o[1] == "-=" ? -1 : 1) * r) + l
                            }
                            n.custom(l, r, p)
                        } else {
                            n.custom(l, m, "")
                        }
                    }
                });
                return true
            })
        }, stop: function (b, c) {
            var a = T.timers;
            if (b) {
                this.queue([])
            }
            this.each(function () {
                for (var d = a.length - 1; d >= 0; d--) {
                    if (a[d].elem == this) {
                        if (c) {
                            a[d](true)
                        }
                        a.splice(d, 1)
                    }
                }
            });
            if (!c) {
                this.dequeue()
            }
            return this
        }
    });
    T.each({
        slideDown: K("show", 1),
        slideUp: K("hide", 1),
        slideToggle: K("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"}
    }, function (b, a) {
        T.fn[b] = function (d, c) {
            return this.animate(a, d, c)
        }
    });
    T.extend({
        speed: function (b, a, c) {
            var d = typeof b === "object" ? b : {
                complete: c || !c && a || T.isFunction(b) && b,
                duration: b,
                easing: c && a || a && !T.isFunction(a) && a
            };
            d.duration = T.fx.off ? 0 : typeof d.duration === "number" ? d.duration : T.fx.speeds[d.duration] || T.fx.speeds._default;
            d.old = d.complete;
            d.complete = function () {
                if (d.queue !== false) {
                    T(this).dequeue()
                }
                if (T.isFunction(d.old)) {
                    d.old.call(this)
                }
            };
            return d
        }, easing: {
            linear: function (b, a, d, c) {
                return d + c * b
            }, swing: function (b, a, d, c) {
                return ((-Math.cos(b * Math.PI) / 2) + 0.5) * c + d
            }
        }, timers: [], fx: function (b, c, a) {
            this.options = c;
            this.elem = b;
            this.prop = a;
            if (!c.orig) {
                c.orig = {}
            }
        }
    });
    T.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            (T.fx.step[this.prop] || T.fx.step._default)(this);
            if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        }, cur: function (a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var b = parseFloat(T.css(this.elem, this.prop, a));
            return b && b > -10000 ? b : parseFloat(T.curCSS(this.elem, this.prop)) || 0
        }, custom: function (a, b, c) {
            this.startTime = ad();
            this.start = a;
            this.end = b;
            this.unit = c || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var e = this;

            function d(f) {
                return e.step(f)
            }

            d.elem = this.elem;
            if (d() && T.timers.push(d) && !U) {
                U = setInterval(function () {
                    var f = T.timers;
                    for (var g = 0; g < f.length; g++) {
                        if (!f[g]()) {
                            f.splice(g--, 1)
                        }
                    }
                    if (!f.length) {
                        clearInterval(U);
                        U = ab
                    }
                }, 13)
            }
        }, show: function () {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());
            T(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = T.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        }, step: function (c) {
            var d = ad();
            if (c || d >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var f = true;
                for (var e in this.options.curAnim) {
                    if (this.options.curAnim[e] !== true) {
                        f = false
                    }
                }
                if (f) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (T.css(this.elem, "display") == "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    if (this.options.hide) {
                        T(this.elem).hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var b in this.options.curAnim) {
                            T.attr(this.elem.style, b, this.options.orig[b])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var a = d - this.startTime;
                this.state = a / this.options.duration;
                this.pos = T.easing[this.options.easing || (T.easing.swing ? "swing" : "linear")](this.state, a, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    T.extend(T.fx, {
        speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                T.attr(a.elem.style, "opacity", a.now)
            }, _default: function (a) {
                if (a.elem.style && a.elem.style[a.prop] != null) {
                    a.elem.style[a.prop] = a.now + a.unit
                } else {
                    a.elem[a.prop] = a.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        T.fn.offset = function () {
            if (!this[0]) {
                return {top: 0, left: 0}
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            var f = this[0].getBoundingClientRect(), c = this[0].ownerDocument, g = c.body, h = c.documentElement,
                a = h.clientTop || g.clientTop || 0, b = h.clientLeft || g.clientLeft || 0,
                d = f.top + (self.pageYOffset || T.boxModel && h.scrollTop || g.scrollTop) - a,
                e = f.left + (self.pageXOffset || T.boxModel && h.scrollLeft || g.scrollLeft) - b;
            return {top: d, left: e}
        }
    } else {
        T.fn.offset = function () {
            if (!this[0]) {
                return {top: 0, left: 0}
            }
            if (this[0] === this[0].ownerDocument.body) {
                return T.offset.bodyOffset(this[0])
            }
            T.offset.initialized || T.offset.initialize();
            var f = this[0], k = f.offsetParent, l = f, a = f.ownerDocument, c, h = a.documentElement, e = a.body,
                d = a.defaultView, m = d.getComputedStyle(f, null), b = f.offsetTop, g = f.offsetLeft;
            while ((f = f.parentNode) && f !== e && f !== h) {
                c = d.getComputedStyle(f, null);
                b -= f.scrollTop, g -= f.scrollLeft;
                if (f === k) {
                    b += f.offsetTop, g += f.offsetLeft;
                    if (T.offset.doesNotAddBorder && !(T.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(f.tagName))) {
                        b += parseInt(c.borderTopWidth, 10) || 0, g += parseInt(c.borderLeftWidth, 10) || 0
                    }
                    l = k, k = f.offsetParent
                }
                if (T.offset.subtractsBorderForOverflowNotVisible && c.overflow !== "visible") {
                    b += parseInt(c.borderTopWidth, 10) || 0, g += parseInt(c.borderLeftWidth, 10) || 0
                }
                m = c
            }
            if (m.position === "relative" || m.position === "static") {
                b += e.offsetTop, g += e.offsetLeft
            }
            if (m.position === "fixed") {
                b += Math.max(h.scrollTop, e.scrollTop), g += Math.max(h.scrollLeft, e.scrollLeft)
            }
            return {top: b, left: g}
        }
    }
    T.offset = {
        initialize: function () {
            if (this.initialized) {
                return
            }
            var c = document.body, k = document.createElement("div"), g, h, a, f, b, l, e = c.style.marginTop,
                d = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            b = {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            };
            for (l in b) {
                k.style[l] = b[l]
            }
            k.innerHTML = d;
            c.insertBefore(k, c.firstChild);
            g = k.firstChild, h = g.firstChild, f = g.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (h.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (f.offsetTop === 5);
            g.style.overflow = "hidden", g.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (h.offsetTop === -5);
            c.style.marginTop = "1px";
            this.doesNotIncludeMarginInBodyOffset = (c.offsetTop === 0);
            c.style.marginTop = e;
            c.removeChild(k);
            this.initialized = true
        }, bodyOffset: function (c) {
            T.offset.initialized || T.offset.initialize();
            var a = c.offsetTop, b = c.offsetLeft;
            if (T.offset.doesNotIncludeMarginInBodyOffset) {
                a += parseInt(T.curCSS(c, "marginTop", true), 10) || 0, b += parseInt(T.curCSS(c, "marginLeft", true), 10) || 0
            }
            return {top: a, left: b}
        }
    };
    T.fn.extend({
        position: function () {
            var b = 0, c = 0, e;
            if (this[0]) {
                var d = this.offsetParent(), a = this.offset(),
                    f = /^body|html$/i.test(d[0].tagName) ? {top: 0, left: 0} : d.offset();
                a.top -= Y(this, "marginTop");
                a.left -= Y(this, "marginLeft");
                f.top += Y(d, "borderTopWidth");
                f.left += Y(d, "borderLeftWidth");
                e = {top: a.top - f.top, left: a.left - f.left}
            }
            return e
        }, offsetParent: function () {
            var a = this[0].offsetParent || document.body;
            while (a && (!/^body|html$/i.test(a.tagName) && T.css(a, "position") == "static")) {
                a = a.offsetParent
            }
            return T(a)
        }
    });
    T.each(["Left", "Top"], function (b, c) {
        var a = "scroll" + c;
        T.fn[a] = function (d) {
            if (!this[0]) {
                return null
            }
            return d !== ab ? this.each(function () {
                this == W || this == document ? W.scrollTo(!b ? d : T(W).scrollLeft(), b ? d : T(W).scrollTop()) : this[a] = d
            }) : this[0] == W || this[0] == document ? self[b ? "pageYOffset" : "pageXOffset"] || T.boxModel && document.documentElement[a] || document.body[a] : this[0][a]
        }
    });
    T.each(["Height", "Width"], function (b, d) {
        var f = b ? "Left" : "Top", c = b ? "Right" : "Bottom", e = d.toLowerCase();
        T.fn["inner" + d] = function () {
            return this[0] ? T.css(this[0], e, false, "padding") : null
        };
        T.fn["outer" + d] = function (g) {
            return this[0] ? T.css(this[0], e, false, g ? "margin" : "border") : null
        };
        var a = d.toLowerCase();
        T.fn[a] = function (g) {
            return this[0] == W ? document.compatMode == "CSS1Compat" && document.documentElement["client" + d] || document.body["client" + d] : this[0] == document ? Math.max(document.documentElement["client" + d], document.body["scroll" + d], document.documentElement["scroll" + d], document.body["offset" + d], document.documentElement["offset" + d]) : g === ab ? (this.length ? T.css(this[0], a) : null) : this.css(a, typeof g === "string" ? g : g + "px")
        }
    })
})();
(function (k) {
    function g(m) {
        var l = m.replace(".html", "");
        return l.replace("#", "")
    }

    function h(m) {
        if (m.xorigin == "left") {
            m.xorigin = 0
        } else {
            if (m.xorigin == "middle" || m.xorigin == "centre" || m.xorigin == "center") {
                m.xorigin = 0.5
            } else {
                if (m.xorigin == "right") {
                    m.xorigin = 1
                }
            }
        }
        if (m.yorigin == "top") {
            m.yorigin = 0
        } else {
            if (m.yorigin == "middle" || m.yorigin == "centre" || m.yorigin == "center") {
                m.yorigin = 0.5
            } else {
                if (m.yorigin == "bottom") {
                    m.yorigin = 1
                }
            }
        }
    }

    function e(m, l, n) {
        var o = {x: 0, y: 0, sum: 0};
        if (!m.ontarget) {
            o.x = n.x - l.x;
            o.y = n.y - l.y;
            o.sum = Math.sqrt(o.x * o.x + o.y * o.y);
            n.x = l.x + o.x * m.takeoverFactor;
            n.y = l.y + o.y * m.takeoverFactor;
            if (o.sum < m.takeoverThresh && o.sum > m.takeoverThresh * -1) {
                m.ontarget = true
            }
        } else {
            n.x = l.x;
            n.y = l.y
        }
    }

    function d(l, m) {
        var n = m.element.offset();
        k.extend(l, {width: l.element.width(), height: l.element.height()});
        k.extend(m, {width: m.element.width(), height: m.element.height(), top: n.top, left: n.left})
    }

    function c(p, m, n) {
        var o;
        var l;
        if (typeof (p) === "string") {
            if (p.search(/^\d+\s?px$/) != -1) {
                p = p.replace("px", "");
                p = parseInt(p, 10);
                o = m * (n - p);
                l = m * 100 + "%";
                return {travel: p, travelpx: true, offset: o, cssPos: l}
            } else {
                if (p.search(/^\d+\s?%$/) != -1) {
                    p.replace("%", "");
                    p = parseInt(p, 10) / 100
                } else {
                    p = 1
                }
            }
        }
        o = m * (1 - p);
        return {travel: p, travelpx: false, offset: o}
    }

    function b(m, l, q) {
        var p;
        var n;
        var o = {};
        m[l] = k.extend({}, {width: m[l].element.width(), height: m[l].element.height()}, m[l]);
        p = c(m[l].xtravel, m[l].xorigin, m[l].width);
        n = c(m[l].ytravel, m[l].yorigin, m[l].height);
        k.extend(m[l], {
            diffxrat: q.width / (m[l].width - q.width),
            diffyrat: q.height / (m[l].height - q.height),
            xtravel: p.travel,
            ytravel: n.travel,
            xtravelpx: p.travelpx,
            ytravelpx: n.travelpx,
            xoffset: p.offset,
            yoffset: n.offset
        });
        if (p.travelpx) {
            o.left = p.cssPos
        }
        if (n.travelpx) {
            o.top = n.cssPos
        }
        if (p.travelpx || n.travelpx) {
            m[l].element.css(o)
        }
    }

    function f(p, o, l) {
        var m;
        k.extend(p[o], {content: []});
        for (var q = 0; q < p[o].element.children().length; q++) {
            if (!p[o].content[q]) {
                p[o].content[q] = {}
            }
            if (!p[o].content[q].element) {
                p[o].content[q]["element"] = p[o].element.children().eq(q)
            }
            if (!p[o].content[q].anchor && p[o].content[q].element.children("a").attr("name")) {
                p[o].content[q]["anchor"] = p[o].content[q].element.children("a").attr("name")
            }
            if (p[o].content[q].anchor) {
                m = p[o].content[q].element.offset();
                k.extend(p[o].content[q], {
                    width: p[o].content[q].element.width(),
                    height: p[o].content[q].element.height(),
                    x: m.left - l.left,
                    y: m.top - l.top
                });
                k.extend(p[o].content[q], {
                    posxrat: (p[o].content[q].x + p[o].content[q].width / 2) / p[o].width,
                    posyrat: (p[o].content[q].y + p[o].content[q].height / 2) / p[o].height
                })
            }
        }
    }

    function a(n, q, p) {
        var l;
        var r;
        var o;
        for (var m = 0; m < n.length; m++) {
            l = n[m].xtravel * q + n[m].xoffset;
            r = n[m].ytravel * p + n[m].yoffset;
            o = {};
            if (n[m].xparallax) {
                if (n[m].xtravelpx) {
                    o.marginLeft = l * -1 + "px"
                } else {
                    o.left = l * 100 + "%";
                    o.marginLeft = l * n[m].width * -1 + "px"
                }
            }
            if (n[m].yparallax) {
                if (n[m].ytravelpx) {
                    o.marginTop = r * -1 + "px"
                } else {
                    o.top = r * 100 + "%";
                    o.marginTop = r * n[m].height * -1 + "px"
                }
            }
            n[m].element.css(o)
        }
    }

    k.fn.jparallax = function (n) {
        var o = k().extend({}, k.fn.jparallax.settings, n);
        var p = {
            xparallax: o.xparallax,
            yparallax: o.yparallax,
            xorigin: o.xorigin,
            yorigin: o.yorigin,
            xtravel: o.xtravel,
            ytravel: o.ytravel
        };
        var l = {element: o.mouseport, takeoverFactor: o.takeoverFactor, takeoverThresh: o.takeoverThresh};
        if (o.mouseport) {
            l.element = o.mouseport
        }
        var q = [];
        for (var m = 1; m < arguments.length; m++) {
            q.push(k.extend({}, p, arguments[m]))
        }
        return this.each(function () {
            var t = {x: 0.5, y: 0.5};
            var x = {x: 0.5, y: 0.5};
            var y = {
                running: false, frame: o.frameDuration, fire: function (z, A) {
                    e(w, t, x);
                    a(v, x.x, x.y);
                    this.running = setTimeout(function () {
                        if (t.x != z || t.y != A || !w.ontarget) {
                            y.fire(t.x, t.y)
                        } else {
                            if (y.running) {
                                y.running = false
                            }
                        }
                    }, y.frame)
                }
            };
            var r = {element: k(this)};
            var w = k.extend({}, {element: r.element}, l, {
                xinside: false,
                yinside: false,
                active: false,
                ontarget: false
            });
            var v = [];

            function s(A, B, E) {
                for (var z = 0; z < A.length; z++) {
                    var C = false;
                    for (var D = 0; D < A[z].content.length; D++) {
                        if (A[z].content[D].anchor == B) {
                            E(z, D);
                            return [z, D]
                        }
                    }
                }
                return false
            }

            d(r, w);
            for (var u = 0; u < r.element.children().length; u++) {
                v[u] = k.extend({}, p, q[u], {element: r.element.children("*:eq(" + u + ")")});
                b(v, u, w);
                if (o.triggerResponse) {
                    f(v, u, r.element.offset())
                }
            }
            r.element.children().css("position", "absolute");
            a(v, 0.5, 0.5);
            if (o.mouseResponse) {
                k().mousemove(function (z) {
                    w.xinside = (z.pageX >= w.left && z.pageX < w.width + w.left) ? true : false;
                    w.yinside = (z.pageY >= w.top && z.pageY < w.height + w.top) ? true : false;
                    if (w.xinside && w.yinside && !w.active) {
                        w.ontarget = false;
                        w.active = true
                    }
                    if (w.active) {
                        if (w.xinside) {
                            t.x = (z.pageX - w.left) / w.width
                        } else {
                            t.x = (z.pageX < w.left) ? 0 : 1
                        }
                        if (w.yinside) {
                            t.y = (z.pageY - w.top) / w.height
                        } else {
                            t.y = (z.pageY < w.top) ? 0 : 1
                        }
                    }
                    if (w.xinside && w.yinside) {
                        if (!y.running) {
                            y.fire(t.x, t.y)
                        }
                    } else {
                        if (w.active) {
                            w.active = false
                        }
                    }
                })
            }
            if (o.triggerResponse) {
                r.element.bind("jparallax", function (A, z) {
                    z = g(z);
                    s(v, z, function (B, C) {
                        t.x = v[B].content[C].posxrat * (v[B].diffxrat + 1) - (0.5 * v[B].diffxrat);
                        t.y = v[B].content[C].posyrat * (v[B].diffyrat + 1) - (0.5 * v[B].diffyrat);
                        if (!o.triggerExposesEdges) {
                            if (t.x < 0) {
                                t.x = 0
                            }
                            if (t.x > 1) {
                                t.x = 1
                            }
                            if (t.y < 0) {
                                t.y = 0
                            }
                            if (t.y > 1) {
                                t.y = 1
                            }
                        }
                        w.ontarget = false;
                        if (!y.running) {
                            y.fire(t.x, t.y)
                        }
                    })
                })
            }
            k(window).resize(function () {
                d(r, w);
                for (var z = 0; z < v.length; z++) {
                    b(v, z, w)
                }
            })
        })
    };
    k.fn.jparallax.settings = {
        mouseResponse: true,
        mouseActiveOutside: false,
        triggerResponse: true,
        triggerExposesEdges: false,
        xparallax: true,
        yparallax: true,
        xorigin: 0.5,
        yorigin: 0.5,
        xtravel: 1,
        ytravel: 1,
        takeoverFactor: 0.65,
        takeoverThresh: 0.002,
        frameDuration: 25
    };
    h(k.fn.jparallax.settings);
    k(function () {
    })
})(jQuery);
(function (a) {
    a.fn.kwicks = function (b) {
        var c = {isVertical: false, sticky: false, defaultKwick: 0, event: "mouseover", spacing: 0, duration: 500};
        var e = a.extend(c, b);
        var f = (e.isVertical ? "height" : "width");
        var d = (e.isVertical ? "top" : "left");
        return this.each(function () {
            container = a(this);
            var k = container.children("li");
            var h = k.eq(0).css(f).replace(/px/, "");
            if (!e.max) {
                e.max = (h * k.size()) - (e.min * (k.size() - 1))
            } else {
                e.min = ((h * k.size()) - e.max) / (k.size() - 1)
            }
            if (e.isVertical) {
                container.css({
                    width: k.eq(0).css("width"),
                    height: (h * k.size()) + (e.spacing * (k.size() - 1)) + "px"
                })
            } else {
                container.css({
                    width: (h * k.size()) + (e.spacing * (k.size() - 1)) + "px",
                    height: k.eq(0).css("height")
                })
            }
            var g = [];
            for (i = 0; i < k.size(); i++) {
                g[i] = [];
                for (j = 1; j < k.size() - 1; j++) {
                    if (i == j) {
                        g[i][j] = e.isVertical ? j * e.min + (j * e.spacing) : j * e.min + (j * e.spacing)
                    } else {
                        g[i][j] = (j <= i ? (j * e.min) : (j - 1) * e.min + e.max) + (j * e.spacing)
                    }
                }
            }
            k.each(function (l) {
                var m = a(this);
                if (l === 0) {
                    m.css(d, "0px")
                } else {
                    if (l == k.size() - 1) {
                        m.css(e.isVertical ? "bottom" : "right", "0px")
                    } else {
                        if (e.sticky) {
                            m.css(d, g[e.defaultKwick][l])
                        } else {
                            m.css(d, (l * h) + (l * e.spacing))
                        }
                    }
                }
                if (e.sticky) {
                    if (e.defaultKwick == l) {
                        m.css(f, e.max + "px");
                        m.addClass("active")
                    } else {
                        m.css(f, e.min + "px")
                    }
                }
                m.css({margin: 0, position: "absolute"});
                m.bind(e.event, function () {
                    var p = [];
                    var r = [];
                    k.stop().removeClass("active");
                    for (j = 0; j < k.size(); j++) {
                        p[j] = k.eq(j).css(f).replace(/px/, "");
                        r[j] = k.eq(j).css(d).replace(/px/, "")
                    }
                    var o = {};
                    o[f] = e.max;
                    var q = e.max - p[l];
                    var n = p[l] / q;
                    m.addClass("active").animate(o, {
                        step: function (t) {
                            var s = q != 0 ? t / q - n : 1;
                            k.each(function (u) {
                                if (u != l) {
                                    k.eq(u).css(f, p[u] - ((p[u] - e.min) * s) + "px")
                                }
                                if (u > 0 && u < k.size() - 1) {
                                    k.eq(u).css(d, r[u] - ((r[u] - g[l][u]) * s) + "px")
                                }
                            })
                        }, duration: e.duration, easing: e.easing
                    })
                })
            });
            if (!e.sticky) {
                container.bind("mouseleave", function () {
                    var m = [];
                    var n = [];
                    k.removeClass("active").stop();
                    for (i = 0; i < k.size(); i++) {
                        m[i] = k.eq(i).css(f).replace(/px/, "");
                        n[i] = k.eq(i).css(d).replace(/px/, "")
                    }
                    var l = {};
                    l[f] = h;
                    var o = h - m[0];
                    k.eq(0).animate(l, {
                        step: function (q) {
                            var p = o != 0 ? (q - m[0]) / o : 1;
                            for (i = 1; i < k.size(); i++) {
                                k.eq(i).css(f, m[i] - ((m[i] - h) * p) + "px");
                                if (i < k.size() - 1) {
                                    k.eq(i).css(d, n[i] - ((n[i] - ((i * h) + (i * e.spacing))) * p) + "px")
                                }
                            }
                        }, duration: e.duration, easing: e.easing
                    })
                })
            }
        })
    }
})(jQuery);
(function (a) {
    a.fn.kwicks = function (f) {
        var d = {isVertical: false, sticky: false, defaultKwick: 0, event: "mouseover", spacing: 0, duration: 500};
        var e = a.extend(d, f);
        var c = (e.isVertical ? "height" : "width");
        var b = (e.isVertical ? "top" : "left");
        return this.each(function () {
            container = a(this);
            var n = container.children("li");
            var h = n.eq(0).css(c).replace(/px/, "");
            if (!e.max) {
                e.max = (h * n.size()) - (e.min * (n.size() - 1))
            } else {
                e.min = ((h * n.size()) - e.max) / (n.size() - 1)
            }
            if (e.isVertical) {
                container.css({
                    width: n.eq(0).css("width"),
                    height: (h * n.size()) + (e.spacing * (n.size() - 1)) + "px"
                })
            } else {
                container.css({
                    width: (h * n.size()) + (e.spacing * (n.size() - 1)) + "px",
                    height: n.eq(0).css("height")
                })
            }
            var g = [];
            for (i = 0; i < n.size(); i++) {
                g[i] = [];
                for (j = 1; j < n.size() - 1; j++) {
                    if (i == j) {
                        g[i][j] = e.isVertical ? j * e.min + (j * e.spacing) : j * e.min + (j * e.spacing)
                    } else {
                        g[i][j] = (j <= i ? (j * e.min) : (j - 1) * e.min + e.max) + (j * e.spacing)
                    }
                }
            }
            n.each(function (k) {
                var l = a(this);
                if (k === 0) {
                    l.css(b, "0px")
                } else {
                    if (k == n.size() - 1) {
                        l.css(e.isVertical ? "bottom" : "right", "0px")
                    } else {
                        if (e.sticky) {
                            l.css(b, g[e.defaultKwick][k])
                        } else {
                            l.css(b, (k * h) + (k * e.spacing))
                        }
                    }
                }
                if (e.sticky) {
                    if (e.defaultKwick == k) {
                        l.css(c, e.max + "px");
                        l.addClass("active")
                    } else {
                        l.css(c, e.min + "px")
                    }
                }
                l.css({margin: 0, position: "absolute"});
                l.bind(e.event, function () {
                    var r = [];
                    var q = [];
                    n.stop().removeClass("active");
                    for (j = 0; j < n.size(); j++) {
                        r[j] = n.eq(j).css(c).replace(/px/, "");
                        q[j] = n.eq(j).css(b).replace(/px/, "")
                    }
                    var p = {};
                    p[c] = e.max;
                    var o = e.max - r[k];
                    var m = r[k] / o;
                    l.addClass("active").animate(p, {
                        step: function (t) {
                            var s = o != 0 ? t / o - m : 1;
                            n.each(function (u) {
                                if (u != k) {
                                    n.eq(u).css(c, r[u] - ((r[u] - e.min) * s) + "px")
                                }
                                if (u > 0 && u < n.size() - 1) {
                                    n.eq(u).css(b, q[u] - ((q[u] - g[k][u]) * s) + "px")
                                }
                            })
                        }, duration: e.duration, easing: e.easing
                    })
                })
            });
            if (!e.sticky) {
                container.bind("mouseleave", function () {
                    var o = [];
                    var m = [];
                    n.removeClass("active").stop();
                    for (i = 0; i < n.size(); i++) {
                        o[i] = n.eq(i).css(c).replace(/px/, "");
                        m[i] = n.eq(i).css(b).replace(/px/, "")
                    }
                    var l = {};
                    l[c] = h;
                    var k = h - o[0];
                    n.eq(0).animate(l, {
                        step: function (q) {
                            var p = k != 0 ? (q - o[0]) / k : 1;
                            for (i = 1; i < n.size(); i++) {
                                n.eq(i).css(c, o[i] - ((o[i] - h) * p) + "px");
                                if (i < n.size() - 1) {
                                    n.eq(i).css(b, m[i] - ((m[i] - ((i * h) + (i * e.spacing))) * p) + "px")
                                }
                            }
                        }, duration: e.duration, easing: e.easing
                    })
                })
            }
        })
    }
})(jQuery);