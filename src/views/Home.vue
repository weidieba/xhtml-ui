<template>
    <div class="home">
        <x-checkbox
            v-model="isCheck"
            :borders="true"
            :disabled="false"
            :indeterminate="indeterminate"
            label="正常的checkbox1"
            @change="handleChange"
        >
        </x-checkbox>
        <x-checkbox-group
            v-model="modelArray"
            @change="handleGroupChange"
        >
            <x-checkbox
                v-for="(se,index) in SEs"
                :key="index"
                :value="se"
                :label="se"
            ></x-checkbox>
        </x-checkbox-group>
        <x-button
            status="default"
            @click="test"
        >
            朴素按钮
        </x-button>
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
        },
        test() {
            // this.$message('这条消息会持续5秒钟', 'success', null, 0);
            this.$message.warning('这是this.$message.warning方式触发的警告消息');
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
