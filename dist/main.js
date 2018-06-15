(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/ajax.js":
/*!************************!*\
  !*** ./src/js/ajax.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function ajax(oPrmt) {
    oPrmt = Object.assign({
        type: 'POST',
        url: '',
        responseType: '', //空字符串即默认为text格式
        async: true,
        data: null,
        success: function success() {},
        fail: function fail() {}
    }, oPrmt);
    oPrmt.type = oPrmt.type.toUpperCase();
    var xmlHttp = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
        tempData = [];
    xmlHttp.responseType = oPrmt.responseType;
    console.log(xmlHttp.responseType);
    for (var key in oPrmt.data) {
        tempData.push(key + '=' + oPrmt.data[key]);
    }
    var postData = tempData.join('&');

    if (oPrmt.type === 'POST') {
        xmlHttp.open(oPrmt.type, oPrmt.url, oPrmt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (oPrmt.type.toUpperCase() === 'GET') {
        xmlHttp.open(oPrmt.type, oPrmt.url + '?' + postData, oPrmt.async);
        xmlHttp.send(null);
    }

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status === 304) {
                oPrmt.success(xmlHttp.response);
            } else {
                oPrmt.fail(xmlHttp.response);
            }
        }
    };
}

exports.ajax = ajax;

/***/ }),

/***/ "./src/js/carousel.js":
/*!****************************!*\
  !*** ./src/js/carousel.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carousel = function () {
    function Carousel(oTarget) {
        _classCallCheck(this, Carousel);

        this.oUl = oTarget.getElementsByClassName('hc-imgList')[0];
        this.oBtnPre = oTarget.getElementsByClassName('btn-pre')[0];
        this.oBtnNext = oTarget.getElementsByClassName('btn-next')[0];
        this.oDot = oTarget.getElementsByClassName('hcd-dot')[0];
        this.aDotLi = this.oDot.getElementsByTagName('li');
        this.nNow = 1;
        this.lockPre = false; //防抖动
        this.lockNext = false;
        this.lockClick = false;
        this.nLiLen = this.oUl.getElementsByTagName('li').length;
        this.nImgWidth = this.oUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0].width;
        this.init();
    }

    _createClass(Carousel, [{
        key: 'init',
        value: function init() {
            var _this = this;

            //注意轮播图一般是ul>li>a>img，所以切记cloneNode(true)的ture!!!
            this.oUl.insertBefore($(this.oUl).children('li')[this.nLiLen - 1].cloneNode(true), $(this.oUl).children('li')[0]);
            this.oUl.appendChild($(this.oUl).children('li')[1].cloneNode(true));
            this.oUl.style.left = -this.nImgWidth + 'px';
            this.nLiLen = this.oUl.getElementsByTagName('li').length;

            $(this.oBtnPre).on('click', function () {

                if (_this.lockPre) return;
                _this.lockPre = true;

                _this.nNow = (_this.nNow - 1 + _this.nLiLen) % _this.nLiLen; //this.nLiLen 个 li
                _this.carSwitch('pre');
            });
            //这里也可以用bind,就可以不用that,但bind的坑是每次都重新创建一个，如果一直点击当然重复创建，效率不好，不要使用！！！
            $(this.oBtnNext).on('click', function () {

                if (_this.lockNext) return;
                _this.lockNext = true;

                _this.nNow = (_this.nNow + 1) % _this.nLiLen;
                _this.carSwitch('next');
            });
            $(this.oDot).on('click', 'li', function () {
                var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;


                if (_this.lockClick || _this.nNow == $(ev.target ? ev.target : ev.srcElement).index() + 1) return;
                _this.lockClick = true;

                _this.nNow = $(ev.target ? ev.target : ev.srcElement).index() + 1;
                _this.carSwitch('dotClick');
            });
        }
    }, {
        key: 'carSwitch',
        value: function carSwitch() {
            var _this2 = this;

            var aArg = arguments;
            $(this.oUl).animate({ left: -this.nImgWidth * this.nNow + 'px' }, function () {
                //这里务必注意，jquery的动画是使用定时器完成的，那根据执行机制放到最后执行动画的这个坑你知道的，所以一定注意，使用jquery动画时所改变的那些参数，如果需要在动画开始前读写同样的参数，那只要放到animate()外部就行，但如果要在动画结束后读写同样的参数，那必须只能放在animate(function(){})的function里，确保动画结束后读写的同样的参数是经过动画修改后的参数。
                switch (_this2.nNow) {
                    case 0:
                        _this2.oUl.style.left = _this2.aDotLi.length * -_this2.nImgWidth + 'px';
                        _this2.nNow = _this2.nLiLen - 2;
                        break;

                    case 5:
                        _this2.oUl.style.left = -_this2.nImgWidth + 'px';
                        _this2.nNow = 1;
                        break;
                };

                $(_this2.aDotLi).each(function () {
                    this.className = '';
                });
                _this2.aDotLi[_this2.nNow - 1].className = 'active';

                switch (aArg[0]) {
                    case 'pre':
                        _this2.lockPre = false;
                        break;

                    case 'next':
                        _this2.lockNext = false;
                        break;

                    case 'dotClick':
                        _this2.lockClick = false;
                        break;
                }
            });
        }
    }]);

    return Carousel;
}();

exports.Carousel = Carousel;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/_jquery@3.3.1@jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _carousel = __webpack_require__(/*! ./carousel.js */ "./src/js/carousel.js");

