<template>
    <div class="home">
        <Xbutton
            status="primary"
            disabled
            loading
            plain
        >
            奥里给1
        </Xbutton>
        <Xbutton
            status="success"
            loading
        >
            奥里给2
        </Xbutton>
        <Xbutton
            status="warning"
            @click="test"
        >
            奥里给31
        </Xbutton>
        <Xbutton
            status="default"
            size="large"
        >
            <Xicon icon="x-icon-ice-drink" />
        </Xbutton>
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
