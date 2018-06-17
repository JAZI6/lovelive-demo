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

/***/ "./src/js/imgLazyLoad.js":
/*!*******************************!*\
  !*** ./src/js/imgLazyLoad.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImgLazyLoad = function () {
    function ImgLazyLoad(aTarget) {
        _classCallCheck(this, ImgLazyLoad);

        this.aImg = aTarget;
        this.nWinScrTop = $(window).scrollTop();
        this.nWinHeight = $(window).height();
        this.timer1 = null;
        this.timer2 = null;
        //这里踩了一个坑，jquery的scrollTop是返回数值，这个数值不是动态变化的，仅仅指当时的，目前只有dom的nodeList是动态变化的！！！
        this.init();
    }

    _createClass(ImgLazyLoad, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var _this = this,
                $win = $(window);
            $(this.aImg).not('.loaded').each(function () {
                if ($(this).attr('data-src')) {
                    $(this).attr('src', './dist/img/loading.svg');
                    _this.isVisible($(this)) && _this.show($(this));
                }
            });
            $win.on('resize', function () {
                _this2.debounce(function () {
                    _this2.nWinHeight = $win.height();
                });
            });
            $win.on('scroll', function () {
                _this2.debounce(function () {
                    _this.nWinScrTop = $win.scrollTop();
                    $(_this2.aImg).not('.loaded').each(function () {
                        if ($(this).attr('data-src')) {
                            _this.isVisible($(this)) && _this.show($(this));
                        }
                    });
                });
            });
        }
    }, {
        key: 'isVisible',
        value: function isVisible($target) {
            if (this.nWinScrTop + this.nWinHeight > $target.offset().top && this.nWinScrTop < $target.offset().top + $target.outerHeight(true)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'show',
        value: function show($target) {
            $target.on('error', function () {
                $target.attr('src', './dist/img/loadFail.png');
            });
            $target.attr('src', $target.attr('data-src'));
            $target.addClass('loaded');
        }
    }, {
        key: 'debounce',
        value: function debounce(func) {
            clearTimeout(this.timer1);
            this.timer1 = setTimeout(function () {
                func();
            }, 260);
        }
    }, {
        key: 'throttle',
        value: function throttle(func) {
            var _this3 = this;

            if (!this.timer2) {
                this.timer2 = setTimeout(function () {
                    func();
                    _this3.timer2 = null;
                }, 1000);
            }
        }
    }]);

    return ImgLazyLoad;
}();

exports.ImgLazyLoad = ImgLazyLoad;
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

var _imgLazyLoad = __webpack_require__(/*! ./imgLazyLoad.js */ "./src/js/imgLazyLoad.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const $ = require('jquery');
__webpack_require__(/*! ../css/style.css */ "./src/css/style.css");

