<template>
    <div class="main">
        <v-container grid-list-xl fluid>
            <v-layout align-start justify-center row wrap>
                <v-flex xs4 sm6 md2>
                    <v-combobox
                    :filter="filter"
                    :items="kanmusuNameArray"
                    v-model="searchQuery"
                    v-on:change="searchKanmusuByName"
                    label="find your girls"/>
                </v-flex>
                <v-flex xs4 sm6 md2>
                    <v-select
                    :items="sortItems"
                    v-model="selectSort"
                    label="Sort"
                    v-on:change="startSort"/>
                </v-flex>
                <v-flex xs4 sm6 md1>
                     <v-switch
                     color="orange"
                     v-model="isAsc"
                     :label="isAsc ? '昇順' : '降順'"
                     v-on:change="startSort"
                     hide-details/>
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
    private initKanmusuArray?: Kanmusu[];
    private kanmusuArray: Kanmusu[] = [];
    private sortItems: string[] = ['図鑑 No', '名前', 'Lv.'];
    private selectSort: string = '図鑑 No';
    private isAsc: boolean = true;
    private kanmusuNameArray: string[] = [];
    private searchQuery: string = '';

    private created() {
        this.getKanmusuArray();
    }

    @Watch('createdDateTime')
    private getKanmusuArray() {
        this.selectSort = '図鑑 No';
        this.searchQuery = '';
        this.initKanmusuArray = Kanmusu.getKanmusuListByStatus(this.selectStatus);
        this.kanmusuArray = this.initKanmusuArray;
        this.kanmusuNameArray = [];
        this.kanmusuArray.forEach((value: Kanmusu) => {
            // const item: string = value.createNameForSelector();
            const item: string = value.name;
            this.kanmusuNameArray.push(item);
        });
    }

    private startSort() {
        let sortKey: KanmusuKey = 'id';
        if (this.selectSort === this.sortItems[1]) {
            sortKey = 'phonetic';
        } else if (this.selectSort === this.sortItems[2]) {
            sortKey = 'level';
        }
        this.kanmusuArray = Kanmusu.sortKanmusu(this.kanmusuArray, sortKey, this.isAsc);
    }

    private searchKanmusuByName() {
        if (!this.initKanmusuArray) {
            return;
        }
        if (!this.searchQuery) {
            this.kanmusuArray = this.initKanmusuArray;
            return;
        }
        this.kanmusuArray = [];
        this.initKanmusuArray.forEach((value: Kanmusu) => {
            if (value.matchName(this.searchQuery)) {
                this.kanmusuArray.push(value);
            }
        });
    }

    private filter(item: object, queryText: string, itemText: string): boolean {
        if (!this.initKanmusuArray) {
            return false;
        }
        const result: Kanmusu | undefined = this.initKanmusuArray
        .find((value: Kanmusu, index: number, array: Kanmusu[]) => {
            return value.name === itemText;
        });
        if (!result) {
            return false;
        }
        return result.matchName(queryText);
    }
}
</script>
<style scoped lang="scss">
.main {
    background-color: #ccc;
    min-height: 800px;
}
</style>