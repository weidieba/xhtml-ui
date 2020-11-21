<template>
    <label
        :class="{
            'x-radio-group-item': grouped,
            'is-checked': computedValue === label,
            'is-disabled': disabled
        }"
    >
        <span class="x-radio-input">
            <span class="x-radio-round"></span>
            <input
                v-model="computedValue"
                class="x-radio-original"
                type="radio"
                :name="name"
                :value="label"
                :disabled="disabled"
            >
        </span>
        <span class="x-radio-label">
            <slot></slot>
        </span>
    </label>
</template>
<script>
export default {
    name: 'XRadio',
    model: {
        prop: 'value',
        event: 'input'
    },

    props: {
        // 默认绑定到v-model上的value值
        value: {
            type: Object,
            default() {
                return {};
            }
        },
        label: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        grouped() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.name !== 'XRadioGroup') {
                    parent = parent.$parent;
                }
                else {
                    this.setParent(parent);
                    return true;
                }
            }
            return false;
        },
        computedValue: {
            get() {
                return this.grouped
                    ? this._radioGroup.currentValue
                    : this.value;
            },
            set(val) {
                if (this.disabled) {
                    return;
                }

                if (this.grouped) {
                    this._radioGroup.updateValue(val);
                }
                else {
                    const checked = val;
                    this.$emit('input', checked);
                    this.$emit('change', checked);
                }
            }
        }
    },
    methods: {
        setParent(data) {
            this._radioGroup = data;
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/common/color.scss";
@import "~@/assets/common/reset.scss";
.#{$class-prefix}{
    &-radio {
        @include reset;
        position: relative;
        cursor: pointer;
        user-select: none;
        &-input {
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: inline-block;
            position: relative;
            vertical-align: middle;
        }
        &-round {
            display: block;
            width: 20px;
            height: 20px;
            border: 1px solid $--line-deep-gray;
            border-radius: 100%;
            position: relative;
            cursor: pointer;
            box-sizing: border-box;
            background-color: white;

            &:hover {
                border-color: $--color-light-gray;
            }

            &::after {
                content: "";
                width: 10px;
                height: 10px;
                background-color: $--color-primary;
                border-radius: 100%;;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
            }
        }

        &-original {
            opacity: 0;
            outline: none;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
        }

        &-label {
            margin-left: 10px;
        }
        &::after {
            content: '';
            display: table;
            clear: both;
        }
    }
}
.#{$is} {
    &-checked {
        .x-radio-round {
            border-color:$--line-deep-gray;
            &:hover {
                border-color: $--color-light-gray;
            }
            &::after {
                opacity: 1;
            }
        }
    }
    &-disabled {
        .x-radio-round {
            cursor: not-allowed;
            &:hover {
                border-color: $--line-deep-gray;
            }
            &::after {
                cursor: not-allowed;
                background-color: $--line-deep-gray;
            }
        }
        .x-radio-label {
            cursor: not-allowed;
            opacity: $--disabled-opacity;
        }
    }
    &-disabled.is-checked {
        .x-radio-round {
            background-color: $--color-white;
            border-color: $--line-deep-gray;
            opacity: $--disabled-opacity;
            &::after {
                background-color: $--color-primary;
            }
        }
    }
}
</style>
