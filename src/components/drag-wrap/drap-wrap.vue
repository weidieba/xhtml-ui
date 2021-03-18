<template>
    <div ref="dragWrap">
        <slot />
    </div>
</template>
<script>
import Emmitter from '@/assets/utils/emitter';
import {getParent, getIsScrollbar, getElePosition} from '@/assets/utils/dom.js';
export default {
    name: 'XDrapWrap',
    mixins: [Emmitter],
    props: {
        option: {
            type: Array,
            default: () => {
                return [];
            }
        },
        autoScroll: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            toDom: '', // 拖拽时进入的元素
            fromDom: '', // 拖拽开始得元素
            childrenMap: [] // 存放所有item字迹 拖拽后返回最新顺序
        };
    },
    created() {
        this.$on('dragstart', this.onDragstart);
        this.$on('dragenter', this.onDragenter);
        this.$on('dragend', this.onDragEnd);
        this.$on('getChild', child => {
            this.childrenMap.push(child);
        });
    },
    methods: {
        onDragstart(element) {
            this.fromDom = element;
            // 增加根据autoScroll 是否触发父容器自动滚动
            if (this.autoScroll) {
                let parentNode = getParent(element);
                if (parentNode && getIsScrollbar(parentNode)) {
                    const direction = this.getScrollDirection(parentNode);
                    console.log(direction);
                }
            }
        },
        onDragenter(el) {
            this.toDom = el;
            if (this.fromDom === this.toDom) {
                return;
            }

            if (this.isPrevNode(this.fromDom, this.toDom)) {
                this.$refs.dragWrap.insertBefore(this.fromDom, this.toDom);
            }
            else {
                this.$refs.dragWrap.insertBefore(this.fromDom, this.toDom.nextSibling);
            }
        },
        onDragEnd() {
            if (!this.option.length) return;
            // contains()返回的是一个布尔值，来表示传入的节点是否为该节点的子节点。
            const oldNode = [...this.$el.children].filter(child =>
                child.classList.contains('x-drag-item')
            );
            this.getNewChild(oldNode, this.childrenMap);
        },
        getNewChild(oldchild, childrenMap) {
            const newChild = oldchild.map(info => {
                return childrenMap.findIndex(newchild => newchild === info);
            });
            let newData = [];
            newChild.forEach((item, index) => {
                newData[index] = this.option[item];
            });
            this.$emit('change', newData);
        },
        isPrevNode(from, to) {
            //  判断当前节点得上一个节点
            while (from.previousSibling !== null) {
                if (from.previousSibling === to) {
                    return true;
                }
                // 重新赋值防止死循环
                from = from.previousSibling;
            }
        },
        getScrollDirection(parent) {
            const containerRect = getElePosition(parent);
            const srcNodeRect = getElePosition(this.fromDom);
            console.log(srcNodeRect, containerRect);
            if (srcNodeRect.top + srcNodeRect.height > containerRect.top + containerRect.height
                && parent.scrollHeight > parent.clientHeight + parent.scrollTop) {
                return 'bottom';
            }

            if (srcNodeRect.top < containerRect.top && parent.scrollTop > 0) {
                return 'top';
            }
            return '';
        }
    }
};
</script>
