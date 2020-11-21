<template>
    <div class="home">
        <x-radio-group
            v-model="radio"
            kind="button"
            vertical
        >
            <x-radio
                label="One"
            >
                草泥马
            </x-radio>
            <x-radio
                label="Two"
            >
                草泥马2
            </x-radio>
            <x-radio
                label="three"
                disabled
            >
                草泥马3
            </x-radio>
            <x-radio
                label="four"
            >
                草泥马4
            </x-radio>
        </x-radio-group>
        <x-radio
            v-model="radio"
            label="three"
            @change="test"
        >
            草泥马5
        </x-radio>
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
