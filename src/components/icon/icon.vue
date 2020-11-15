<script>
import pick from 'lodash/pick';
export default {
    name: 'x-icon',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        clazz: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        const {props} = context;
        const clazz = [
            'x-icon',
            props.icon
        ];
        // 创建一个从 object 中选中的属性的对象。
        const data = pick(context.data, [
            'class', 'staticClass', 'style', 'staticStyle',
            'attrs', 'domProps', 'directives', 'on'
        ]);
        return <i
            class={clazz}
            {...data}
            {...{on: context.data.nativeOn}}
        />;
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/common/color.scss";
@import '~@/assets/fonts/font.css';
.#{$class-prefix}{
    &-icon {
        display: inline;
    }
}
</style>
