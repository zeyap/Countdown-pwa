<template>
  <div class="event-input">
    <input type="text" v-bind:placeholder="placeholder"/>
    <input type="button" value = "+"/>
    <span>[ ]</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EventInput extends Vue {
    @Prop() private msg!: string;
    private placeholder = this.msg || ''; // placeholder 'placeholder' displays value of prop 'msg'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
