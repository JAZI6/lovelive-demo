import {Carousel} from "./carousel.js";
import {ajax} from "./ajax.js";
import {ImgLazyLoad} from "./imgLazyLoad.js"
//const $ = require('jquery');
require('../css/style.css');

            class GoTop {
                constructor(oTarget) {
                    this.oGoTop = oTarget;
                    this.timer1 = null;
                    this.timer2 = null;
                    this.init();
                }
                init() {
                    let $win = $(window),
                        $oGoTop = $(this.oGoTop),
                        $nav = $oGoTop.parent().children('nav');
                    $nav.stop = false;
                    $win.on('scroll', () => {
                        this.debounce(() => {
                            if($win.scrollTop() > 500 && $win.width() >= 1280)
                            {
                                $oGoTop.css('display') === 'none' && (console.log('show'), $oGoTop.toggle());
                            }
                            else
                            {
                                $oGoTop.css('display') === 'block' && (console.log('hide'), $oGoTop.toggle());
                            }
                        });
                    });
                    $win.on('resize', () => {
                        this.debounce(() => {
                            if($win.width() < 1280)
                            {
                                if($nav.width() != 1280)
                                {
                                    console.log('<1280');
                                    $oGoTop.hide();
                                    $nav.css({"width": 1280});
                                    $nav.stop = false;
                                }
                            }
                            else
                            {
                                if(!$nav.stop)
                                {
                                    console.log('>=1280');
                                    $win.scrollTop() > 500 && $oGoTop.show();
                                    $nav.css({"width": "100%"});
                                    $nav.stop = true;
                                }
                            }
                        });
                    });
                    $oGoTop.on('click', () => {
                        $('html,body').animate({'scrollTop': 0}, 'fast');
                    });
                }
                debounce(func) {
                    clearTimeout(this.timer1);
                    this.timer1 = setTimeout(() => {
                        func();
                    }, 100);
                }
                throttle(func) {
                    if(!this.timer2)
                    {
                        this.timer2 = setTimeout(() => {
                            func();
                            this.timer2 = null;
                        }, 1000);
                    }
                }
            }

            class ajaxToRender{
                constructor(oTgt){
                    this.oTgt = oTgt;
                    this.stop = false;
                    this.init();
                }
                init(){
                    $(this.oTgt).on('click', () => {
                        if(this.stop)
                        {
                            return;
                        }
                        console.log('onlyone');
                        let oPme1 = new Promise((resolve, reject) => {
                            ajax({
                                type: 'get',
                                url: './dist/img/eli.jpg',
                                responseType: 'blob',//空字符串即默认为text格式
                                async: true,
                                data: null,
                                success(oPrmt) {resolve(oPrmt);},
                                fail(oPrmt) {console.log(oPrmt);}
                            });
                        });
                        oPme1.then((oPrmt) => {
                            this.render({
                                "eli": {
                                    "imgUrl": window.URL.createObjectURL(oPrmt),
                                    "h3Text": "绚濑绘里（あやせ えり）",
                                    "pText": "CV：南条爱乃"
                                }
                            }, true);
                        });

                        let oPme2 = new Promise((resolve, reject) => {
                            ajax({
                                type: 'get',
                                url: './data.json',
                                responseType: 'json',//空字符串即默认为text格式
                                async: true,
                                data: null,
                                success(oPrmt) {resolve(oPrmt)},
                                fail(oPrmt) {console.log(oPrmt);}
                            });
                        });
                        oPme2.then((oPrmt) => {
                            this.render(oPrmt);
                        });
                        this.stop = true;
                    });
                }
                
                render(oPrmt, hasBlob) {
                    let img = null,
                        h3 = null,
                        p = null,
                        figure = null;
                    for(let key in oPrmt)
                    {
                        img = document.createElement('img');
                        h3 = document.createElement('h3');
                        p = document.createElement('p');
                        figure = document.createElement('figure');
                        if(hasBlob)
                        {
                            img.onload = () => {
                                window.URL.revokeObjectURL(img.src); 
                            }
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
            }

            $(document).ready(function() {
                let oCar = document.getElementsByClassName('header-carousel')[0],
                    oGoTop = document.getElementsByClassName('header-goTop')[0],
                    oRdr = document.getElementsByClassName('main-section3')[0].getElementsByTagName('button')[0],
                    aImg = document.getElementsByTagName('img');
                new Carousel(oCar);
                new GoTop(oGoTop);
                new ajaxToRender(oRdr);
                new ImgLazyLoad(aImg);
            });