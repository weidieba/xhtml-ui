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
        <div class="">
            <ul
                v-on-scroll.bottom.20="handleScroll"
            >
                <li
                    v-for="(item,index) in list"
                    :key="index"

                    class="scorll-list"
                >
                    {{ item }}
                </li>
            </ul>
            <p v-if="loading">
                加载中...
            </p>
        </div>
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
            isCheck: false,
            list: 10,
            loading: false
        };
    },
    methods: {
        handleScroll() {
            this.loading = true;
            setTimeout(() => {
                this.list++;
                this.loading = false;
            }, 2000);
        },
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
ul {
    height: 190px;
    overflow-y: scroll;
}
.scorll-list {
    width: 300px;
    max-height: 100%;
    min-height: 40px;
    color: #7dbcfc;
    background: #e8f3fe;
    margin: 10px;
    list-style: none;
    text-align: center;
}
</style>
