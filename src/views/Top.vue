<template>
    <div id="app">
    <v-app id="inspire">
        <DentanHeader/>
        <v-content>
            <MainContainer></MainContainer>
        </v-content>
    </v-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DentanHeader from '@/components/DentanHeader.vue';
import Kanmusu from '@/store/kanmusu';
import MainContainer from '@/components/MainContainer.vue'; // @ is an alias to /src

@Component({
    components: {
        DentanHeader,
        MainContainer,
    },
})
export default class Top extends Vue {

    private created() {
        Kanmusu.initKanmusu();
    }
}
</script>

<style scoped lang="scss">
#top {
    margin-top: -1%;
    margin-left: -1%;
    margin-right: -1%;
    background-color: #dfe0d4;
}
</style>