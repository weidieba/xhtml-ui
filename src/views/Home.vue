<template>
    <div class="home">
        <x-link
            disabled
        >
            草泥马1
        </x-link>
        <x-link
            type="warning"
            underline
            icon="x-icon-edit"
            href="http://www.baidu.com"
            target="_blank"
        >
            草泥马2
        </x-link>
        <x-link
            type="danger"
        >
            草泥马3
            <x-icon icon="x-icon-view el-icon--right" />
        </x-link>
        <x-link
            type="success"
            disabled
        >
            草泥马4
        </x-link>
        <x-link
            type="info"
            disabled
        >
            草泥马5
        </x-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
            radio: 'three'
        };
    },
    methods: {
        test(val) {
            console.log(val);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
