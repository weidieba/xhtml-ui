<template>
    <div class="home">
        <x-input></x-input>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
            radio: 'three',
            test1: '2222',
            SEs: ['baidu', 'google', 'sogou', '360'],
            modelArray: [],
            indeterminate: false,
            isCheck: false
        };
    },
    methods: {
        handleGroupChange(val) {
            this.indeterminate = this.modelArray.length < this.SEs.length;
            this.isCheck = this.modelArray.length > 0;
            console.log(this.modelArray);
        },
        handleChange(value) {
            this.modelArray = value ? this.SEs : [];
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
