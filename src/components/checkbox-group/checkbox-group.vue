
<template>
    <div class="x-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'XCheckboxGroup',

    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            currentValue: this.value
        };
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
.#{$class-prefix}{
    &-checkbox-group {
        line-height: 10px;

        .x-checkbox {
            margin-right: 6px;
        }
    }
}
</style>
