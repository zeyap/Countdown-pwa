<template>
  <div>
    <div class="help-button" v-on:click="()=>{isHelpShown = true;}" >Help</div>
    <div class="help" v-show="isHelpShown" v-on:click="()=>{isHelpShown = false;}">
      <div class="cross">X</div>
      <p><B>Add event:</B> Click the left-top button to create new event</p>
      <p><B>Edit event:</B> Double click left side of card</p>
      <img width="80%" style="border: 1px solid #dddddd;border-radius:15px;" src="../assets/edit.png"/>
      <p><B>Delete event:</B> Double click right side of card</p>
      <img width="80%" style="border: 1px solid #dddddd;border-radius:15px;" src="../assets/delete.png"/>
    </div>
    <div class="title-box">
      <div v-if="!isDropdownActive" v-on:click="toggleDropdown(this)" class="add-sign">+</div>
      <div v-if="isDropdownActive" v-on:click="addEvent(this)" class="add-sign add-sign-save">SAVE</div>
      <div class="title-input-wrapper"><input type="text" v-bind:placeholder="placeholder" v-model="currEvent.title" class="title-input"/></div>
    </div>
    <div class="timeplace-input" v-if="isDropdownActive">
      <div class="left"><span style="display:inline-block;width:150px;">TIME&nbsp&nbsp</span><input class="tp-input-font" type="text" v-bind:value="formatDate(currEvent.date)" v-on:blur="disableDatePicker(this)" v-on:focus="enableDatePicker(this)"/>
      <DatePicker v-if="isDatePickerActive" v-bind:currDate="currEvent.date" v-bind:setDate="changeDate(this)" v-bind:hide="disableDatePicker(this)"/></div>
      <div class="right"><span style="display:inline-block;width:150px;">LOCATION&nbsp&nbsp</span><input class="tp-input-font" type="text" v-model="currEvent.place" /></div>
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
    @Prop() public setCurrEventId: any;
    private isDropdownActive = false;
    protected isDatePickerActive = false;
    private placeholder = this.msg || ''; // placeholder 'placeholder' displays value of prop 'msg'
    private currEvent = new Event(new Date(), '', '', 0);
    private isHelpShown = false;

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
      // console.log(this.currEventId)
      this.toggleDropdown();
      if(this.currEvent.title==='')return;//no content
      if(this.currEventId!==-1){//make change
        
      }else{//add new
        this.formatEvents.unshift(this.currEvent);
      }
      this.currEvent = new Event(new Date(), '', '', 0);
      this.setCurrEventId(-1);//why isn't this change watched
      // console.log(this.formatEvents)
      // console.log(this.currEventId)
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
  .add-sign{
    float: left;
    width: 80px;
    height: 80px;
    align-content: center;
    line-height: 80px;
    font-size: 1.5em;
    text-align: center;
    color: #666666;
    border: #999999 dashed 1px;
    border-radius: 5px;
    margin: 0 20px;
  }
  .title-input{
    width: calc(100% - 150px);
    float:left;
    font-size: 2em;
    height: 80px;
    line-height: 80px;
    border: none;
    border-bottom: 1px solid #dddddd;
    color: #666666;
    background: white;
  }
  .title-box{
    display: block;
    height: 80px;
    margin: 20px 0px;
    width: 100%;
    /* border-bottom: black solid 1px; */
    color: #bbbbbb;
  }
.left{
  margin-bottom: 20px;
  text-align: left;
  float:left;
  height:100%;
  width: 50%;
}
.right{
  margin-bottom: 20px;
  text-align: left;
  float:left;
  width: 50%;
}

@media only screen and (max-width: 780px){
  .left{
    font-size: 0.8em;
    width: 100%;
  }
  .right{
    font-size: 0.8em;
    width: 100%;
  }
  .title-input{
     font-size: 1.2em;
  }
}

.save-button{
  width: 100px;
  float: left;
  font-size: 1em;
  background: #ffffff;
  outline: #dddddd solid 1px;
}

.tp-input-font{
  font-size:1em;
  border: none;
  background: #eeeeee;
  border-radius: 10px;
}

.help-button{
  color: #ad48aa;
  position: fixed;
  top:20px;
  right:20px;
  border: 1px solid #ad48aa;
  border-radius: 5px;
  padding: 0 5px;
}

.help{
  position: fixed;
  top: 50%;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
  height: 80%;
  width: 80%;
  background: white;
  border:1px solid #ad48aa;
  border-radius: 5px;
  padding: 20px;
  overflow-x: scroll;
}

.cross{
  position:absolute;
  top:10px;
  right:10px;
  color:#ad48aa;
}

</style>
