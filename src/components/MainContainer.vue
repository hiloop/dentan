<template>
    <div class="main-container">
        <div>
            <v-tabs color="blue-grey darken-2" dark slider-color="orange" fixed-tabs>
                <v-tab v-for="n in tabName.length" :key="n" ripple @change="changeTab(n-1)"> <b>{{tabName[n-1]}}</b></v-tab>
                <v-tabs-items>
                    <v-tab-item v-for="n in tabName.length" :key="n" lazy>
                        <Workspace :selectStatus="n-1"/>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </div>
        <!-- <div>
            <Workspace v-if="selected === unExists" :selectStatus="unExists" key="unExists">Tab1</Workspace>
            <Workspace v-else-if="selected === unRemodeled" :selectStatus="unRemodeled" key="unRemodeled">Tab2</Workspace>
            <Workspace v-else :selectStatus="done" key="done">Tab3</Workspace>
        </div> -->
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
    public unExistTab: boolean = true;
    public unRemodeledTab: boolean = false;
    public doneTab: boolean = false;
    public unExists!: number;
    public unRemodeled!: number;
    public done!: number;
    public selected?: number;
    private tabName: string[] = ['未所属', '未改造', '完了'];

    private created() {
        this.getStatus();
    }
    private getStatus() {
        const status = this.$store.state.status;
        this.unExists = status.unExists;
        this.unRemodeled = status.unRemodeled;
        this.done = status.done;
        this.selected = this.unExists;
    }
    /**
     * changeTab
     */
    private changeTab(select: number) {
        if (this.selected === select) {
            return;
        }
        this.selected = select;
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