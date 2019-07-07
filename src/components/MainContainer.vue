<template>
    <div>
        <Tab :isActive="unExistTab" :selectStatus="unExists" @clicked="changeTab">未所属</Tab>
        <Tab :isActive="unRemodeledTab" :selectStatus="unRemodeled" @clicked="changeTab">未改造</Tab>
        <Tab :isActive="doneTab" :selectStatus="done" @clicked="changeTab">完了</Tab>
        <div>
            <Workspace :isVisible="unExistTab" :selectStatus="unExists">Tab1</Workspace>
        </div>
        <div>
            <Workspace :isVisible="unRemodeledTab" :selectStatus="unRemodeled" >Tab2</Workspace>
        </div>
        <div>
            <Workspace :isVisible="doneTab" :selectStatus="done">Tab3</Workspace>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Workspace from '@/components/Workspace.vue';
import Tab from '@/components/Tab.vue';

@Component({
    components: {
        Workspace,
        Tab,
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
    private changeTab(selected: number) {
        this.selected = selected;
        if (selected === this.unExists) {
            this.unExistTab = true;
            this.unRemodeledTab = false;
            this.doneTab = false;
        } else if (selected === this.unRemodeled) {
            this.unExistTab = false;
            this.unRemodeledTab = true;
            this.doneTab = false;
        } else {
            this.unExistTab = false;
            this.unRemodeledTab = false;
            this.doneTab = true;
        }
    }
}
</script>

<style scoped lang="scss">
</style>