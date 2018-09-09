<template>
  <div class="event-input">
    <input type="text" v-bind:placeholder="placeholder" v-model="currEvent.title"/>
    <input type="button" value = "+" v-on:click="toggleDropdown(this)"/>
    <div class="event-input" v-if="isDropdownActive">
      <div><span>Time</span><input type="text" v-bind:value="formatDate(currEvent.date)" v-on:focus="enableDatePicker(this)"/>
      <DatePicker v-if="isDatePickerActive" v-bind:currDate="currEvent.date" v-bind:setDate="changeDate(this)" v-bind:hide="disableDatePicker(this)"/></div>
      <div><span>Place</span><input type="text" v-model="currEvent.place"/></div>
      <div><input type="button" v-bind:value="this.currEventId===-1?'Add':'Save Change'" v-on:click="addEvent(this)"/></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
    @Prop() public currEventId: any;
    private isDropdownActive = false;
    protected isDatePickerActive = false;
    private placeholder = this.msg || ''; // placeholder 'placeholder' displays value of prop 'msg'
    private currEvent = new Event(new Date(), '', '', 0);

    @Watch('currEventId',{
      immediate: true,
      deep: true
    })
    editEvent(val1:any,val2:any){
      // console.log(this.currEventId)
      if(this.currEventId===-1){
        this.currEvent = new Event(new Date(), '', '', 0);
        return;
      }
      this.currEvent = this.formatEvents[this.currEventId];
      if(this.currEvent instanceof Date===false){
        (this.currEvent as any).date = new Date((this.currEvent as any).date);
      }
      this.isDropdownActive = true;
    };
    
    computed = {
      setCurrEventId: function(this:any,val:number){
        this.currEventId = val;
      }
    }

    private formatDate = function(date: any){
      if(date instanceof Date === false){
        date = new Date(date);
      }
      const months = ['January','February','March','April','May','June',
      'July','August','September','October','November','December'];
      let str = months[date.getMonth()] +' '+ date.getDate()+', '+date.getFullYear();
      return str;
    }

    protected changeDate = function(this:any){
      return (function(this:any,newDate:any){
        this.currEvent.date = newDate;
      }).bind(this);
    }
    private toggleDropdown = function(this: any){
      this.isDropdownActive = !this.isDropdownActive;
    }
    private enableDatePicker = function(this:any){
      this.isDatePickerActive = true;
    }
    protected disableDatePicker = function(this:any){
      return (function(this:any){
        this.isDatePickerActive = false;
      }).bind(this);
    }
    private addEvent = function(this: any){
      this.toggleDropdown();
      if(this.currEvent.title==='')return;//no content
      if(this.currEventId!==-1){//make change
      
      }else{//add new
        this.formatEvents.push(this.currEvent);
        // this.currEvent = new Event(new Date(), '', '', 0);
      }
      this.computed.setCurrEventId(-1);//why isn't this change watched
      this.currEvent = new Event(new Date(), '', '', 0);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
