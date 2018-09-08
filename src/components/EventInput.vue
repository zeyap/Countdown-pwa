<template>
  <div class="event-input">
    <input type="text" v-bind:placeholder="placeholder" v-model="eventName"/>
    <input type="button" value = "+" v-on:click="toggleDropdown(this)"/>
    <span>[ ]</span>
    <div class="event-input" v-if="isDropdownActive">
      <div><span>Time</span><input type="text" v-model="currEvent.date" v-on:focus="enableDatePicker(this)" /></div>
      <DatePicker v-if="isDatePickerActive" v-bind:currDate="currEvent.date" v-bind:hide="disableDatePicker(this)"/>
      <div><span>Place</span><input type="text" v-model="currEvent.place"/></div>
      <div><input type="button" value="Add new event" v-on:click="addEvent(this)"/></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from './Event';
import DatePicker from './DatePicker.vue'

@Component({
  components: {
    DatePicker
  },
})
export default class EventInput extends Vue {
    @Prop() private msg!: string;
    @Prop() public formatEvents: any;
    private isDropdownActive = false;
    public isDatePickerActive = false;
    private eventName = '';
    private placeholder = this.msg || ''; // placeholder 'placeholder' displays value of prop 'msg'
    private currEvent = new Event(new Date(), this.eventName, '', 0);
    private toggleDropdown = function(this: any){
      this.isDropdownActive = !this.isDropdownActive;
    }
    private enableDatePicker = function(this:any){
      this.isDatePickerActive = true;
    }
    public disableDatePicker = function(this:any){
      return (function(this:any){
        this.isDatePickerActive = false;
      }).bind(this);
    }
    private addEvent = function(this: any){
      if(this.eventName==='')return;
      this.currEvent = new Event(new Date(), this.eventName, '', 0);
      this.formatEvents.push(this.currEvent);
      this.eventName = '';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
