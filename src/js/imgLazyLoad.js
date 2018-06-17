class ImgLazyLoad {
    constructor(aTarget) {
        this.aImg = aTarget;
        this.nWinScrTop = $(window).scrollTop();
        this.nWinHeight = $(window).height();
        this.timer1 = null;
        this.timer2 = null;
        //这里踩了一个坑，jquery的scrollTop是返回数值，这个数值不是动态变化的，仅仅指当时的，目前只有dom的nodeList是动态变化的！！！
        this.init();
    }

    init() {
        let _this = this,
            $win = $(window);
        $(this.aImg).not('.loaded').each(function() {
            if($(this).attr('data-src'))
            {
                $(this).attr('src', './dist/img/loading.svg');
                _this.isVisible($(this)) && _this.show($(this));
            }
        });
        $win.on('resize', () => {
            this.debounce(() => {
                this.nWinHeight = $win.height();
            });
        });
        $win.on('scroll', () => {
            this.debounce(() => {
                _this.nWinScrTop = $win.scrollTop();
                $(this.aImg).not('.loaded').each(function() {
                    if($(this).attr('data-src'))
                    {
                        _this.isVisible($(this)) && _this.show($(this));
                    }
                });
            });
        });
    }

    isVisible($target) {
        if((this.nWinScrTop + this.nWinHeight > $target.offset().top) &&
            (this.nWinScrTop < $target.offset().top + $target.outerHeight(true)))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    show($target) {
        $target.on('error', () => {
            $target.attr('src', './dist/img/loadFail.png');
        });
        $target.attr('src', $target.attr('data-src'));
        $target.addClass('loaded');
    }

    debounce(func) {
        clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
            func();
        }, 260);
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

export {ImgLazyLoad};