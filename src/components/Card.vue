<template>
    <div class="card">
        <div class="contents">
            <div>{{ name }}</div>
            <div>Lv. {{ level }}</div>
        </div>
        <CardLabel :leftText="'改装設計図'" :quantity="sekkeizu" :unit="'枚'"></CardLabel>
        <CardLabel :leftText="'試製甲板カタパルト'" :quantity="catapult" :unit="'枚'"></CardLabel>
        <CardLabel :leftText="'戦闘詳報'" :quantity="sentoushouhou" :unit="'枚'"></CardLabel>
        <CardLabel :leftText="'新型航空兵装資材'" :quantity="koukusizai" :unit="'個'"></CardLabel>
        <CardLabel :leftText="'開発資材'" :quantity="kaihatsusizai" :unit="'個'"></CardLabel>
        <label>
            <input :name="selectId" type="radio" value="0" v-model="status" v-on:change="changeStatus"/>
            未所属
        </label>
        <label>
            <input :name="selectId" type="radio" value="1" v-model="status" v-on:change="changeStatus"/>
            未改造
        </label>
        <label>
            <input :name="selectId" type="radio" value="2" v-model="status" v-on:change="changeStatus"/>
            完了
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CardLabel from '@/components/CardLabel.vue';

@Component({
    components: {
        CardLabel,
    },
})
export default class Card extends Vue {
    @Prop()
    public selectId!: number;

    private id?: string;
    private name?: string;
    private level?: string;
    private sekkeizu?: number;
    private catapult?: number;
    private sentoushouhou?: number;
    private koukusizai?: number;
    private kaihatsusizai?: number;
    private status?: number;
    /**
     * 初期処理
     */
    private created() {
        this.getKanmusu();
    }
    private getKanmusu() {
        const tmp = this.$store.getters.getKanmusuById(this.selectId)[0];
        this.id = tmp.id;
        this.name = tmp.name;
        this.level = tmp.level;
        this.sekkeizu = tmp.sekkeizu;
        this.catapult = tmp.catapult;
        this.sentoushouhou = tmp.sentoushouhou;
        this.kaihatsusizai = tmp.kaihatsusizai;
        this.koukusizai = tmp.koukusizai;
        this.status = tmp.status;
    }
    private changeStatus() {
        const args = { id: this.id, status: this.status };
        this.$store.commit('changeStatus', args);
    }
}
</script>

<style scoped lang="scss">
.card {
    margin: 1%;
    background-color: #3e92a3;
    height: 300px;
    width: 220px;
}
.contents {
    // margin-top: -10px;
}
</style>