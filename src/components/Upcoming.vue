<template>
<div class="wrapper">
  <div class="event-input-wrapper">
  <EventInput v-bind:currEventId="currEventId" v-bind:formatEvents="upcomingList" msg="Hi Barb.ฅ'ω'ฅ"/> 
  </div>
  <div class="upcoming">
    <div v-for="item,id in upcomingList" class="event-card">
      <div class="hover-box purple" style="float:left"><div class="edit" v-on:click="editEvent(id)"><B>edit</B></div></div>
        <div class="card-left"><div class="text"><div><span class="countdown-large">{{item.remain.days}}</span><span class="countdown-small">days</span></div> <div class="countdown-small"><B>{{item.remain.hours}}</B>h <B>{{item.remain.minutes}}</B>m <B>{{item.remain.seconds}}</B>s </div></div></div>
        <div class="card-right">
          <div class="text">
          <div class="meta-large">{{truncateString(item.title,7)}}</div>
          <div class="meta-small"><img src="./location.png" class="location-icon" height="30" width="19">&nbsp&nbsp{{truncateString(item.place,8)}}</div>
          </div>
        </div>
      <div class="hover-box pink" style="float:right"><div class="remove" v-on:click="removeEvent(id)"><B>done</B></div></div>
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
  private truncateString = function(str: string, maxLen: number){
    return str.length>maxLen?str.slice(0,maxLen)+'..':str;
  }
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
  private formatDate(date:any){
    if(date instanceof Date ===false){
      date = new Date(date);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.event-card:hover{
  box-shadow: 5px 5px 5px #bbbbbb;
}
@media only screen and (min-width: 887px){
.event-input-wrapper{
  width: 100%;
  display: block;
  position: absolute;
  z-index: 10;
}
.upcoming{
  position: absolute;
  top: 200px;
  display: block;
  width: 100%;
}
.event-card{
  position: relative;
  float: left;
  width: 360px;
  outline: #dddddd solid 1px;
  border-bottom: #ffffff solid 10px;
  border-top: #ffffff solid 10px;
  height: 180px;
  margin: 20px 20px;
  /* padding: 10px 0; */
  display: inline-block; 
  background: #ffffff;
}
.card-left{
  float: left;
  display: inline-block;
  height: 100%;
  width: 144px;
  border-right: #dddddd solid 2px;
}
.card-right{
  align-items: left;
  text-align: left;
  float: left;
  height: 100%;
  width: 142px;
}
}
@media only screen and (max-width: 887px){
.event-input-wrapper{
  width: 90%;
  margin-left:2.5%;
  display: block;
  position: absolute;
  z-index: 10;
}
.upcoming{
  position: absolute;
  top: 260px;
  display: block;
  width: 100%;
}
.event-card{
  position: relative;
  width: 100%;
  outline: #dddddd solid 1px;
  border-bottom: #ffffff solid 10px;
  border-top: #ffffff solid 10px;
  height: 180px;
  margin: 20px 0;
  /* padding: 10px 0; */
  background: #ffffff;
}
.card-left{
  float: left;
  display: inline-block;
  height: 100%;
  width: 40%;
  border-right: #dddddd solid 2px;
}
.card-right{
  align-items: left;
  text-align: left;
  float: left;
  height: 100%;
}
}
.hover-box{
  width: 5px;
  height:100%;
  display:inline-block;
  background: #ffffff;
}
.purple{
  position: absolute;
  left:0;
}
.purple:hover{
  background: #893987;
}
.pink{
  position: absolute;
  right:0;
}
.pink:hover{
  background: #e54e71;
}
.hover-box:hover .edit{
  width: 50px;
  transition: 0.5s;
  color: #ffffff;
}
.hover-box:hover{
  width:50px;
  transition: 0.5s;
}
.hover-box:hover .remove{
  width: 50px;
  transition: 0.5s;
  color: #ffffff;
}
.edit{
  float:left;
  height:100%;
  width:0;
  background: #893987;
  color: rgba(1,1,1,0);
}

.remove{
  float:right;
  height:100%;
  width:0;
  background: #e54e71;
  color: rgba(1,1,1,0);
}

.text{
  padding: 0px 20px;
  font-size: 1.5em;
}
.countdown-large{
  color: #893987;
  font-size: 2.4em;
}
.countdown-small{
  color: #ad48aa;
  font-size: 0.7em;
}
.meta-large{
  font-size: 1.5em;
}
.meta-small{
  padding:0;
  color: #999999;
}
.location-icon{
  padding: 20px 0 0 0
}

</style>
