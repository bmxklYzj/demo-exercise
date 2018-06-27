/**
 * @file scrollspy（左侧导航随着右侧内容区域的滚动而 变化高亮）
 *
 * @author yangzongjun
 * @date  2018-06-27
 */

 /**
  * constructor
  *
  * @class
  */
function ScrollSpy() {
    this.navWrap = document.querySelector('[scroll-spy="nav"]');
    this.contentWrap = document.querySelector('[scroll-spy="content"]');
    this.navList = this.navWrap.querySelectorAll('[nav-href]');
    this.contentList = this.contentWrap.querySelectorAll('[nav-content]');

    this.ACTIVE_CLASS_NAME = 'active';
    this.currentIndex = 0;

    this._init();
    this.timeId = null;
}

/**
 * bind events
 */
ScrollSpy.prototype._init = function () {
    var me = this;
    // scroll handler
    window.addEventListener('scroll', function () {
        me._throttle(me._scrollHandler, me, 100);
    }, false);

    // nav click handler
    this.navWrap.addEventListener('click', function (event) {
        me._clickHandler(event);
    }, false);
};

/**
 * throttle , for better performance
 *
 * @param {Function} method function to exec
 * @param {Object} context current this
 * @param {number} delayTime delayTime for setTimeout
 */
ScrollSpy.prototype._throttle = function (method, context, delayTime) {
    clearTimeout(this.timeId);
    this.timeId = setTimeout(function () {
        method.call(context);
    }, delayTime || 100);
};

ScrollSpy.prototype._scrollHandler = function () {
    var contentFromViewportTopArr = []; // 每个 nav-content 距离viewport顶部的距离绝对值
    this.contentList.forEach(function (item, index) {
        contentFromViewportTopArr.push(Math.abs(item.getBoundingClientRect().top));
    });

    var min = Math.min.apply(null, contentFromViewportTopArr);
    var index = contentFromViewportTopArr.indexOf(min);
    if (this.currentIndex === index) {
        return;
    }
    else {
        this._setActive(this.currentIndex, index);
        this.currentIndex = index;
    }
};

ScrollSpy.prototype._clickHandler = function (event) {
    if (event.target.hasAttribute('nav-href')) {
        var targetHrefValue = event.target.getAttribute('nav-href');
        for (let i = 0, len = this.contentList.length; i < len; i++) {
            var item = this.contentList[i];
            if (targetHrefValue === item.getAttribute('nav-content') && this.currentIndex !== i) {
                this._setActive(this.currentIndex, i);
                this.currentIndex = i;

                window.scrollTo({
                    top: item.getBoundingClientRect().top + document.documentElement.scrollTop
                });
            }
        }
    }
};

ScrollSpy.prototype._clearActive = function (index) {
    this.navList[index].classList.remove(this.ACTIVE_CLASS_NAME);
};

ScrollSpy.prototype._setActive = function (oldIndex, index) {
    this._clearActive(oldIndex);

    this.navList[index].classList.add(this.ACTIVE_CLASS_NAME);
};

new ScrollSpy();
