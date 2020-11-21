<template>
    <transition name="x-status">
        <div
            v-if="isAlive"
            :class="computedClass"
        >
            <div
                class="x-status-bar-content"
                :class="{'x-status-bar-mediumcontent':size!=='large'}"
                :style="center ? 'justify-content:center' : ''"
            >
                <div
                    class="x-status-bar-logo"
                    :class="{'x-status-bar-mediumlogo':size!=='large'}"
                >
                    <x-icon
                        :icon="iconKind"
                        :class="['x-status-bar-icon--' + kind]"
                    />
                </div>
                {{ content }}
                <div
                    class="x-status-bar-close"
                    :class="{'x-status-bar-mediumclose':size!=='large'}"
                >
                    <template v-if="showCloseIcon">
                        <x-icon
                            icon="x-icon-close"
                            :class="['x-status-bar-icon--' + kind]"
                            @click="closeStatusBar"
                        />
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'XStatusbar',
    props: {
        content: {
            type: String,
            default: ''
        },
        kind: {
            type: String,
            //  warning-outline success warning error alarm
            default: ''
        },
        size: {
            type: String,
            default: 'large'
        },
        center: {
            type: Boolean,
            default: false
        },
        showCloseIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isAlive: true
        };
    },
    computed: {
        iconKind() {
            if (this.kind.length > 0) {
                if (this.kind === 'alarm') {
                    return 'x-icon-warning-outline';
                }
                return 'x-icon-' + this.kind;
            }
            return '';
        },
        computedClass() {
            if (this.size === 'large') {
                return `x-status-bar x-status-bar--${this.kind}`;
            }
            return `x-status-bar-medium x-status-bar--${this.kind}`;
        }
    },
    methods: {
        closeStatusBar() {
            console.log(123123);
            this.$emit('close');
            this.isAlive = false;
            this.$el = null;
            this.$nextTick(() => {
                this.$destroy(true);
            });
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/common/color.scss";
.#{$class-prefix} {
    &-status-enter-active,&-status-leave-active {
        /*进入和离开时时间为0.5s*/
        transition: all 0.5s;
    }
    &-status-enter{
        /*设置透明度为0*/
        opacity: 0;
        transform: translateY(0px);
    }
    &-status-enter-to{
        opacity: 1;
        transform: translateY(20px);
    }
    &-status-leave{
        opacity: 1;
    }
    &-status-leave-to{
        opacity: 0;
        transform: translateY(0px);
    }
    &-status-bar {
        overflow: hidden;
        padding:0 46px 0 54px;
        border-radius: $--border-radius-base;
        &-content {
            width: 100%;
            min-height: 40px;
            word-break: break-all;
            position: relative;
            padding: 13px 0;
            box-sizing: border-box;
            line-height: 24px;
            font-size: 14px;
            color: #1e2330;
            display: flex;
            align-items: center;
        }
        &-mediumcontent{
            width: 100%;
            min-height: 30px;
            padding: 10px 0;
        }
        &-logo {
            display: inline-block;
            position: relative;
            top: 2px;
            .x-icon {
                font-size: 26px;
            }
        }
        &-mediumlogo {
            .x-icon {
                font-size: 20px;
            }
        }
        &-close {
            margin-left: auto;
            .x-icon {
                font-size: 16px;
                cursor: pointer;
            }
        }
        &-mediumclose {
            .x-icon {
                font-size: 14px;
            }
        }
        &-icon {
            &--success {
                color: $--color-success;
            }

            &--warning-outline {
                color: $--color-notice;
            }

            &--error {
                color: $--color-warning;
            }

            &--info {
                color: $--color-info;
            }
            &--alarm {
                color: $--color-primary;
            }
        }
        &--success {
            background-color: $--bg-light-success;
        }

        &--warning-outline {
            background-color: $--bg-light-notice;
        }

        &--error {
            background-color: $--bg-light-warning;
        }

        &--info {
            background-color: $--bg-light-info;
        }
        &--alarm {
            background-color: $--bg-light-primary;
        }
    }
    &-status-bar-medium {
        border-radius: $--border-radius-base;
        overflow: hidden;
        padding:0 46px 0 43px;
        display: flex;
        align-items: center;
    }
}
</style>
