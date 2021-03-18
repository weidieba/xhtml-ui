import {on, off, getComputedStyle, debounce} from '@/assets/utils/dom.js';
const bottom = function (element, currentTop, offset) {
    //  获取当前计算的style属性
    const styles = getComputedStyle(element);
    // 强转 获取盒模型 上边框的宽度
    const borderTop = parseInt(styles.borderTopWidth, 10);
    const borderBottom = parseInt(styles.borderBottomWidth, 10);
    /*
        scrollHeight： 内容区高度
        offsetHeight： 元素高度包含边距和边框
        currentTop： 获取当前scroll的高度
        targetTop： 得到当前隐藏了的高度
    */
    const targetTop = element.scrollHeight - (element.offsetHeight - borderTop - borderBottom);
    /*
        currentTop： 当前被滚动隐藏的高度
        offset： 偏移值 距离多少处罚
        targetTop： 得到当前隐藏了的高度
        currentTop + offset = targetTop 证明到达底部
    */
    return (currentTop > 0) && (currentTop + offset >= targetTop);
};

/*
    binding vueproperty
*/
let daley_num = 300;
const postion = debounce((element, binding) => {
    if (typeof binding.value !== 'function') {
        return;
    }
    Object.keys(binding.modifiers).forEach(item => {
        if (item !== 'bottom') {
            binding.offset = item;
            return;
        }
        // scrollTop 滚动条元素
        const currentTop = element.scrollTop;
        const result = bottom(element, currentTop, parseInt(binding.offset, 20) || 0);
        //  执行方法
        if (result) {
            binding.value(currentTop);
        }
    });
}, daley_num || 250);

export default {
    name: 'on-scroll',

    bind(el, binding, vnode) {
        const onscroll = function () {
            postion(el, binding);
        };
        el.XSCORLL = onscroll;
        on(el, 'scroll', onscroll);
    },

    unbind(el) {
        const onscroll = el.XSCORLL;
        off(el, 'scroll', onscroll);
    },
    // vnode更新
    update(el, binding, vnode) {
        if (vnode.data && vnode.data.attrs && vnode.data.attrs.scrollDisable) {
            const onscroll = el.XSCORLL;
            off(el, 'scroll', onscroll);
            return;
        }
    }
};
