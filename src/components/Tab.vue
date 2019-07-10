<template>
    <div class="tab" v-bind:class="{ inactive: !isActive }" @click="onClick">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Tab extends Vue {
    @Prop()
    public isActive!: boolean;
    @Prop()
    public selectStatus!: number;

    @Emit()
    public clicked(value: number) {}

    public onClick() {
        this.clicked(this.selectStatus);
    }
}
</script>

<style scoped lang="scss">
.tab {
    text-align: center;
    width: 60px;
    border-bottom: 30px solid #3e92a3;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    height: 0px;
    display: inline-block;
}
.inactive {
    border-bottom: 30px solid #1c434b;
}
</style>