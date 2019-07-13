<template>
    <div id="lateral">
        <v-toolbar dark :flat="true" color="blue-grey darken-4"  :app="true">
            <v-img :max-width="120" :src="require('../assets/logo.png')"></v-img>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DentanHeader extends Vue {
    @Prop()
    private title!: string;
}
</script>

<style scoped lang="scss">
#dheader {
    margin: 0px;
    height: 5em;
    background-color: #353940;
}
#logo {
    width: 130px;
    height: auto;
    margin-top: 15px;
    margin-left: 50px;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
// #ff5335
// #dfe0d4
// #3e92a3
// #353940
</style>
