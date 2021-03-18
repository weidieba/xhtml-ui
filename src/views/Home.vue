<template>
    <div class="home">
        <div class="">
            <ul
                v-on-scroll.bottom.20="handleScroll"
                :scrollDisable="list>12"
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
        <x-drap-wrap
            :option="SEs"
            class="drag-test"
            @change="handleDrap"
        >
            <x-drap-item
                v-for="(item, index) in SEs"
                :key="index"
            >
                <div>{{ item.text }}</div>
            </x-drap-item>
        </x-drap-wrap>
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
            SEs: [{text: '星期一', id: 1}, {text: '星期二', id: 2}, {text: '星期三', id: 3}, {text: '星期四', id: 4}],
            modelArray: [],
            indeterminate: false,
            isCheck: false,
            list: 10,
            loading: false
        };
    },
    methods: {
        handleDrap(value) {
            console.log('change', value);
        },
        handleScroll() {
            this.loading = true;
            setTimeout(() => {
                this.list++;
                this.loading = false;
            }, 1000);
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
.drag-test  {
    width: 100%;
    height: 200px;
    display: flex;
    overflow-y: scroll;
}
.x-drag-item {
    width: 100px;
    height: 100px;
    margin: 10px;
    background: violet;
}
</style>
