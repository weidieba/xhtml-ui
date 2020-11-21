<template>
    <div :class="clazz">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'XRadioGroup',

    props: {
        value: {
            type: String,
            default: ''
        },
        vertical: {
            type: Boolean,
            default: false
        },
        kind: {
            // button, default
            type: String,
            default: 'default'
        }
    },

    data() {
        return {
            currentValue: this.value
        };
    },

    computed: {
        clazz: function () {
            return [
                'x-radio-group',
                `x-radio-group-${this.kind}`,
                {
                    'x-radio-group-vertical': this.vertical
                }
            ];
        }
    },

    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue(nextValue) {
            this.$emit('input', nextValue);
            this.$emit('change', nextValue);
        }
    },

    methods: {
        updateValue(val) {
            this.currentValue = val;
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/common/color.scss";
@import "~@/assets/common/reset.scss";
.#{$class-prefix} {
    &-radio-group {
        @include reset;
        display: flex;
        &-vertical {
            display: flex;
            flex-direction:column;
            .x-radio-group-item {
                display: block;
                margin: 10px 0;

                &:first-child {
                    margin-top: 0;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        &-default {
            line-height: 20px;

            .v-radio-group-item  {
                margin-right: 10px;
                vertical-align: top;
            }
        }

        &-button {
            .x-radio-group-item {
                width: 82px;

                .x-radio-input {
                    display: none;
                }

                .x-radio-label {
                    display: block;
                    margin: 0;
                    padding: 9px 15px;
                    height: 40px;
                    line-height: 20px;
                    white-space: nowrap;
                    vertical-align: middle;
                    cursor: pointer;
                    text-align: center;
                    outline: none;
                    background: transparent;
                    border: 1px solid $--line-deep-gray;
                    // border-left: 0;
                    -webkit-appearance: none;
                    box-sizing: border-box;

                    &:hover {
                        color: $--color-primary;
                    }

                    &:active {
                        background-color: $--bg-deep-gray;
                    }
                }

                &:first-child {
                    .x-radio-label {
                        border-left: 1px solid $--line-deep-gray;
                        border-radius: $--border-radius-base 0 0 $--border-radius-base;
                        box-shadow: none !important;
                    }
                }
                &:last-child {
                    .x-radio-label {
                        border-radius: 0 $--border-radius-base $--border-radius-base 0;
                    }
                }

                &.is-checked {
                    .x-radio-label {
                        color: $--color-primary;
                    }
                }
                &.is-disabled {
                    .x-radio-label {
                        border-right: 1px solid $--line-deep-gray;
                        opacity: $--disabled-opacity;
                        &:hover {
                            cursor:not-allowed;
                            color: inherit;
                        }
                        &:active {
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    }
}
</style>
