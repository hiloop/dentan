<template>
    <div class="main">
        <v-container grid-list-xl fluid>
            <v-layout align-start justify-center row wrap>
                <v-flex xs4 sm6 md1>
                     <v-switch
                     color="orange"
                     v-model="isAsc"
                     :label="isAsc ? '昇順' : '降順'"
                     v-on:change="startSort"
                     hide-details/>
                </v-flex>
                <v-flex xs4 sm6 md2>
                    <v-select
                    :items="sortItems"
                    v-model="selectSort"
                    label="Sort"
                    v-on:change="startSort"/>
                </v-flex>
            </v-layout>
        </v-container>
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
import Kanmusu, { IKanmusu } from '@/store/kanmusu';

type KanmusuKey = keyof IKanmusu;

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
    private sortItems: string[] = ['図鑑 No', '名前', 'Lv.'];
    private selectSort: string = '図鑑 No';
    private isAsc: boolean = true;

    private created() {
        this.getKanmusuArray();
    }

    @Watch('createdDateTime')
    private getKanmusuArray() {
        this.kanmusuArray = Kanmusu.getKanmusuListByStatus(this.selectStatus);
    }

    private startSort() {
        let sortKey: KanmusuKey = 'id';
        if (this.selectSort === this.sortItems[1]) {
            sortKey = 'phonetic';
        } else if (this.selectSort === this.sortItems[2]) {
            sortKey = 'level';
        }
        this.kanmusuArray = Kanmusu.getKanmusuListByStatusOrder(this.selectStatus, sortKey, this.isAsc);
    }
}
</script>
<style scoped lang="scss">
.main {
    background-color: #ccc;
    min-height: 800px;
}
</style>