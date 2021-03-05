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
export default function debounce(callback, delay) {
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
