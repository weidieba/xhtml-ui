/**
 * 得到浏览器计算后的css样式
 * @param {Element} element element
 * @param {string=} property css property
 * @return {string|Object} css style value.
 */
export function getComputedStyle(element, property) {
    //  判断是否为元素节点
    if (element.nodeType !== 1) {
        return [];
    }

    const computedcCss = window.getComputedStyle(element, null);
    return property ? (computedcCss.getPropertyValue(property) || computedcCss[property]) : computedcCss;
}

//  元素添加事件
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    }
    //  兼容ie9下
    return function (element, event, handler) {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    };
})();

//  元素解绑事件
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    }
    // 兼容ie9下
    return function (element, event, handler) {
        if (element && event) {
            element.detachEvent('on' + event, handler);
        }
    };
})();

// 防抖函数
export function debounce(callback, delay) {
    let time;
    return function () {
        if (time) {
            window.clearTimeout(time);
        }

        time = setTimeout(() => {
            time = null;
            callback.apply(this, arguments);
        }, delay);
    };
}

// 查找父级
export function getParent(element) {
    if (!element) {
        return;
    }

    //  查找父级
    while (element) {

        const nodeName = element.nodeName.toLowerCase();
        if (nodeName === 'body' || nodeName === 'html') {
            return;
        }

        const {overflow, overflowX, overflowY} = getComputedStyle(element);
        if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
            return element;
        }

        element = element.parentNode;
    }
}

/**
 * 判断指定element元素是否有滚动条
 * @param {Element} element 指定的元素
 * @return {Boolean} 是否有滚动条
 */
export function getIsScrollbar(element) {
    return element.scrollHeight > element.clientHeight;
}

/**
 * 获取元素的大小位置
 * @param {Element|string} element dom element or 'html'.
 * @return {Object} rect value
 */
export function getElePosition(element) {
    let rect = {};
    // 外层视窗
    if (element === 'viewport') {
        const scrollTop = getScrollTop();
        const scrollLeft = getScrollLeft();
        const viewWidth = getViewWidth();
        const viewHeight = getViewHeight();
        return {
            top: scrollTop,
            left: scrollLeft,
            right: scrollLeft + viewWidth,
            bottom: scrollTop + viewHeight,
            width: viewWidth,
            height: viewHeight
        };
    }

    if (element === 'html' || element.nodeName === 'HTML') {
        const pageWidth = getPageWidth();
        const pageHeight = getPageHeight();

        // viewport
        rect = {
            top: 0,
            left: 0,
            right: pageWidth,
            bottom: pageHeight,
            width: pageWidth,
            height: pageHeight
        };
        return rect;
    }

    const isIE10 = window.navigator.appVersion.indexOf('MSIE 10') !== -1;
    if (isIE10) {
        // IE10 10 FIX: Please, don't ask, the element isn't
        // considered in DOM in some circumstances...
        // This isn't reproducible in IE10 compatibility mode of IE11
        try {
            rect = element.getBoundingClientRect();
        }
        catch (err) {
            rect = {};
        }
    }
    else {
        rect = element.getBoundingClientRect();
    }

    const win = getWindow(element);
    const scrollTop = getScrollTop(win);
    const scrollLeft = getScrollLeft(win);
    const left = (rect.left || 0) + scrollLeft;
    const top = (rect.top || 0) + scrollTop;
    const width = rect.width || 0;
    const height = rect.height || 0;
    const right = left + width;
    const bottom = top + height;
    console.log(top);
    return {
        left,
        top,
        right,
        bottom,
        width,
        height
    };
}

/**
 *
 * @param {element} element 节点
 * @return {element} 节点的顶层的 document 对象。
 */
export function getWindow(element) {
    return element.ownerDocument && element.ownerDocument.defaultView || null;
}

export function getScrollTop(win) {
    win = win || window;
    const doc = win.document;
    return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
}

export function getScrollLeft(win) {
    win = win || window;
    const doc = win.document;
    return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
}

export function getViewWidth(win) {
    win = win || window;
    const doc = win.document;
    const client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
    return client.clientWidth;
}

export function getViewHeight(win) {
    win = win || window;
    const doc = win.document;
    const client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
    return client.clientHeight;
}

export function getPageWidth(win) {
    win = win || window;
    const doc = win.document;
    const body = doc.body;
    const de = doc.documentElement;
    const client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(de.scrollWidth, body.scrollWidth, client.clientWidth);
}

export function getPageHeight(win) {
    win = win || window;
    const doc = win.document;
    const body = doc.body;
    const de = doc.documentElement;
    const client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(de.scrollHeight, body.scrollHeight, client.clientHeight);
}
