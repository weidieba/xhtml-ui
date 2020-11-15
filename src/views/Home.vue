<template>
    <div class="home">
        <x-statusbar
            kind="success"
            content="123131312123123"
            show-close-icon
            @close="test"
        >
        </x-statusbar>
        <x-statusbar
            size="medium"
            kind="info"
            content="123131312123123"
            center
            show-close-icon
        >
        </x-statusbar>
        <x-statusbar
            kind="warning-outline"
            content="123131312123123"
        ></x-statusbar>
        <x-statusbar
            size="medium"
            kind="error"
            content="123131312123123"
        >
        </x-statusbar>
        <x-statusbar
            kind="alarm"
            content="123131312123123"
            show-close-icon
        ></x-statusbar>
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
