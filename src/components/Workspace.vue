<template>
    <div class="main">
        <v-container grid-list-xl fluid>
            <v-layout justify-start row wrap>
                <v-flex xs12 sm5 md3 v-for="(kanmusu, index) in allKanmusu" :key="index">
                    <Card :selectId="kanmusu.id"></Card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
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
    private id!: string;

    private allKanmusu?: object[];

    @Watch('changeTab')
    public close() {
        // 自身を削除し、後始末する
        const parent: any = this.$el.parentNode;
        parent.removeChild(this.$el);
        this.$destroy();
    }

    private created() {
        this.allKanmusu = this.$store.getters.getKanmusuByStatus(this.selectStatus);
    }
}
</script>
<style scoped lang="scss">
.main {
    background-color: #ccc;
    min-height: 800px;
}
</style>