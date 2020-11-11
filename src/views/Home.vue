<template>
    <div class="home">
        <x-button
            status="primary"
            disabled
            loading
            plain
        >
            奥里给1
        </x-button>
        <x-button
            status="success"
            loading
        >
            奥里给2
        </x-button>
        <x-button
            status="warning"
            @click="test"
        >
            奥里给31
        </x-button>
        <x-button
            status="default"
            size="large"
        >
            <x-icon icon="x-icon-ice-drink" />
        </x-button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
    methods: {
        test() {
            alert(111);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
