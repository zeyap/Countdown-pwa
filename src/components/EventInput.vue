<template>
  <div>
    <div class="title-box">
      <div v-if="!isDropdownActive" v-on:click="toggleDropdown(this)" class="add-sign">+</div>
      <div v-if="isDropdownActive" v-on:click="addEvent(this)" class="add-sign add-sign-save">SAVE</div>
      <div class="title-input-wrapper"><input type="text" v-bind:placeholder="placeholder" v-model="currEvent.title" class="title-input"/></div>
    </div>
    <div class="timeplace-input" v-if="isDropdownActive">
      <div class="left"><span>TIME&nbsp&nbsp</span><input class="tp-input-font" type="text" v-bind:value="formatDate(currEvent.date)" v-on:mouseover="enableDatePicker(this)"/>
      <DatePicker v-if="isDatePickerActive" v-bind:currDate="currEvent.date" v-bind:setDate="changeDate(this)" v-bind:hide="disableDatePicker(this)"/></div>
      <div class="right"><span>LOCATION&nbsp&nbsp</span><input class="tp-input-font" type="text" v-model="currEvent.place" /></div>
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
      const months = ['Jan','Feb','Mar','April','May','Jun',
      'Jul','Aug','Sept','Oct','Nov','Dec'];
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
.timeplace-input{
  position: relative;
  font-size: 1.1em;
  display: block;
  width: 100%;
  padding-left: 20px;
}
@media only screen and (min-width: 887px) {
  .add-sign{
    float: left;
    width: 80px;
    height: 80px;
    align-content: center;
    line-height: 80px;
    font-size: 2em;
    text-align: center;
    color: #666666;
    border: #999999 dashed 1px;
    margin: 0 20px;
  }
  .title-input{
    float:left;
    font-size: 3em;
    height: 80px;
    line-height: 80px;
    border: none;
    color: #666666;
    background: #eeeeee;
  }
  .title-box{
    display: block;
    height: 80px;
    margin: 30px 0px;
    width: 100%;
    /* border-bottom: black solid 1px; */
    color: #bbbbbb;
  }
  .left{
  text-align: left;
  float:left;
  height:100%;
  width: 300px;
}
.right{
  text-align: left;
  float:left;
  width: 300px;
}
.save-button{
  width: 100px;
  float: left;
  font-size: 1em;
  background: #ffffff;
  outline: #dddddd solid 1px;
}
}

@media only screen and (max-width: 887px){
  .add-sign{
    margin: 0 auto;
    line-height: 80px;
    width: 80px;
    height: 80px;
    align-content: center;
    font-size: 2em;
    color: #666666;
    border: #999999 dashed 1px;
  }
  .title-input{
    text-align: center;
    width: 100%;
    font-size: 3em;
    border: none;
    color: #666666;
    background: #eeeeee;
    height: 80px;
    line-height: 80px;
  }
  .title-box{
    display: block;
    height: 130px;
    margin: 30px 0px;
    width: 100%;
    /* border-bottom: black solid 1px; */
    color: #bbbbbb;
  }
.left{
  text-align: left;
  float:left;
  height:100%;
  width:45%;
  margin-right:5%;
}
.right{
  text-align: left;
  float:left;
  width:45%;
  margin-left:5%;
}
.save-button{
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
  float: left;
  font-size: 1em;
  background: #ffffff;
  outline: #dddddd solid 1px;
}
}





.tp-input-font{
  font-size:1em;
}

</style>
