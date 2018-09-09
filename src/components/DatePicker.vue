<template>
  <div>
    <div><input type="button" value="<-" v-on:click="update(-1,0)"/>
    {{currDate.getFullYear()}}
    <input type="button" value="->" v-on:click="update(1,0)"/>
    <input type="button" value="<-" v-on:click="update(0,-1)"/>
      {{(currDate.getMonth()+1)%13}}
    <input type="button" value="->" v-on:click="update(0,1)"/>
    </div>
    <div>M T W T F S S</div>
    <div v-for="w in computed.dateList.get()">
      <span v-for="d in w">
        <span v-if="!d.active">{{d.date+' '}}</span>
        <button v-if="d.active" v-on:click="selectDate(d.date) ">{{d.date}}</button>
      </span>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
    @Prop() public currDate: any;
    @Prop() public hide: any;
    @Prop() public setDate:any;
    private selectDate(d: number){
      this.update(0,0,d);
      this.hide();
    }
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
          let list: Array<Array<object>> = [];
          let w=0;
          let firstDayInCurrMonth = new Date(this.y,this.date.getMonth(),1).getDay();
          // console.log(firstDayInCurrMonth,this.y,this.date.getMonth())
          if(firstDayInCurrMonth!==1){
            for(let i=firstDayInCurrMonth-2;i>=0;i--){
              list[w] = list[w]||[];
              list[w].push({
                date:lastMonthLen-i,
                active: false,
              });
            }
          }
          for(let i=1;i<=currMonthLen;i++){
            list[w] = list[w]||[];
            if(list[w].length===7){
              w++;
              list[w] = list[w]||[];
            }
            list[w].push({
              date:i,
              active: true
            });
          }
          for(let i = list[list.length-1].length,j=1;i<7;i++,j++){
            list[list.length-1].push({
              date:j,
              active:false
            });
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
    update(dy:number =0, dm:number =0, day:number){
      if(dy!==0||dm!==0){
        let [year, month]= [this.currDate.getFullYear()+dy,this.currDate.getMonth()+dm];
        if(month>11){
          year+=1;
          month-=12;
        }else if(month<0){
          month+=12;
          year-=1;
        }
        this.computed.dateList.update = [year,month];
      }
      this.setDate(new Date(this.currDate.getFullYear()+dy,this.currDate.getMonth()+dm,day||this.currDate.getDate()));
      // console.log('x',this.currDate);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
