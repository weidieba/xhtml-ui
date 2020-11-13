<template>
    <i :class="[icon,'x-icon',clazz]" />
</template>
<script>
export default {
    name: 'x-icon',
    props: {
        icon: {
            type: String,
            default: ''
        },
        clazz: {
            type: String,
            default: ''
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/common/color.scss";
@import '~@/assets/fonts/font.css';
.#{$class-prefix}{
    &-icon {
        display: inline;
        color: black;
    }
}
</style>
