<template>
    <a
        :class="[
            'x-link',
            type ? `x-link--${type}` : '',
            disabled && 'is-disabled',
            underline && !disabled && 'is-underline'
        ]"
        :href="disabled ? null : href"
        v-bind="$attrs"
        @click="handleClick"
    >

        <x-icon
            v-if="icon"
            :icon="icon"
        >
        </x-icon>

        <span
            v-if="$slots.default"
            class="x-link--inner"
        >
            <slot></slot>
        </span>

        <template v-if="$slots.icon">
            <slot
                v-if="$slots.icon"
                name="icon"
            >
            </slot>
        </template>
    </a>
</template>
<script>
export default {
    name: 'XLink',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        underline: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            default: 'javascript:void(0)'
        },
        icon: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick(event) {
            if (!this.disabled) {
                if (!this.href) {
                    this.$emit('click', event);
                }
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/common/color.scss";
@import "~@/assets/common/reset.scss";
.#{$class-prefix} {
    &-link {
        @include reset(inline-flex);
        flex-direction: row;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        position: relative;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        font-size: $--link-font-size;
        font-weight: $--link-font-weight;

        & [class*="x-icon-"] {
            & + span {
            margin-left: 5px;
            }
        }
        &--default  {
            color:  $--color-primary;
            &:hover {
                color: $--color-primary;
            }
            &:after {
                border-color: $--color-primary;
            }
        }
        &--default.is-disabled{
            color: $--color-disabled;
        }
        //  遍历$type, $color 为key
        @each $type, $color in $typeMap {
            &.x-link--#{$type} {
                color: $color;
                &:hover {
                    color: mix($color, $--color-white, 80%)
                }
                &:after {
                    border-color: $color
                }
            }
            &.x-link--#{$type}.is-disabled{
                color: mix($color, $--color-white, 50%)
            }
            &.x-link--#{$type}.is-underline{
                &:hover:after {
                    border-color: $color
                }
            }
        }
    }
    &-link.is-disabled {
        cursor: not-allowed;
    }
    &-link.is-underline{
        &:hover:after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 0;
            bottom: 0;
            border-bottom: 1px solid $--color-primary;
        }
    }
}
</style>
