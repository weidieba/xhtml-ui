<template>
    <span class="x-copy">
        <slot />
    </span>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    name: 'XCopy',
    props: {
        kind: {
            type: String,
            default: 'ref'
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            myClipboard: null
        };
    },
    mounted() {
        let mySlot = this.$slots.default && this.$slots.default[0];
        let myEl = this.$el.children && this.$el.children[0];
        console.log(this.$el);
        if (mySlot && mySlot && this.value) {
            let that = this;
            if (that.kind === 'ref') {
                that.myClipboard = new Clipboard(myEl, {
                    target() {
                        return mySlot.context.$refs[that.value].$el
                            ? mySlot.context.$refs[that.value].$el
                            : mySlot.context.$refs[that.value];
                    }
                });
            }
            else if (that.kind === 'target') {
                that.myClipboard = new Clipboard(myEl, {
                    target() {
                        return document.querySelector(that.value);
                    }
                });
            }
            else if (that.kind === 'text') {
                that.myClipboard = new Clipboard(myEl, {
                    text() {
                        return that.value;
                    }
                });
            }
            if (that.myClipboard) {
                that.myClipboard.on('success', function (e) {
                    that.$emit('success', e);
                });
                that.myClipboard.on('error', function (e) {
                    that.$emit('error', e);
                });
            }
        }
    },
    beforeDestroy() {
        if (this.myClipboard) {
            this.myClipboard.destroy();
        }
    }
};
</script>
