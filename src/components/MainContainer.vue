<template>
    <div>
        <v-tabs color="blue-grey darken-2" dark slider-color="orange" fixed-tabs>
            <v-tab v-for="n in tabName.length" :key="n" ripple @change="changeTab(n-1)"> <b>{{tabName[n-1]}}</b></v-tab>
            <v-tabs-items>
                <v-tab-item v-for="n in tabName.length" :key="n" lazy>
                    <Workspace :selectStatus="n-1" :key="n" :createdDateTime="pramDate"/>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Workspace from '@/components/Workspace.vue';

@Component({
    components: {
        Workspace,
    },
})
export default class MainContainer extends Vue {
    public selected?: number;
    private tabName: string[] = ['未所属', '未改造', '完了'];
    private pramDate: Date = new Date();

    /**
     * changeTab
     */
    private changeTab(select: number) {
        if (this.selected === select) {
            return;
        }
        this.selected = select;
        this.pramDate = new Date();
    }
}
</script>

<style scoped lang="scss">
.main-container {
    margin-top: 1%;
    margin-left: 3%;
    margin-right: 3%;
}
</style>