<template>
    <div class="flex-container">
        <div>
            <p>{{leftText}}</p>
        </div>
        <div>
            <p>{{quantity}}</p>
        </div>
        <div>
            <p>{{unit}}</p>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardLabel extends Vue {
    @Prop()
    private leftText?: string;
    @Prop()
    private quantity?: number;
    @Prop()
    private unit?: string;
}
</script>

<style scoped lang="scss">
.flex-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 20px;
}
.flex-container >:first-child {
  margin-right: auto;
}
</style>