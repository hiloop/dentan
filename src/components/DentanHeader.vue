<template>
    <div>
        <div id="dheader">
            <img id="logo" alt="dentan logo" src="../assets/logo.png" />
            <slot></slot>
            <div>{{ title }}</div>
        </div>
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
