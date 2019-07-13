<template>
    <div id="app">
    <v-app id="inspire">
        <v-toolbar dark color="blue-grey darken-4" :app="true">
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-img :max-width="120" :src="require('../assets/logo.png')"></v-img>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
        </v-toolbar>
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

    private now: Date = new Date();

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