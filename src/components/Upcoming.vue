<template>
<div>
  <EventInput v-bind:currEventId="currEventId" v-bind:formatEvents="upcomingList" msg="What's next?"/>
  <div class="upcoming">
    <div v-for="item,id in upcomingList">
      <span v-on:click="editEvent(id)">edit</span>
        {{item.title}}@{{item.place}},
        {{item.remain.days}} {{item.remain.hours}} 
        {{item.remain.minutes}} {{item.remain.seconds}}
      <span v-on:click="removeEvent(id)">done</span>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import EventInput from './EventInput.vue';

@Component({
  components:{
    EventInput,
  }
})
export default class Upcoming extends Vue {
  @Prop() private upcomingList: any;
  private timeBetween = function( date1: Date, date2: Date ) {
    //Get 1 day in milliseconds
    let one_day=1000*60*60*24;
    let one_hour = 1000*60*60;
    let one_minute = 1000*60; 

    var difference_ms:number = 0;
    if(false === date1 instanceof Date){
      date1 = new Date(date1);
    }
    if(false===date2 instanceof Date){
      date2 = new Date(date2);
    }
    difference_ms = date1.getTime() - date2.getTime();
    let days = Math.floor(difference_ms/one_day);
    difference_ms -= days*one_day;
    let hours = Math.floor(difference_ms/one_hour);
    difference_ms -=hours*one_hour;
    let minutes = Math.floor(difference_ms/one_minute);
    difference_ms -=minutes*one_minute;
    let seconds = Math.floor(difference_ms/1000);
    // Convert back to days and return
    return {
      days,hours,minutes,seconds
    };
  };
  private updateTime(){
    for(let i in this.upcomingList){
      let t = this.timeBetween(this.upcomingList[i].date,new Date());
      this.upcomingList[i].remain = t;
    }
    setInterval(this.updateTime, 1000);
  };
  private currEventId = -1;
  public editEvent(id:number){
    this.currEventId = id;
  }
  public removeEvent(id:number){
    if(confirm('You are deleting a countdown')){
      this.upcomingList.splice(id,1);
    }
  }
  mounted(){
    this.updateTime();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
