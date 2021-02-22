<template>
    <transition name="x-message-fade">
        <div
            v-show="messageVisible"
            class="x-message"
            :class="customClass"
            @mouseenter="clearTimer"
            @mouseleave="setTimer"
        >
            <x-icon
                :icon="iconName"
                class="message_icon mr10"
            ></x-icon>
            {{ content }}
        </div>
    </transition>
</template>

<script>
const ICON = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
};
export default {
    name: 'XMessage',
    data() {
        return {
            type: 'info',
            messageVisible: false,
            content: '',
            duration: 2000,
            closed: false,
            // 关闭时的回调函数
            onClose: null
        };
    },
    computed: {
        customClass() {
            return `x-message--${this.type}`;
        },
        iconName() {
            return `x-message__icon x-icon-${ ICON[this.type] }`;
        }
    },

    watch: {
        closed(val) {
            if (val) {
                this.messageVisible = false;
                setTimeout(() => {
                    this.removeElement();
                }, 200);
            }
        }
    },

    mounted() {
        this.setTimer();
    },

    methods: {
        removeElement() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },

        close() {
            this.closed = true;
            // 如果传入了回调则在关闭后触发回调
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },

        clearTimer() {
            clearTimeout(this.timer);
        },

        setTimer() {
            // duration大于0时才触发关闭
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.duration);
            }
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/common/color.scss";
.#{$class-prefix}{
    &-message {
        position: fixed!important;
        top: 20px!important;
        left: 50%!important;
        transform: translateX(-50%);
        min-width: 380px;
        height: 50px;
        padding: 0 15px;
        border-radius: 4px;
        text-align: center;
        z-index: 90000;
        font-size: 14px;
        color: $--color-white;
        transition: opacity 0.3s, transform .4s, top 0.4s;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        align-items: center;
        &--info {
            background-color: $--color-info-lighter;
            border-color: $--color-info-light;
            color: $--color-info;
        }
        &--success {
            background-color: $--color-success-lighter;
            border-color: $--color-success-light;
            color: $--color-success;
        }

        &--error {
            background-color: $--color-danger-lighter;
            border-color: $--color-danger-light;
            color: $--color-danger;
        }

        &--warning {
            background-color: $--color-warning-lighter;
            border-color: $--color-warning-light;
            color: $--color-warning;
        }
        .message_icon {
            margin-right: 10px;
            margin-top: 2px;
        }
    }
}
.x-message-fade-enter,
    .x-message-fade-leave-active {
        opacity: 0;
        filter: alpha(opacity=0);
}
</style>
