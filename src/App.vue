<template>
  <div id="app">
      <EventInput msg="What's new for today?"/>
      <Upcoming v-bind:upcomingList="formatEvents"/>
      <Ended/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventInput from './components/EventInput.vue';
import Upcoming from './components/Upcoming.vue';
import Ended from './components/Ended.vue';

import data from './assets/test_events.json';
import Event from './components/Event';

// const testData = data.default
//   .map((e: any) => new Event(e.date, e.title, e.place, e.status));
// console.log(testData, testData.length);

@Component({
  components: {
    EventInput,
    Upcoming,
    Ended,
  },
})

export default class App extends Vue {
  public formatEvents = data.default
  .map((e: any) => new Event(e.date, e.title, e.place, e.status))
  // console.log(formatEvents: any)
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
