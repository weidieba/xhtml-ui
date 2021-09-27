<template>
    <div
        class="x-drag-item"
        :draggable="$slots.default || isDrag"
        :style="{cursor: $slots.default ? 'move': ''}"
        @dragstart.stop="handleDragstart"
        @dragenter.stop="handleDragenter"
        @dragend.stop="handleDragend"
    >
        <!-- <slot name="drag" /> -->
        <slot />
    </div>
</template>
<script>
import Emitter from '@/assets/utils/emitter';
export default {
    name: 'XDrapItem',
    mixins: [Emitter],
    data() {
        return {
            isDrag: false
        };
    },
    mounted() {
        if (this.$slots.default) {
            // this.setSlotAttr();
            this.dispatch('XDrapWrap', 'getChild', this.$el);
        }
        else {
            throw '具名插槽内只能有一个根节点~';
        }

    },
    methods: {
        handleDragstart() {
            // 向上传递执行方法
            this.$el.style.opacity = '0.3';
            this.dispatch('XDrapWrap', 'dragstart', this.$el);
        },
        handleDragenter() {
            // 向上传递执行方法
            this.dispatch('XDrapWrap', 'dragenter', this.$el);
        },
        handleDragend() {
            this.$el.style.opacity = '1';
            this.dispatch('XDrapWrap', 'dragend', this.$el);
        },
        setSlotAttr() {
            const slotVNode = this.$slots.default.find(
                vnode => !vnode.data && vnode.text !== ' '
            );
            const dragDom = slotVNode.elm.previousSibling;
            if (dragDom.previousSibling !== null) {
                throw '具名插槽内只能有一个根节点~';
            }
            dragDom.addEventListener('mouseenter', () => {
                this.isDrag = true;
            });
            dragDom.addEventListener('mouseleave', () => {
                this.isDrag = false;
            });
            dragDom.style.cursor = 'move';
        }
    }
};
</script>
