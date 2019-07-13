<template>
    <div class="main">
        <div v-if="createdDateTime" key="0">
            <v-container grid-list-xl fluid>
                <v-layout justify-start row wrap>
                    <v-flex xs12 sm5 md3 v-for="(kanmusu, index) in kanmusuArray" :key="index">
                        <Card :selectId="kanmusu.id" :kanmusu="kanmusu"></Card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Kanmusu from '@/store/kanmusu';

@Component({
    components: {
        Card,
    },
})
export default class Workspace extends Vue {
    @Prop()
    private selectStatus!: number;
    @Prop()
    private createdDateTime?: Date;
    private kanmusuArray?: Kanmusu[];

    private created() {
        this.getKanmusuArray();
    }

    @Watch('createdDateTime')
    private getKanmusuArray() {
        this.kanmusuArray = Kanmusu.getKanmusuListByStatus(this.selectStatus);
    }
}
</script>
<style scoped lang="scss">
.main {
    background-color: #ccc;
    min-height: 800px;
}
</style>