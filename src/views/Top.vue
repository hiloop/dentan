<template>
    <div id="top">
        <DentanHeader title></DentanHeader>
        <MainContainer></MainContainer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DentanHeader from '@/components/DentanHeader.vue';
import MainContainer from '@/components/MainContainer.vue'; // @ is an alias to /src

@Component({
    components: {
        DentanHeader,
        MainContainer,
    },
})
export default class Top extends Vue {}
</script>

<style scoped lang="scss">
#top {
    margin-top: -1%;
    margin-left: -1%;
    margin-right: -1%;
    background-color: #dfe0d4;
}
</style>