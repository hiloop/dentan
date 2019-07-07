<template>
    <div class="card">
        <div>
            <div>{{ name }}</div>
            <div>Lv. {{ level }}</div>
        </div>
        <div>改装設計図 {{ sekkeizu }}枚</div>
        <div>試製甲板カタパルト {{ catapult }}個</div>
        <div>戦闘詳報 {{ sentoushouhou }}枚</div>
        <div>開発資材 {{ kaihatsusizai }}個</div>
        <div>新型航空兵装資材 {{ koukusizai }}個</div>
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

@Component
export default class Card extends Vue {
    @Prop()
    public selectId!: number;

    private id?: string;
    private name?: string;
    private level?: string;
    private sekkeizu?: number;
    private catapult?: number;
    private sentoushouhou?: number;
    private kaihatsusizai?: number;
    private koukusizai?: number;
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
</style>