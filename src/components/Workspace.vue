<template>
    <div>
        <div v-if="isVisible" class="main">
            <slot></slot>
            <div v-for="(kanmusu, index) in allKanmusu" :key="index">
                <Card :selectId="kanmusu.id"></Card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
    components: {
        Card,
    },
})
export default class Workspace extends Vue {
    @Prop()
    private selectStatus!: number;

    @Prop()
    private name!: string;

    @Prop()
    private id!: string;

    @Prop()
    private isVisible?: boolean;

    private allKanmusu?: object[];

    private created() {
        this.allKanmusu = this.$store.getters.getKanmusuByStatus(this.selectStatus);
    }
}
</script>
<style scoped lang="scss">
.main {
    background-color: #ccc;
    height: 600px;
    width: 500%;
}
</style>