var GoTop = function () {
    function GoTop(oTarget) {
        _classCallCheck(this, GoTop);

        this.oGoTop = oTarget;
        this.timer1 = null;
        this.timer2 = null;
        this.init();
    }

    _createClass(GoTop, [{
        key: "init",
        value: function init() {
            var _this = this;

            var $win = $(window),
                $oGoTop = $(this.oGoTop),
                $nav = $oGoTop.parent().children('nav');
            $nav.stop = false;
            $win.on('scroll', function () {
                _this.debounce(function () {
                    if ($win.scrollTop() > 500 && $win.width() >= 1280) {
                        $oGoTop.css('display') === 'none' && (console.log('show'), $oGoTop.toggle());
                    } else {
                        $oGoTop.css('display') === 'block' && (console.log('hide'), $oGoTop.toggle());
                    }
                });
            });
            $win.on('resize', function () {
                _this.debounce(function () {
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
                            $win.scrollTop() > 500 && $oGoTop.show();
                            $nav.css({ "width": "100%" });
                            $nav.stop = true;
                        }
                    }
                });
            });
            $oGoTop.on('click', function () {
                $('html,body').animate({ 'scrollTop': 0 }, 'fast');
            });
        }
    }, {
        key: "debounce",
        value: function debounce(func) {
            clearTimeout(this.timer1);
            this.timer1 = setTimeout(function () {
                func();
            }, 100);
        }
    }, {
        key: "throttle",
        value: function throttle(func) {
            var _this2 = this;

            if (!this.timer2) {
                this.timer2 = setTimeout(function () {
                    func();
                    _this2.timer2 = null;
                }, 1000);
            }
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
            var _this3 = this;

            $(this.oTgt).on('click', function () {
                if (_this3.stop) {
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
                    _this3.render({
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
                    _this3.render(oPrmt);
                });
                _this3.stop = true;
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
        oRdr = document.getElementsByClassName('main-section3')[0].getElementsByTagName('button')[0],
        aImg = document.getElementsByTagName('img');
    new _carousel.Carousel(oCar);
    new GoTop(oGoTop);
    new ajaxToRender(oRdr);
    new _imgLazyLoad.ImgLazyLoad(aImg);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/_jquery@3.3.1@jquery/dist/jquery.js")))

/***/ })

},[["./src/js/main.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY3NzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2ltZ0xhenlMb2FkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbImFqYXgiLCJvUHJtdCIsIk9iamVjdCIsImFzc2lnbiIsInR5cGUiLCJ1cmwiLCJyZXNwb25zZVR5cGUiLCJhc3luYyIsImRhdGEiLCJzdWNjZXNzIiwiZmFpbCIsInRvVXBwZXJDYXNlIiwieG1sSHR0cCIsIlhNTEh0dHBSZXF1ZXN0IiwiQWN0aXZlWE9iamVjdCIsInRlbXBEYXRhIiwiY29uc29sZSIsImxvZyIsImtleSIsInB1c2giLCJwb3N0RGF0YSIsImpvaW4iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJDYXJvdXNlbCIsIm9UYXJnZXQiLCJvVWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib0J0blByZSIsIm9CdG5OZXh0Iiwib0RvdCIsImFEb3RMaSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibk5vdyIsImxvY2tQcmUiLCJsb2NrTmV4dCIsImxvY2tDbGljayIsIm5MaUxlbiIsImxlbmd0aCIsIm5JbWdXaWR0aCIsIndpZHRoIiwiaW5pdCIsImluc2VydEJlZm9yZSIsIiQiLCJjaGlsZHJlbiIsImNsb25lTm9kZSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJsZWZ0Iiwib24iLCJjYXJTd2l0Y2giLCJldiIsIndpbmRvdyIsImV2ZW50IiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsImluZGV4IiwiYUFyZyIsImFyZ3VtZW50cyIsImFuaW1hdGUiLCJlYWNoIiwiY2xhc3NOYW1lIiwiSW1nTGF6eUxvYWQiLCJhVGFyZ2V0IiwiYUltZyIsIm5XaW5TY3JUb3AiLCJzY3JvbGxUb3AiLCJuV2luSGVpZ2h0IiwiaGVpZ2h0IiwidGltZXIxIiwidGltZXIyIiwiX3RoaXMiLCIkd2luIiwibm90IiwiYXR0ciIsImlzVmlzaWJsZSIsInNob3ciLCJkZWJvdW5jZSIsIiR0YXJnZXQiLCJvZmZzZXQiLCJ0b3AiLCJvdXRlckhlaWdodCIsImFkZENsYXNzIiwiZnVuYyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJyZXF1aXJlIiwiR29Ub3AiLCJvR29Ub3AiLCIkb0dvVG9wIiwiJG5hdiIsInBhcmVudCIsInN0b3AiLCJjc3MiLCJ0b2dnbGUiLCJoaWRlIiwiYWpheFRvUmVuZGVyIiwib1RndCIsIm9QbWUxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwicmVuZGVyIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwib1BtZTIiLCJoYXNCbG9iIiwiaW1nIiwiaDMiLCJwIiwiZmlndXJlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwib25sb2FkIiwicmV2b2tlT2JqZWN0VVJMIiwic3JjIiwiaW1nVXJsIiwiaW5uZXJUZXh0IiwiaDNUZXh0IiwicFRleHQiLCJhcHBlbmQiLCJyZWFkeSIsIm9DYXIiLCJvUmRyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxTQUFTQSxJQUFULENBQWNDLEtBQWQsRUFBb0I7QUFDaEJBLFlBQVFDLE9BQU9DLE1BQVAsQ0FBYztBQUNsQkMsY0FBTSxNQURZO0FBRWxCQyxhQUFLLEVBRmE7QUFHbEJDLHNCQUFjLEVBSEksRUFHRDtBQUNqQkMsZUFBTyxJQUpXO0FBS2xCQyxjQUFNLElBTFk7QUFNbEJDLGVBTmtCLHFCQU1SLENBQUUsQ0FOTTtBQU9sQkMsWUFQa0Isa0JBT1gsQ0FBRTtBQVBTLEtBQWQsRUFRTFQsS0FSSyxDQUFSO0FBU0FBLFVBQU1HLElBQU4sR0FBYUgsTUFBTUcsSUFBTixDQUFXTyxXQUFYLEVBQWI7QUFD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QVRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwiZnVuY3Rpb24gYWpheChvUHJtdCl7XHJcbiAgICBvUHJtdCA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICB1cmw6ICcnLFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJycsLy/nqbrlrZfnrKbkuLLljbPpu5jorqTkuLp0ZXh05qC85byPXHJcbiAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICBzdWNjZXNzKCkge30sXHJcbiAgICAgICAgZmFpbCgpIHt9XHJcbiAgICB9LCBvUHJtdCk7XHJcbiAgICBvUHJtdC50eXBlID0gb1BybXQudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHhtbEh0dHAgPSBYTUxIdHRwUmVxdWVzdD8gbmV3IFhNTEh0dHBSZXF1ZXN0KCk6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpLFxyXG4gICAgICAgIHRlbXBEYXRhID0gW107XHJcbiAgICB4bWxIdHRwLnJlc3BvbnNlVHlwZSA9IG9Qcm10LnJlc3BvbnNlVHlwZTtcclxuICAgIGNvbnNvbGUubG9nKHhtbEh0dHAucmVzcG9uc2VUeXBlKTtcclxuICAgIGZvcihsZXQga2V5IGluIG9Qcm10LmRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdGVtcERhdGEucHVzaChgJHtrZXl9PSR7b1BybXQuZGF0YVtrZXldfWApO1xyXG4gICAgfVxyXG4gICAgbGV0IHBvc3REYXRhID0gdGVtcERhdGEuam9pbignJicpO1xyXG5cclxuICAgIGlmIChvUHJtdC50eXBlID09PSAnUE9TVCcpIFxyXG4gICAge1xyXG4gICAgICAgIHhtbEh0dHAub3BlbihvUHJtdC50eXBlLCBvUHJtdC51cmwsIG9Qcm10LmFzeW5jKTtcclxuICAgICAgICB4bWxIdHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xyXG4gICAgICAgIHhtbEh0dHAuc2VuZChwb3N0RGF0YSk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAob1BybXQudHlwZS50b1VwcGVyQ2FzZSgpID09PSAnR0VUJykgXHJcbiAgICB7XHJcbiAgICAgICAgeG1sSHR0cC5vcGVuKG9Qcm10LnR5cGUsIGAke29Qcm10LnVybH0/JHtwb3N0RGF0YX1gLCBvUHJtdC5hc3luYyk7XHJcbiAgICAgICAgeG1sSHR0cC5zZW5kKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHhtbEh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh4bWxIdHRwLnJlYWR5U3RhdGUgPT09IDQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoKHhtbEh0dHAuc3RhdHVzID49IDIwMCAmJiB4bWxIdHRwLnN0YXR1cyA8IDMwMCkgfHwgeG1sSHR0cC5zdGF0dXMgPT09IDMwNClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb1BybXQuc3VjY2Vzcyh4bWxIdHRwLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9Qcm10LmZhaWwoeG1sSHR0cC5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQge2FqYXh9OyIsImNsYXNzIENhcm91c2VsIHtcclxuICAgIGNvbnN0cnVjdG9yKG9UYXJnZXQpIHtcclxuICAgICAgICB0aGlzLm9VbCA9IG9UYXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGMtaW1nTGlzdCcpWzBdO1xyXG4gICAgICAgIHRoaXMub0J0blByZSA9IG9UYXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLXByZScpWzBdO1xyXG4gICAgICAgIHRoaXMub0J0bk5leHQgPSBvVGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bi1uZXh0JylbMF07XHJcbiAgICAgICAgdGhpcy5vRG90ID0gb1RhcmdldC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoY2QtZG90JylbMF07XHJcbiAgICAgICAgdGhpcy5hRG90TGkgPSB0aGlzLm9Eb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XHJcbiAgICAgICAgdGhpcy5uTm93ID0gMTtcclxuICAgICAgICB0aGlzLmxvY2tQcmUgPSBmYWxzZTsvL+mYsuaKluWKqFxyXG4gICAgICAgIHRoaXMubG9ja05leHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvY2tDbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubkxpTGVuID0gdGhpcy5vVWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJykubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubkltZ1dpZHRoID0gdGhpcy5vVWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJylbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIC8v5rOo5oSP6L2u5pKt5Zu+5LiA6Iis5pivdWw+bGk+YT5pbWfvvIzmiYDku6XliIforrBjbG9uZU5vZGUodHJ1ZSnnmoR0dXJlISEhXHJcbiAgICAgICAgdGhpcy5vVWwuaW5zZXJ0QmVmb3JlKCQodGhpcy5vVWwpLmNoaWxkcmVuKCdsaScpW3RoaXMubkxpTGVuIC0gMV0uY2xvbmVOb2RlKHRydWUpLCAkKHRoaXMub1VsKS5jaGlsZHJlbignbGknKVswXSk7XHJcbiAgICAgICAgdGhpcy5vVWwuYXBwZW5kQ2hpbGQoJCh0aGlzLm9VbCkuY2hpbGRyZW4oJ2xpJylbMV0uY2xvbmVOb2RlKHRydWUpKTtcclxuICAgICAgICB0aGlzLm9VbC5zdHlsZS5sZWZ0ID0gKC10aGlzLm5JbWdXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgIHRoaXMubkxpTGVuID0gdGhpcy5vVWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAkKHRoaXMub0J0blByZSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5sb2NrUHJlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubG9ja1ByZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5Ob3cgPSAodGhpcy5uTm93IC0gMSArIHRoaXMubkxpTGVuKSAlIHRoaXMubkxpTGVuOy8vdGhpcy5uTGlMZW4g5LiqIGxpXHJcbiAgICAgICAgICAgIHRoaXMuY2FyU3dpdGNoKCdwcmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+i/memHjOS5n+WPr+S7peeUqGJpbmQs5bCx5Y+v5Lul5LiN55SodGhhdCzkvYZiaW5k55qE5Z2R5piv5q+P5qyh6YO96YeN5paw5Yib5bu65LiA5Liq77yM5aaC5p6c5LiA55u054K55Ye75b2T54S26YeN5aSN5Yib5bu677yM5pWI546H5LiN5aW977yM5LiN6KaB5L2/55So77yB77yB77yBXHJcbiAgICAgICAgJCh0aGlzLm9CdG5OZXh0KS5vbignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmxvY2tOZXh0KSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubG9ja05leHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uTm93ID0gKHRoaXMubk5vdyArIDEpICUgdGhpcy5uTGlMZW47XHJcbiAgICAgICAgICAgIHRoaXMuY2FyU3dpdGNoKCduZXh0Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGlzLm9Eb3QpLm9uKCdjbGljaycsICdsaScsIChldiA9IHdpbmRvdy5ldmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5sb2NrQ2xpY2sgfHwgdGhpcy5uTm93ID09ICQoZXYudGFyZ2V0ID9ldi50YXJnZXQgOmV2LnNyY0VsZW1lbnQpLmluZGV4KCkgKyAxKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0NsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubk5vdyA9ICQoZXYudGFyZ2V0ID9ldi50YXJnZXQgOmV2LnNyY0VsZW1lbnQpLmluZGV4KCkgKyAxO1xyXG4gICAgICAgICAgICB0aGlzLmNhclN3aXRjaCgnZG90Q2xpY2snKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhclN3aXRjaCgpe1xyXG5cclxuICAgICAgICAgICAgbGV0IGFBcmcgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgICQodGhpcy5vVWwpLmFuaW1hdGUoe2xlZnQ6ICgtdGhpcy5uSW1nV2lkdGgpICogdGhpcy5uTm93ICsgJ3B4J30sICgpID0+IHtcclxuICAgICAgICAgICAgLy/ov5nph4zliqHlv4Xms6jmhI/vvIxqcXVlcnnnmoTliqjnlLvmmK/kvb/nlKjlrprml7blmajlrozmiJDnmoTvvIzpgqPmoLnmja7miafooYzmnLrliLbmlL7liLDmnIDlkI7miafooYzliqjnlLvnmoTov5nkuKrlnZHkvaDnn6XpgZPnmoTvvIzmiYDku6XkuIDlrprms6jmhI/vvIzkvb/nlKhqcXVlcnnliqjnlLvml7bmiYDmlLnlj5jnmoTpgqPkupvlj4LmlbDvvIzlpoLmnpzpnIDopoHlnKjliqjnlLvlvIDlp4vliY3or7vlhpnlkIzmoLfnmoTlj4LmlbDvvIzpgqPlj6ropoHmlL7liLBhbmltYXRlKCnlpJbpg6jlsLHooYzvvIzkvYblpoLmnpzopoHlnKjliqjnlLvnu5PmnZ/lkI7or7vlhpnlkIzmoLfnmoTlj4LmlbDvvIzpgqPlv4Xpobvlj6rog73mlL7lnKhhbmltYXRlKGZ1bmN0aW9uKCl7fSnnmoRmdW5jdGlvbumHjO+8jOehruS/neWKqOeUu+e7k+adn+WQjuivu+WGmeeahOWQjOagt+eahOWPguaVsOaYr+e7j+i/h+WKqOeUu+S/ruaUueWQjueahOWPguaVsOOAglxyXG4gICAgICAgICAgICAgICAgc3dpdGNoKHRoaXMubk5vdylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub1VsLnN0eWxlLmxlZnQgPSB0aGlzLmFEb3RMaS5sZW5ndGggKiAoLXRoaXMubkltZ1dpZHRoKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubk5vdyA9IHRoaXMubkxpTGVuIC0gMjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9VbC5zdHlsZS5sZWZ0ID0gKC10aGlzLm5JbWdXaWR0aCkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5Ob3cgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMuYURvdExpKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYURvdExpW3RoaXMubk5vdyAtIDFdLmNsYXNzTmFtZSA9ICdhY3RpdmUnO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYUFyZ1swXSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja1ByZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ25leHQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RvdENsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtDYXJvdXNlbH07IiwiY2xhc3MgSW1nTGF6eUxvYWQge1xyXG4gICAgY29uc3RydWN0b3IoYVRhcmdldCkge1xyXG4gICAgICAgIHRoaXMuYUltZyA9IGFUYXJnZXQ7XHJcbiAgICAgICAgdGhpcy5uV2luU2NyVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHRoaXMubldpbkhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICB0aGlzLnRpbWVyMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50aW1lcjIgPSBudWxsO1xyXG4gICAgICAgIC8v6L+Z6YeM6Lip5LqG5LiA5Liq5Z2R77yManF1ZXJ555qEc2Nyb2xsVG9w5piv6L+U5Zue5pWw5YC877yM6L+Z5Liq5pWw5YC85LiN5piv5Yqo5oCB5Y+Y5YyW55qE77yM5LuF5LuF5oyH5b2T5pe255qE77yM55uu5YmN5Y+q5pyJZG9t55qEbm9kZUxpc3TmmK/liqjmgIHlj5jljJbnmoTvvIHvvIHvvIFcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICR3aW4gPSAkKHdpbmRvdyk7XHJcbiAgICAgICAgJCh0aGlzLmFJbWcpLm5vdCgnLmxvYWRlZCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuYXR0cignZGF0YS1zcmMnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdzcmMnLCAnLi9kaXN0L2ltZy9sb2FkaW5nLnN2ZycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaXNWaXNpYmxlKCQodGhpcykpICYmIF90aGlzLnNob3coJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkd2luLm9uKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uV2luSGVpZ2h0ID0gJHdpbi5oZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHdpbi5vbignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm5XaW5TY3JUb3AgPSAkd2luLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzLmFJbWcpLm5vdCgnLmxvYWRlZCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5hdHRyKCdkYXRhLXNyYycpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaXNWaXNpYmxlKCQodGhpcykpICYmIF90aGlzLnNob3coJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmlzaWJsZSgkdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYoKHRoaXMubldpblNjclRvcCArIHRoaXMubldpbkhlaWdodCA+ICR0YXJnZXQub2Zmc2V0KCkudG9wKSAmJlxyXG4gICAgICAgICAgICAodGhpcy5uV2luU2NyVG9wIDwgJHRhcmdldC5vZmZzZXQoKS50b3AgKyAkdGFyZ2V0Lm91dGVySGVpZ2h0KHRydWUpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coJHRhcmdldCkge1xyXG4gICAgICAgICR0YXJnZXQub24oJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkdGFyZ2V0LmF0dHIoJ3NyYycsICcuL2Rpc3QvaW1nL2xvYWRGYWlsLnBuZycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICR0YXJnZXQuYXR0cignc3JjJywgJHRhcmdldC5hdHRyKCdkYXRhLXNyYycpKTtcclxuICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdsb2FkZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWJvdW5jZShmdW5jKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIxKTtcclxuICAgICAgICB0aGlzLnRpbWVyMSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgfSwgMjYwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdHRsZShmdW5jKSB7XHJcbiAgICAgICAgaWYoIXRoaXMudGltZXIyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lcjIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIyID0gbnVsbDtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge0ltZ0xhenlMb2FkfTsiLCJpbXBvcnQge0Nhcm91c2VsfSBmcm9tIFwiLi9jYXJvdXNlbC5qc1wiO1xuaW1wb3J0IHthamF4fSBmcm9tIFwiLi9hamF4LmpzXCI7XG5pbXBvcnQge0ltZ0xhenlMb2FkfSBmcm9tIFwiLi9pbWdMYXp5TG9hZC5qc1wiXG4vL2NvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnJlcXVpcmUoJy4uL2Nzcy9zdHlsZS5jc3MnKTtcblxuICAgICAgICAgICAgY2xhc3MgR29Ub3Age1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKG9UYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vR29Ub3AgPSBvVGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkd2luID0gJCh3aW5kb3cpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJG9Hb1RvcCA9ICQodGhpcy5vR29Ub3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgJG5hdiA9ICRvR29Ub3AucGFyZW50KCkuY2hpbGRyZW4oJ25hdicpO1xuICAgICAgICAgICAgICAgICAgICAkbmF2LnN0b3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHdpbi5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJHdpbi5zY3JvbGxUb3AoKSA+IDUwMCAmJiAkd2luLndpZHRoKCkgPj0gMTI4MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvR29Ub3AuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyAmJiAoY29uc29sZS5sb2coJ3Nob3cnKSwgJG9Hb1RvcC50b2dnbGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvR29Ub3AuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycgJiYgKGNvbnNvbGUubG9nKCdoaWRlJyksICRvR29Ub3AudG9nZ2xlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHdpbi5vbigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJHdpbi53aWR0aCgpIDwgMTI4MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCRuYXYud2lkdGgoKSAhPSAxMjgwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnPDEyODAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvR29Ub3AuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG5hdi5jc3Moe1wid2lkdGhcIjogMTI4MH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG5hdi5zdG9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoISRuYXYuc3RvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJz49MTI4MCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHdpbi5zY3JvbGxUb3AoKSA+IDUwMCAmJiAkb0dvVG9wLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRuYXYuY3NzKHtcIndpZHRoXCI6IFwiMTAwJVwifSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmF2LnN0b3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkb0dvVG9wLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAwfSwgJ2Zhc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlYm91bmNlKGZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcjEgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3R0bGUoZnVuYykge1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy50aW1lcjIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGFzcyBhamF4VG9SZW5kZXJ7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3Iob1RndCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub1RndCA9IG9UZ3Q7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5pdCgpe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMub1RndCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdG9wKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmx5b25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb1BtZTEgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuL2Rpc3QvaW1nL2VsaS5qcGcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJywvL+epuuWtl+espuS4suWNs+m7mOiupOS4unRleHTmoLzlvI9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Mob1BybXQpIHtyZXNvbHZlKG9Qcm10KTt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKG9Qcm10KSB7Y29uc29sZS5sb2cob1BybXQpO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb1BtZTEudGhlbigob1BybXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxpXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1nVXJsXCI6IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG9Qcm10KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaDNUZXh0XCI6IFwi57ua5r+R57uY6YeM77yI44GC44KE44GbIOOBiOOCiu+8iVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwVGV4dFwiOiBcIkNW77ya5Y2X5p2h54ix5LmDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvUG1lMiA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vZGF0YS5qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsLy/nqbrlrZfnrKbkuLLljbPpu5jorqTkuLp0ZXh05qC85byPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKG9Qcm10KSB7cmVzb2x2ZShvUHJtdCl9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKG9Qcm10KSB7Y29uc29sZS5sb2cob1BybXQpO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb1BtZTIudGhlbigob1BybXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihvUHJtdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZW5kZXIob1BybXQsIGhhc0Jsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBoMyA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIG9Qcm10KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWd1cmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhhc0Jsb2IpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoaW1nLnNyYyk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBvUHJtdFtrZXldLmltZ1VybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGgzLmlubmVyVGV4dCA9IG9Qcm10W2tleV0uaDNUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcC5pbm5lclRleHQgPSBvUHJtdFtrZXldLnBUZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmUuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZS5hcHBlbmRDaGlsZChoMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmUuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm1zMy1jb250ZW50XCIpLmFwcGVuZChmaWd1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgb0NhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlci1jYXJvdXNlbCcpWzBdLFxuICAgICAgICAgICAgICAgICAgICBvR29Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXItZ29Ub3AnKVswXSxcbiAgICAgICAgICAgICAgICAgICAgb1JkciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW4tc2VjdGlvbjMnKVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJylbMF0sXG4gICAgICAgICAgICAgICAgICAgIGFJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG4gICAgICAgICAgICAgICAgbmV3IENhcm91c2VsKG9DYXIpO1xuICAgICAgICAgICAgICAgIG5ldyBHb1RvcChvR29Ub3ApO1xuICAgICAgICAgICAgICAgIG5ldyBhamF4VG9SZW5kZXIob1Jkcik7XG4gICAgICAgICAgICAgICAgbmV3IEltZ0xhenlMb2FkKGFJbWcpO1xuICAgICAgICAgICAgfSk7Il0sInNvdXJjZVJvb3QiOiIifQ==