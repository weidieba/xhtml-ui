<script>
import pick from 'lodash/pick';
export default {
    name: 'Xbutton',
    functional: true,
    props: {
        kind: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            // 'default', 'primary', 'warning', 'success'
            default: 'default'
        },
        size: {
            type: String,
            // 'medium', 'large',
            default: 'medium'
        },
        type: {
            type: String,
            default: 'button'
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            default: ''
        },
        target: {
            type: String,
            default: '_self'
        },
        plain: {
            type: Boolean,
            default: false
        }
    },
    render(h, context) {
        console.log(context);
        const {props, children} = context;
        const clazz = [
            'x-button',
            `x-button--${props.kind || props.status}`,
            `x-button--${props.size}`,
            {
                'is-disabled': props.disabled,
                'is-loading': props.loading,
                'is-plain': props.plain
            }
        ];
        // 创建一个从 object 中选中的属性的对象。
        const data = pick(context.data, [
            'class', 'staticClass', 'style', 'staticStyle',
            'attrs', 'domProps', 'directives', 'on'
        ]);
        return props.href
            ? <a href={props.href} target={props.target} class={clazz}
                {...data}
                {...{on: context.data.nativeOn}}>
                {children}
            </a>
            : <button type={props.type} disabled={props.disabled} class={clazz}
                {...data}
                {...{on: context.data.nativeOn}}>
                {children}
            </button>;
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/common/color.scss";
$xButton: 'x-button';
.#{$class-prefix} {
    &-button{
        line-height: 38px;
        overflow: visible;
        font-family: inherit;
        text-align: center;
        cursor: pointer;
        border: 1px solid $--line-deep-gray;
        border-radius: 2px;
        padding: 0 15px;
        min-width: 80px;
        background: $--color-white no-repeat center;
        -webkit-transition: border-color 0.25s, background-color 0.25s;
        transition: border-color 0.25s, background-color 0.25s;
        box-sizing: border-box;
        &:focus,
        &:hover {
            color: $--color-black;
            border-color: $--color-light-gray;
            text-decoration: none;
            outline: none;
        }
        &:active {
            outline: none;
            background-color: $--line-light-gray;
        }
        &--primary {
            color: $--color-white;
            border: 1px solid $--color-primary;
            background-color: $--color-primary;

            &:focus,
            &:hover {
                background-color: $--color-hover-primary;
                border-color: $--color-hover-primary;
                color: $--color-white;
            }
            &:active {
                background-color: $--color-deep-primary;
                border-color: $--color-deep-primary;
                color: $--color-white;
            }
            disabled,
            disabled:focus,
            disabled:hover,
            disabled:active,
            loading:focus,
            loading:hover,
            loading:active {
                color: $--color-white;
                border: 1px solid $--color-primary;
                background-color: $--color-primary;
            }
        }
        &--success {
            color: $--color-white;
            border: 1px solid $--color-success;
            background-color: $--color-success;

            &:focus,
            &:hover {
                background-color: $--color-hover-success;
                border-color: $--color-hover-success;
                color: $--color-white;
            }
            &:active {
                background-color: $--color-deep-success;
                border-color: $--color-deep-success;
                color: $--color-white;
            }
        }
        &--warning {
            color: $--color-white;
            border: 1px solid $--color-warning;
            background-color: $--color-warning;

            &:focus,
            &:hover {
                background-color: $--color-hover-warning;
                border-color: $--color-hover-warning;
                color: $--color-white;
            }
            &:active {
                background-color: $--color-deep-warning;
                border-color: $--color-deep-warning;
            }
        }
        // size
        &--large {
            padding: 0 25px;
            min-width: 150px;
            height: 45px;
            line-height: 43px;
            font-size: 16px;
        }
        // loading
        &--default.is-loading{
            background-image: url('../../assets/loading/loading.gif');
        }
        &--primary.is-loading{
            background-image: url('../../assets/loading/loading-primary.gif');
        }
        &--success.is-loading{
            background-image: url('../../assets/loading/loading-success.gif');
        }
        &--warning.is-loading{
            background-image: url('../../assets/loading/loading-warning.gif');
        }
    }
}
.#{$is} {
    &-disabled {
        opacity: .38;
        // 为了IE浏览器实现不透明度为80%
        filter: alpha(opacity=38);
    }
    &-loading,&-disabled {
        cursor: default;
        -ms-pointer-events: none;
        pointer-events: none;
        outline: none;
        user-select: none;
        * {
            cursor: default;
        }
    }
    &-loading {
        color: transparent !important;
        cursor: default;
        pointer-events: none;
    }
    &-plain {
        border-radius: 4px;
    }
}
/*包含以下五种的链接*/
a {
    display: inline-block;
    text-decoration: none;
}
a:link {
    text-decoration: none;
}
a:visited {
    text-decoration: none;
}
a:hover {
    text-decoration: none;
}
a:active {
    text-decoration: none;
}
a:focus {
    text-decoration: none;
}
</style>
