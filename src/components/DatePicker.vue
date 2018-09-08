<template>
  <div>
    <div>M T W T F S S</div>
    <div v-for="w in computed.dateList.get()">
      <span v-for="d in w"><button v-on:click="hide()">{{d}}</button></span>
    </div>
    <div>
      <input type="button" value="<-" v-on:click="update(0,-1)"/>
      <input type="button" value="->" v-on:click="update(0,1)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
    @Prop() public currDate: any;
    @Prop() public hide: any;
    computed = {
      dateList:{
        date: new Date(),
        y:this.currDate.getFullYear(),
        m:this.currDate.getMonth(),//getMonth(): zero-indexed
        d:this.currDate.getDate(),
        genList(){
          this.m = (this.date as any).getMonth();
          this.d = (this.date as any).getDate();
          let currMonthLen = new Date(this.m,this.m+1,0).getDate();
          let lastMonthLen = new Date(this.m-1,this.m,0).getDate();
          let nextMonthLen = new Date(this.m+1,this.m+2,0).getDate();
          let list: Array<Array<number>> = [];
          let w=0;
          let firstDayInCurrMonth = new Date(this.y,this.date.getMonth(),1).getDay();
          console.log(firstDayInCurrMonth,this.y,this.date.getMonth())
          if(firstDayInCurrMonth!==1){
            for(let i=firstDayInCurrMonth-2;i>=0;i--){
              list[w] = list[w]||[];
              list[w].push(lastMonthLen-i);
            }
          }
          for(let i=1;i<=currMonthLen;i++){
            list[w] = list[w]||[];
            if(list[w].length===7){
              w++;
              list[w] = list[w]||[];
            }
            list[w].push(i);
          }
          for(let i = list[list.length-1].length,j=1;i<7;i++,j++){
            list[list.length-1].push(j);
          }
          return list;
        },
        get: function(){
          return this.genList();
        },
        set update([year,month]:Array<number>){
          if(year!==this.y||month!==this.m){
            this.y = year;
            this.m = month;
            this.date = new Date(this.y,this.m,this.d)
            // console.log('change',this.y,this.m)
          }
        }
      }
    }
    update(dy:number, dm:number){
      let [year, month]= [this.currDate.getFullYear()+dy,this.currDate.getMonth()+dm];
      this.computed.dateList.update = [year,month];
      this.currDate = new Date(this.currDate.getFullYear()+dy,this.currDate.getMonth()+dm,this.currDate.getDate())
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
