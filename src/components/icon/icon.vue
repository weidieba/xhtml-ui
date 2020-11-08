<template>
    <div :class="['x-icon',clazz]">
        <i :class="icon" />
    </div>
</template>
<script>
export default {
    name: 'Xicon',
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
<style lang="scss" scoped>
@import "~@/assets/common/color.scss";
.#{$class-prefix}{
    &-icon {
        display: inline;
        color: black;
        margin-right: 5px;
    }
}
</style>
