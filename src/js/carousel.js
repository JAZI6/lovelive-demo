class Carousel {
    constructor(oTarget) {
        this.oUl = oTarget.getElementsByClassName('hc-imgList')[0];
        this.oBtnPre = oTarget.getElementsByClassName('btn-pre')[0];
        this.oBtnNext = oTarget.getElementsByClassName('btn-next')[0];
        this.oDot = oTarget.getElementsByClassName('hcd-dot')[0];
        this.aDotLi = this.oDot.getElementsByTagName('li');
        this.nNow = 1;
        this.lockPre = false;//防抖动
        this.lockNext = false;
        this.lockClick = false;
        this.nLiLen = this.oUl.getElementsByTagName('li').length;
        this.nImgWidth = this.oUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0].width;
        this.init();
    }
    init(){
        //注意轮播图一般是ul>li>a>img，所以切记cloneNode(true)的ture!!!
        this.oUl.insertBefore($(this.oUl).children('li')[this.nLiLen - 1].cloneNode(true), $(this.oUl).children('li')[0]);
        this.oUl.appendChild($(this.oUl).children('li')[1].cloneNode(true));
        this.oUl.style.left = (-this.nImgWidth) + 'px';
        this.nLiLen = this.oUl.getElementsByTagName('li').length;

        $(this.oBtnPre).on('click', () => {

            if(this.lockPre) return;
            this.lockPre = true;

            this.nNow = (this.nNow - 1 + this.nLiLen) % this.nLiLen;//this.nLiLen 个 li
            this.carSwitch('pre');
        });
        //这里也可以用bind,就可以不用that,但bind的坑是每次都重新创建一个，如果一直点击当然重复创建，效率不好，不要使用！！！
        $(this.oBtnNext).on('click', () => {

            if(this.lockNext) return;
            this.lockNext = true;

            this.nNow = (this.nNow + 1) % this.nLiLen;
            this.carSwitch('next');
        });
        $(this.oDot).on('click', 'li', (ev = window.event) => {

            if(this.lockClick || this.nNow == $(ev.target ?ev.target :ev.srcElement).index() + 1) return;
            this.lockClick = true;

            this.nNow = $(ev.target ?ev.target :ev.srcElement).index() + 1;
            this.carSwitch('dotClick');
        });
    }
    carSwitch(){

            let aArg = arguments;
            $(this.oUl).animate({left: (-this.nImgWidth) * this.nNow + 'px'}, () => {
            //这里务必注意，jquery的动画是使用定时器完成的，那根据执行机制放到最后执行动画的这个坑你知道的，所以一定注意，使用jquery动画时所改变的那些参数，如果需要在动画开始前读写同样的参数，那只要放到animate()外部就行，但如果要在动画结束后读写同样的参数，那必须只能放在animate(function(){})的function里，确保动画结束后读写的同样的参数是经过动画修改后的参数。
                switch(this.nNow)
                {
                    case 0:
                        this.oUl.style.left = this.aDotLi.length * (-this.nImgWidth) + 'px';
                        this.nNow = this.nLiLen - 2;
                    break;

                    case 5:
                        this.oUl.style.left = (-this.nImgWidth) + 'px';
                        this.nNow = 1;
                    break;
                };

                $(this.aDotLi).each(function() {
                    this.className = '';
                });
                this.aDotLi[this.nNow - 1].className = 'active';

                switch (aArg[0])
                {
                        case 'pre':
                            this.lockPre = false;
                        break;

                        case 'next':
                            this.lockNext = false;
                        break;

                        case 'dotClick':
                            this.lockClick = false;
                        break;
                }
            });
    }
}

export {Carousel};