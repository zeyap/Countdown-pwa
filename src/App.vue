<template>
  <div id="app">
      <Upcoming v-bind:upcomingList="formatEvents" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Upcoming from './components/Upcoming.vue';

import Event from './components/Event';
import data from './assets/test_events.json';

// const testData = data.default
//   .map((e: any) => new Event(e.date, e.title, e.place, e.status));
// console.log(testData, testData.length);

@Component({
  components: {
    Upcoming,
  },
})
export default class App extends Vue {
  public formatEvents = [];
  created(){
    if(undefined === window.localStorage.getItem('events')){
      window.localStorage.setItem('events',JSON.stringify(data));
    }
    this.formatEvents = JSON.parse(window.localStorage.getItem('events') as any)
    ['default'].map((e: any) => new Event(e.date, e.title, e.place, e.status));
    let self = this;
    window.addEventListener('beforeunload',function(){
      window.localStorage.setItem('events',JSON.stringify({'default':self.formatEvents}));
    })
  };
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  padding-bottom: -60px;
  background: #eeeeee;
}
</style>
