<template>
    <v-card color="blue-grey darken-2" class="white--text" tile min-width="250">
        <v-card-title>{{ kanmusu.name }} Lv. {{ kanmusu.level }}</v-card-title>
        <v-card-text>
            <CardLabel :leftText="'改装設計図'" :quantity="kanmusu.sekkeizu" :unit="'枚'"></CardLabel>
            <CardLabel :leftText="'試製甲板カタパルト'" :quantity="kanmusu.catapult" :unit="'枚'"></CardLabel>
            <CardLabel :leftText="'戦闘詳報'" :quantity="kanmusu.sentoushouhou" :unit="'枚'"></CardLabel>
            <CardLabel :leftText="'新型航空兵装資材'" :quantity="kanmusu.koukushizai" :unit="'個'"></CardLabel>
            <CardLabel :leftText="'新型砲熕兵装資材'" :quantity="kanmusu.houkoushizai" :unit="'個'"></CardLabel>
            <CardLabel :leftText="'開発資材'" :quantity="kanmusu.kaihatsushizai" :unit="'個'"></CardLabel>
        </v-card-text>
        <v-card-actions>
            <v-radio-group row v-model="kanmusu.status" :mandatory="false">
                <v-radio label="未所属" :value="0" color="orange" dark v-on:change="changeStatus"></v-radio>
                <v-radio label="未改造" :value="1" color="orange" dark v-on:change="changeStatus"></v-radio>
                <v-radio label="完了" :value="2" color="orange" dark v-on:change="changeStatus"></v-radio>
            </v-radio-group>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CardLabel from '@/components/CardLabel.vue';
import Kanmusu from '@/store/kanmusu';

@Component({
    components: {
        CardLabel,
    },
})
export default class Card extends Vue {
    @Prop()
    public selectId!: string;
    @Prop()
    private kanmusu!: Kanmusu;

    private changeStatus(value: number) {
        this.kanmusu.saveStatus(value);
    }
}
</script>

<style lang="scss">
  .v-label {
      font-size: 13px;
  }
  .v-icon {
      font-size: 20px
  }
  .v-input--selection-controls__input {
      margin-right: 0;
  }
</style>