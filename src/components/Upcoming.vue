<template>
<div>
  <div class="event-input-wrapper">
  <EventInput v-bind:currEventId="currEventId" v-bind:formatEvents="upcomingList" msg="What's coming next?"/> 
  </div>
  <div class="upcoming">
    <div v-for="item,id in upcomingList" class="event-card">
      <div class="event-card-inside">
        <div class="card-left-above" v-on:click="editEvent(id)"></div>
        <div class="card-right-above" v-on:click="removeEvent(id)"></div>

      <div class="purple"><B>edit</B></div>
      <div class="card-left"><div class="text"><div><span class="countdown-large">{{item.remain.days}}</span><span class="countdown-small">days</span></div> <div class="countdown-small"><B>{{item.remain.hours}}</B>h <B>{{item.remain.minutes}}</B>m <B>{{item.remain.seconds}}</B>s </div></div></div>
      <div class="card-right">
        <div class="text">
        <div class="meta-large">{{item.title}}</div>
        <div class="meta-small"><img src="./location.png" class="location-icon" height="30" width="19">&nbsp&nbsp{{item.place}}</div>
        </div>
      </div>
      <div class="pink"><B>done</B></div>
      </div>
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
    setInterval(this.updateTime, 3000);
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
  box-shadow: 5px 5px 5px #cacaca;
}

.event-input-wrapper{
  width: 100%;
  display: block;
  position: absolute;
  z-index: 10;
}
.upcoming{
  position: absolute;
  top: 150px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
.event-card{
  position: relative;
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

.event-card-inside{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
.card-left{
  height: 100%;
  width: 40%;
  border-right: #dddddd solid 2px;
}
.card-right{
  height: 100%;
  width: 60%;
}

@media only screen and (min-width: 780px){
.event-card{
  width: 360px;
}
.upcoming{
  top: 170px;
}
}
@media only screen and (max-width: 780px){
.event-card{
  width: 90%;
}
.upcoming{
  top: 200px;
}
}

.purple{
  box-shadow: 0px -10px 0px 0px #ad48aa, 0px 10px 0px 0px #ad48aa;
  height:100%;
  width: 0;
  color: rgba(1,1,1,0);
}

.pink{
  box-shadow: 0px -10px 0px 0px #e54e71, 0px 10px 0px 0px #e54e71;
  height:100%;
  width: 0;
  color: rgba(1,1,1,0);
}

.card-left-above{
  width: 40%;
  position: absolute;
  left:0;
  height:100%;
}
.card-left-above:hover ~.card-left{
  border: none;
}

.card-right-above{
  width: 40%;
  position: absolute;
  right:0;
  height:100%;
}
.card-left-above:hover ~ .purple{
  width: 20%;
  transition: width 0.5s;
  background: #ad48aa;
  color: #ffffff;
}
.card-left-above:hover ~.card-right{
  display: none;
}

.card-right-above:hover ~ .pink{
  width: 20%;
  transition: width 0.5s;
  background: #e54e71;
  color: #ffffff;
}

.card-right-above:hover ~.card-left{
  display: none;
}

.text{
  width:100%;
  height:100%;
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
  width: 100%;
  height: 50%;
  font-size: 1.5em;
  margin-left: 15px;
  text-align: left;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.meta-small{
  padding:0;
  height: 50%;
  color: #999999;
  text-align: left;
  margin-left: 15px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.location-icon{
  padding: 20px 0 0 0
}

</style>