var _ajax = __webpack_require__(/*! ./ajax.js */ "./src/js/ajax.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const $ = require('jquery');
__webpack_require__(/*! ../css/style.css */ "./src/css/style.css");

var GoTop = function () {
    function GoTop(oTarget) {
        _classCallCheck(this, GoTop);

        this.oGoTop = oTarget;
        this.init();
    }

    _createClass(GoTop, [{
        key: "init",
        value: function init() {
            var $win = $(window),
                $oGoTop = $(this.oGoTop),
                $nav = $oGoTop.parent().children('nav');
            $nav.stop = false;
            $win.on('scroll', function () {
                if ($win.scrollTop() > 500 && $win.width() >= 1280) {
                    $oGoTop.css('display') === 'none' && (console.log('show'), $oGoTop.toggle());
                } else {
                    $oGoTop.css('display') === 'block' && (console.log('hide'), $oGoTop.toggle());
                }
            });
            $win.on('resize', function () {
                if ($win.width() < 1280) {
                    if ($nav.width() != 1280) {
                        console.log('<1280');
                        $oGoTop.hide();
                        $nav.css({ "width": 1280 });
                        $nav.stop = false;
                    }
                } else {
                    if (!$nav.stop) {
                        console.log('>=1280');
                        $oGoTop.show();
                        $nav.css({ "width": "100%" });
                        $nav.stop = true;
                    }
                }
            });
            $oGoTop.on('click', function () {
                $('html,body').animate({ 'scrollTop': 0 }, 'fast');
            });
        }
    }]);

    return GoTop;
}();

var ajaxToRender = function () {
    function ajaxToRender(oTgt) {
        _classCallCheck(this, ajaxToRender);

        this.oTgt = oTgt;
        this.stop = false;
        this.init();
    }

    _createClass(ajaxToRender, [{
        key: "init",
        value: function init() {
            var _this = this;

            $(this.oTgt).on('click', function () {
                if (_this.stop) {
                    return;
                }
                console.log('onlyone');
                var oPme1 = new Promise(function (resolve, reject) {
                    (0, _ajax.ajax)({
                        type: 'get',
                        url: './dist/img/eli.jpg',
                        responseType: 'blob', //空字符串即默认为text格式
                        async: true,
                        data: null,
                        success: function success(oPrmt) {
                            resolve(oPrmt);
                        },
                        fail: function fail(oPrmt) {
                            console.log(oPrmt);
                        }
                    });
                });
                oPme1.then(function (oPrmt) {
                    _this.render({
                        "eli": {
                            "imgUrl": window.URL.createObjectURL(oPrmt),
                            "h3Text": "绚濑绘里（あやせ えり）",
                            "pText": "CV：南条爱乃"
                        }
                    }, true);
                });

                var oPme2 = new Promise(function (resolve, reject) {
                    (0, _ajax.ajax)({
                        type: 'get',
                        url: './data.json',
                        responseType: 'json', //空字符串即默认为text格式
                        async: true,
                        data: null,
                        success: function success(oPrmt) {
                            resolve(oPrmt);
                        },
                        fail: function fail(oPrmt) {
                            console.log(oPrmt);
                        }
                    });
                });
                oPme2.then(function (oPrmt) {
                    _this.render(oPrmt);
                });
                _this.stop = true;
            });
        }
    }, {
        key: "render",
        value: function render(oPrmt, hasBlob) {
            var img = null,
                h3 = null,
                p = null,
                figure = null;
            for (var key in oPrmt) {
                img = document.createElement('img');
                h3 = document.createElement('h3');
                p = document.createElement('p');
                figure = document.createElement('figure');
                if (hasBlob) {
                    img.onload = function () {
                        window.URL.revokeObjectURL(img.src);
                    };
                }
                img.src = oPrmt[key].imgUrl;
                h3.innerText = oPrmt[key].h3Text;
                p.innerText = oPrmt[key].pText;

                figure.appendChild(img);
                figure.appendChild(h3);
                figure.appendChild(p);
                $(".ms3-content").append(figure);
            }
        }
    }]);

    return ajaxToRender;
}();

$(document).ready(function () {
    var oCar = document.getElementsByClassName('header-carousel')[0],
        oGoTop = document.getElementsByClassName('header-goTop')[0],
        oRdr = document.getElementsByClassName('main-section3')[0].getElementsByTagName('button')[0];
    new _carousel.Carousel(oCar);
    new GoTop(oGoTop);
    new ajaxToRender(oRdr);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/_jquery@3.3.1@jquery/dist/jquery.js")))

/***/ })

},[["./src/js/main.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOlsiYWpheCIsIm9Qcm10IiwiT2JqZWN0IiwiYXNzaWduIiwidHlwZSIsInVybCIsInJlc3BvbnNlVHlwZSIsImFzeW5jIiwiZGF0YSIsInN1Y2Nlc3MiLCJmYWlsIiwidG9VcHBlckNhc2UiLCJ4bWxIdHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0IiwidGVtcERhdGEiLCJjb25zb2xlIiwibG9nIiwia2V5IiwicHVzaCIsInBvc3REYXRhIiwiam9pbiIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkNhcm91c2VsIiwib1RhcmdldCIsIm9VbCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvQnRuUHJlIiwib0J0bk5leHQiLCJvRG90IiwiYURvdExpIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJuTm93IiwibG9ja1ByZSIsImxvY2tOZXh0IiwibG9ja0NsaWNrIiwibkxpTGVuIiwibGVuZ3RoIiwibkltZ1dpZHRoIiwid2lkdGgiLCJpbml0IiwiaW5zZXJ0QmVmb3JlIiwiJCIsImNoaWxkcmVuIiwiY2xvbmVOb2RlIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImxlZnQiLCJvbiIsImNhclN3aXRjaCIsImV2Iiwid2luZG93IiwiZXZlbnQiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwiaW5kZXgiLCJhQXJnIiwiYXJndW1lbnRzIiwiYW5pbWF0ZSIsImVhY2giLCJjbGFzc05hbWUiLCJyZXF1aXJlIiwiR29Ub3AiLCJvR29Ub3AiLCIkd2luIiwiJG9Hb1RvcCIsIiRuYXYiLCJwYXJlbnQiLCJzdG9wIiwic2Nyb2xsVG9wIiwiY3NzIiwidG9nZ2xlIiwiaGlkZSIsInNob3ciLCJhamF4VG9SZW5kZXIiLCJvVGd0Iiwib1BtZTEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJyZW5kZXIiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJvUG1lMiIsImhhc0Jsb2IiLCJpbWciLCJoMyIsInAiLCJmaWd1cmUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJzcmMiLCJpbWdVcmwiLCJpbm5lclRleHQiLCJoM1RleHQiLCJwVGV4dCIsImFwcGVuZCIsInJlYWR5Iiwib0NhciIsIm9SZHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLFNBQVNBLElBQVQsQ0FBY0MsS0FBZCxFQUFvQjtBQUNoQkEsWUFBUUMsT0FBT0MsTUFBUCxDQUFjO0FBQ2xCQyxjQUFNLE1BRFk7QUFFbEJDLGFBQUssRUFGYTtBQUdsQkMsc0JBQWMsRUFISSxFQUdEO0FBQ2pCQyxlQUFPLElBSlc7QUFLbEJDLGNBQU0sSUFMWTtBQU1sQkMsZUFOa0IscUJBTVIsQ0FBRSxDQU5NO0FBT2xCQyxZQVBrQixrQkFPWCxDQUFFO0FBUFMsS0FBZCxFQVFMVCxLQVJLLENBQVI7QUFTQUEsVUFBTUcsSUFBTixHQUFhSCxNQUFNRyxJQUFOLENBQVdPLFdBQVgsRUFBYjtBQUNBLFFBQUlDLFVBQVVDLGlCQUFnQixJQUFJQSxjQUFKLEVBQWhCLEdBQXNDLElBQUlDLGFBQUosQ0FBa0IsbUJBQWxCLENBQXBEO0FBQUEsUUFDSUMsV0FBVyxFQURmO0FBRUFILFlBQVFOLFlBQVIsR0FBdUJMLE1BQU1LLFlBQTdCO0FBQ0FVLFlBQVFDLEdBQVIsQ0FBWUwsUUFBUU4sWUFBcEI7QUFDQSxTQUFJLElBQUlZLEdBQVIsSUFBZWpCLE1BQU1PLElBQXJCLEVBQ0E7QUFDSU8saUJBQVNJLElBQVQsQ0FBaUJELEdBQWpCLFNBQXdCakIs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dkMsS0FBSixDQUFVQyxNQUFWO0FBQ0EsUUFBSVcsWUFBSixDQUFpQjRCLElBQWpCO0FBQ0gsQ0FQRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiIsImZ1bmN0aW9uIGFqYXgob1BybXQpe1xyXG4gICAgb1BybXQgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnJyxcclxuICAgICAgICByZXNwb25zZVR5cGU6ICcnLC8v56m65a2X56ym5Liy5Y2z6buY6K6k5Li6dGV4dOagvOW8j1xyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgc3VjY2VzcygpIHt9LFxyXG4gICAgICAgIGZhaWwoKSB7fVxyXG4gICAgfSwgb1BybXQpO1xyXG4gICAgb1BybXQudHlwZSA9IG9Qcm10LnR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIGxldCB4bWxIdHRwID0gWE1MSHR0cFJlcXVlc3Q/IG5ldyBYTUxIdHRwUmVxdWVzdCgpOiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKSxcclxuICAgICAgICB0ZW1wRGF0YSA9IFtdO1xyXG4gICAgeG1sSHR0cC5yZXNwb25zZVR5cGUgPSBvUHJtdC5yZXNwb25zZVR5cGU7XHJcbiAgICBjb25zb2xlLmxvZyh4bWxIdHRwLnJlc3BvbnNlVHlwZSk7XHJcbiAgICBmb3IobGV0IGtleSBpbiBvUHJtdC5kYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRlbXBEYXRhLnB1c2goYCR7a2V5fT0ke29Qcm10LmRhdGFba2V5XX1gKTtcclxuICAgIH1cclxuICAgIGxldCBwb3N0RGF0YSA9IHRlbXBEYXRhLmpvaW4oJyYnKTtcclxuXHJcbiAgICBpZiAob1BybXQudHlwZSA9PT0gJ1BPU1QnKSBcclxuICAgIHtcclxuICAgICAgICB4bWxIdHRwLm9wZW4ob1BybXQudHlwZSwgb1BybXQudXJsLCBvUHJtdC5hc3luYyk7XHJcbiAgICAgICAgeG1sSHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgICB4bWxIdHRwLnNlbmQocG9zdERhdGEpO1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKG9Qcm10LnR5cGUudG9VcHBlckNhc2UoKSA9PT0gJ0dFVCcpIFxyXG4gICAge1xyXG4gICAgICAgIHhtbEh0dHAub3BlbihvUHJtdC50eXBlLCBgJHtvUHJtdC51cmx9PyR7cG9zdERhdGF9YCwgb1BybXQuYXN5bmMpO1xyXG4gICAgICAgIHhtbEh0dHAuc2VuZChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB4bWxIdHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoeG1sSHR0cC5yZWFkeVN0YXRlID09PSA0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCh4bWxIdHRwLnN0YXR1cyA+PSAyMDAgJiYgeG1sSHR0cC5zdGF0dXMgPCAzMDApIHx8IHhtbEh0dHAuc3RhdHVzID09PSAzMDQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9Qcm10LnN1Y2Nlc3MoeG1sSHR0cC5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvUHJtdC5mYWlsKHhtbEh0dHAucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IHthamF4fTsiLCJjbGFzcyBDYXJvdXNlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvVGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5vVWwgPSBvVGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hjLWltZ0xpc3QnKVswXTtcclxuICAgICAgICB0aGlzLm9CdG5QcmUgPSBvVGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi1wcmUnKVswXTtcclxuICAgICAgICB0aGlzLm9CdG5OZXh0ID0gb1RhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tbmV4dCcpWzBdO1xyXG4gICAgICAgIHRoaXMub0RvdCA9IG9UYXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGNkLWRvdCcpWzBdO1xyXG4gICAgICAgIHRoaXMuYURvdExpID0gdGhpcy5vRG90LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpO1xyXG4gICAgICAgIHRoaXMubk5vdyA9IDE7XHJcbiAgICAgICAgdGhpcy5sb2NrUHJlID0gZmFsc2U7Ly/pmLLmipbliqhcclxuICAgICAgICB0aGlzLmxvY2tOZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2NrQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5MaUxlbiA9IHRoaXMub1VsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLmxlbmd0aDtcclxuICAgICAgICB0aGlzLm5JbWdXaWR0aCA9IHRoaXMub1VsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXS53aWR0aDtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIGluaXQoKXtcclxuICAgICAgICAvL+azqOaEj+i9ruaSreWbvuS4gOiIrOaYr3VsPmxpPmE+aW1n77yM5omA5Lul5YiH6K6wY2xvbmVOb2RlKHRydWUp55qEdHVyZSEhIVxyXG4gICAgICAgIHRoaXMub1VsLmluc2VydEJlZm9yZSgkKHRoaXMub1VsKS5jaGlsZHJlbignbGknKVt0aGlzLm5MaUxlbiAtIDFdLmNsb25lTm9kZSh0cnVlKSwgJCh0aGlzLm9VbCkuY2hpbGRyZW4oJ2xpJylbMF0pO1xyXG4gICAgICAgIHRoaXMub1VsLmFwcGVuZENoaWxkKCQodGhpcy5vVWwpLmNoaWxkcmVuKCdsaScpWzFdLmNsb25lTm9kZSh0cnVlKSk7XHJcbiAgICAgICAgdGhpcy5vVWwuc3R5bGUubGVmdCA9ICgtdGhpcy5uSW1nV2lkdGgpICsgJ3B4JztcclxuICAgICAgICB0aGlzLm5MaUxlbiA9IHRoaXMub1VsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgJCh0aGlzLm9CdG5QcmUpLm9uKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9ja1ByZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tQcmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uTm93ID0gKHRoaXMubk5vdyAtIDEgKyB0aGlzLm5MaUxlbikgJSB0aGlzLm5MaUxlbjsvL3RoaXMubkxpTGVuIOS4qiBsaVxyXG4gICAgICAgICAgICB0aGlzLmNhclN3aXRjaCgncHJlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ov5nph4zkuZ/lj6/ku6XnlKhiaW5kLOWwseWPr+S7peS4jeeUqHRoYXQs5L2GYmluZOeahOWdkeaYr+avj+asoemDvemHjeaWsOWIm+W7uuS4gOS4qu+8jOWmguaenOS4gOebtOeCueWHu+W9k+eEtumHjeWkjeWIm+W7uu+8jOaViOeOh+S4jeWlve+8jOS4jeimgeS9v+eUqO+8ge+8ge+8gVxyXG4gICAgICAgICQodGhpcy5vQnRuTmV4dCkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5sb2NrTmV4dCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tOZXh0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubk5vdyA9ICh0aGlzLm5Ob3cgKyAxKSAlIHRoaXMubkxpTGVuO1xyXG4gICAgICAgICAgICB0aGlzLmNhclN3aXRjaCgnbmV4dCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcy5vRG90KS5vbignY2xpY2snLCAnbGknLCAoZXYgPSB3aW5kb3cuZXZlbnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9ja0NsaWNrIHx8IHRoaXMubk5vdyA9PSAkKGV2LnRhcmdldCA/ZXYudGFyZ2V0IDpldi5zcmNFbGVtZW50KS5pbmRleCgpICsgMSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tDbGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5Ob3cgPSAkKGV2LnRhcmdldCA/ZXYudGFyZ2V0IDpldi5zcmNFbGVtZW50KS5pbmRleCgpICsgMTtcclxuICAgICAgICAgICAgdGhpcy5jYXJTd2l0Y2goJ2RvdENsaWNrJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXJTd2l0Y2goKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBhQXJnID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICAkKHRoaXMub1VsKS5hbmltYXRlKHtsZWZ0OiAoLXRoaXMubkltZ1dpZHRoKSAqIHRoaXMubk5vdyArICdweCd9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v6L+Z6YeM5Yqh5b+F5rOo5oSP77yManF1ZXJ555qE5Yqo55S75piv5L2/55So5a6a5pe25Zmo5a6M5oiQ55qE77yM6YKj5qC55o2u5omn6KGM5py65Yi25pS+5Yiw5pyA5ZCO5omn6KGM5Yqo55S755qE6L+Z5Liq5Z2R5L2g55+l6YGT55qE77yM5omA5Lul5LiA5a6a5rOo5oSP77yM5L2/55SoanF1ZXJ55Yqo55S75pe25omA5pS55Y+Y55qE6YKj5Lqb5Y+C5pWw77yM5aaC5p6c6ZyA6KaB5Zyo5Yqo55S75byA5aeL5YmN6K+75YaZ5ZCM5qC355qE5Y+C5pWw77yM6YKj5Y+q6KaB5pS+5YiwYW5pbWF0ZSgp5aSW6YOo5bCx6KGM77yM5L2G5aaC5p6c6KaB5Zyo5Yqo55S757uT5p2f5ZCO6K+75YaZ5ZCM5qC355qE5Y+C5pWw77yM6YKj5b+F6aG75Y+q6IO95pS+5ZyoYW5pbWF0ZShmdW5jdGlvbigpe30p55qEZnVuY3Rpb27ph4zvvIznoa7kv53liqjnlLvnu5PmnZ/lkI7or7vlhpnnmoTlkIzmoLfnmoTlj4LmlbDmmK/nu4/ov4fliqjnlLvkv67mlLnlkI7nmoTlj4LmlbDjgIJcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0aGlzLm5Ob3cpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9VbC5zdHlsZS5sZWZ0ID0gdGhpcy5hRG90TGkubGVuZ3RoICogKC10aGlzLm5JbWdXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5Ob3cgPSB0aGlzLm5MaUxlbiAtIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vVWwuc3R5bGUubGVmdCA9ICgtdGhpcy5uSW1nV2lkdGgpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uTm93ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzLmFEb3RMaSkuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFEb3RMaVt0aGlzLm5Ob3cgLSAxXS5jbGFzc05hbWUgPSAnYWN0aXZlJztcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFBcmdbMF0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ByZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tQcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICduZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja05leHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkb3RDbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Q2Fyb3VzZWx9OyIsImltcG9ydCB7Q2Fyb3VzZWx9IGZyb20gXCIuL2Nhcm91c2VsLmpzXCI7XG5pbXBvcnQge2FqYXh9IGZyb20gXCIuL2FqYXguanNcIjtcbi8vY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgnLi4vY3NzL3N0eWxlLmNzcycpO1xuXG4gICAgICAgICAgICBjbGFzcyBHb1RvcCB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3Iob1RhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9Hb1RvcCA9IG9UYXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHdpbiA9ICQod2luZG93KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRvR29Ub3AgPSAkKHRoaXMub0dvVG9wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRuYXYgPSAkb0dvVG9wLnBhcmVudCgpLmNoaWxkcmVuKCduYXYnKTtcbiAgICAgICAgICAgICAgICAgICAgJG5hdi5zdG9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICR3aW4ub24oJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCR3aW4uc2Nyb2xsVG9wKCkgPiA1MDAgJiYgJHdpbi53aWR0aCgpID49IDEyODApXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG9Hb1RvcC5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnICYmIChjb25zb2xlLmxvZygnc2hvdycpLCAkb0dvVG9wLnRvZ2dsZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkb0dvVG9wLmNzcygnZGlzcGxheScpID09PSAnYmxvY2snICYmIChjb25zb2xlLmxvZygnaGlkZScpLCAkb0dvVG9wLnRvZ2dsZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICR3aW4ub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCR3aW4ud2lkdGgoKSA8IDEyODApXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJG5hdi53aWR0aCgpICE9IDEyODApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPDEyODAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG9Hb1RvcC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRuYXYuY3NzKHtcIndpZHRoXCI6IDEyODB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG5hdi5zdG9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCEkbmF2LnN0b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPj0xMjgwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvR29Ub3Auc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmF2LmNzcyh7XCJ3aWR0aFwiOiBcIjEwMCVcIn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmF2LnN0b3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICRvR29Ub3Aub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6IDB9LCAnZmFzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsYXNzIGFqYXhUb1JlbmRlcntcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcihvVGd0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vVGd0ID0gb1RndDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbml0KCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcy5vVGd0KS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29ubHlvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvUG1lMSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vZGlzdC9pbWcvZWxpLmpwZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InLC8v56m65a2X56ym5Liy5Y2z6buY6K6k5Li6dGV4dOagvOW8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhvUHJtdCkge3Jlc29sdmUob1BybXQpO30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwob1BybXQpIHtjb25zb2xlLmxvZyhvUHJtdCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvUG1lMS50aGVuKChvUHJtdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbWdVcmxcIjogd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwob1BybXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoM1RleHRcIjogXCLnu5rmv5Hnu5jph4zvvIjjgYLjgoTjgZsg44GI44KK77yJXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBUZXh0XCI6IFwiQ1bvvJrljZfmnaHniLHkuYNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9QbWUyID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9kYXRhLmpzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJywvL+epuuWtl+espuS4suWNs+m7mOiupOS4unRleHTmoLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Mob1BybXQpIHtyZXNvbHZlKG9Qcm10KX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwob1BybXQpIHtjb25zb2xlLmxvZyhvUHJtdCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvUG1lMi50aGVuKChvUHJtdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKG9Qcm10KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlbmRlcihvUHJtdCwgaGFzQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGgzID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gb1BybXQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZ3VyZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaGFzQmxvYilcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IG9Qcm10W2tleV0uaW1nVXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaDMuaW5uZXJUZXh0ID0gb1BybXRba2V5XS5oM1RleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwLmlubmVyVGV4dCA9IG9Qcm10W2tleV0ucFRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlLmFwcGVuZENoaWxkKGgzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZS5hcHBlbmRDaGlsZChwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIubXMzLWNvbnRlbnRcIikuYXBwZW5kKGZpZ3VyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBvQ2FyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVhZGVyLWNhcm91c2VsJylbMF0sXG4gICAgICAgICAgICAgICAgICAgIG9Hb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlci1nb1RvcCcpWzBdLFxuICAgICAgICAgICAgICAgICAgICBvUmRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbi1zZWN0aW9uMycpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdidXR0b24nKVswXTtcbiAgICAgICAgICAgICAgICBuZXcgQ2Fyb3VzZWwob0Nhcik7XG4gICAgICAgICAgICAgICAgbmV3IEdvVG9wKG9Hb1RvcCk7XG4gICAgICAgICAgICAgICAgbmV3IGFqYXhUb1JlbmRlcihvUmRyKTtcbiAgICAgICAgICAgIH0pOyJdLCJzb3VyY2VSb290IjoiIn0=