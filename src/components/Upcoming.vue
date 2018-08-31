<template>
  <div class="upcoming">
    <ul>
        <li v-for="item in upcomingList">
            {{item.title}}@{{item.place}}, {{interval}} days
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from './Event';

@Component({
})
export default class Upcoming extends Vue {
  @Prop() private upcomingList: any;
  // constructor(super){
  //   super();
  //   while(true){
  //     this.interval = this.timeBetween();
  //   }
  // };
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
    difference_ms-=days*one_day;
    let hours = Math.floor(difference_ms/one_hour);
    difference_ms-=hours*one_hour;
    let minutes = Math.floor(difference_ms/one_minute);
    difference_ms-=minutes*one_minute;
    let seconds = Math.floor(difference_ms/1000);
    // Convert back to days and return
    return {
      days,hours,minutes,seconds
    };
  };
  private interval:object = {
    days:0,hours:0,minutes:0,seconds:0
  };
  private currTime = new Date();
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
