<template>
    <label
        class="x-checkbox"
        :style="(borders&&isIndeterminate || borders&&isChecked)? 'border-color:#0067ed' : ''"
        :class="{'x-checkbox-disabled': disabled, 'x-checkbox-borders': borders}"
    >
        <span
            class="x-checkbox-icon"
            :class="{
                'x-checkbox-checked': isChecked && !isIndeterminate,
                'x-checkbox-indeterminate': isIndeterminate
            }"
        >
            <div class="x-checkbox-inner"></div>
            <input
                v-model="computedValue"
                class="x-checkbox-input"
                type="checkbox"
                :name="name"
                :value="value"
                :disabled="disabled"
            >
        </span>
        <span
            v-if="$slots.default || label"
            class="x-checkbox-label"
        >
            <slot></slot>
            <template v-if="!$slots.default">{{ label }}</template>
        </span>
    </label>
</template>
<script>
export default {
    name: 'XCheckbox',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        // 默认绑定到x-model上的value值
        value: {
            type: [String, Number, Boolean],
            default() {
                return [];
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
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        borders: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        grouped() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.name !== 'XCheckboxGroup') {
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
                    ? this._CheckboxGroup.currentValue
                    : this.value;
            },
            set(val) {
                if (this.disabled) {
                    return;
                }

                if (this.grouped) {
                    this._CheckboxGroup.updateValue(val);
                }
                else {
                    this.$emit('input', val);
                    this.$emit('change', val);
                }
            }
        },
        isChecked() {
            if (this.grouped) {
                return this.computedValue.indexOf(this.value) !== -1;
            }
            return this.value;
        },
        isIndeterminate() {
            return this.indeterminate && this.isChecked;
        }
    },
    methods: {
        setParent(data) {
            this._CheckboxGroup = data;
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/common/color.scss";
@import "~@/assets/common/reset.scss";
.#{$class-prefix}{
    &-checkbox {
        @include reset;
        line-height: 16px;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:after {
            content: '';
            display: table;
            clear: both;
        }
        &-disabled {
            cursor: not-allowed;
            opacity: .38;
            & .x-checkbox-icon {
                &:hover {
                    border-color: $--line-light-gray;
                }
            }
            & .x-checkbox-checked {
                background-color: $--color-primary;
                border-color: $--color-primary;

                &:hover {
                    border-color: $--color-primary;
                }
            }
        }
        &-borders {
            border: 1px solid $--line-deep-gray;
            padding: 10px;
            & .x-checkbox-checked {
                border-color: $--color-primary;
            }
            & .x-checkbox-indeterminate {
                border-color: $--color-primary;
            }
        }
        &-icon {
            float: left;
            background-color: $--color-white;
            width: 14px;
            height: 14px;
            vertical-align: middle;
            border-radius: 2px;
            border: 1px solid $--line-deep-gray;
            box-sizing: border-box;
            /*position: relative;*/
            margin: 1px;

            &:hover {
                border-color: $--color-light-gray;
            }
        }
        &-checked {
            background-color: $--color-primary;
            border-color: $--color-primary;
            &:hover {
                border-color: $--color-primary;
            }
            & .x-checkbox-inner::after {
                transform: rotate(45deg) scaleY(1);
            }
        }
        &-indeterminate {
            background-color: $--color-primary;
            border-color: $--color-primary;
            & .x-checkbox-inner::before {
                content: '';
                height: 2px;
                width: 6px;
                position: absolute;
                background-color: white;
                top: 4px;
                left: 3px;
            }
            & .x-checkbox-inner::after {
                display: none;
            }
        }
        &-inner {
            position: relative;
            transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),
                        background-color .25s cubic-bezier(.71,-.46,.29,1.46);

            &::after {
                content: '';
                position: absolute;
                border: 1.5px solid #fff;
                border-left: 0;
                border-top: 0;
                width: 3px;
                height: 6px;
                top: 0px;
                left: 4px;
                transform: rotate(45deg) scaleY(0);
                transition: transform .05s cubic-bezier(.71,-.46,.88,.6) .05s;
                transform-origin: center;
            }
        }
        &-input {
            visibility: hidden;
            position: absolute;
        }
        &-label {
            margin-left: 5px;
        }
    }
}
</style>
