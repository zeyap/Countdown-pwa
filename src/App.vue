<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/photo.jpg">
    <h1>Hi! I'm Shea Belsky!</h1>
    <h2>I'm a Head TA for INFO/CS 4340 this semester.</h2>
    <p>I was a UX Engineer at Google this summer, working on prototypes for Google Search and Assistant.</p>
    <p>I love to run, ski, read, and nosh on pierogees.</p>
    <h2>Chuck Norris Jokes</h2>
    <div class="chuckNorris">
      <div class="field">
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" v-model="firstName" name="firstName" />
      </div>
      <div class="field">
        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" v-model="lastName" name="lastName" />
      </div>
      <button @click="getJokes">Submit</button>
      <div class="joke" v-html="joke"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  @Provide() firstName = "";
  @Provide() lastName = "";
  @Provide() joke = "";
  getJokes() {
    // this.updateJoke("Loading joke...");
    const url = `http://api.icndb.com/jokes/random
      ?firstName=${this.firstName}&lastName=${this.lastName}&limitTo=[nerdy]`;
    fetch(url)
      .then(result => {
        return result.json();
      })
      .then(response => {
        const { joke } = response.value;
        this.updateJoke(joke);
      })
      .catch(err => {
        this.updateJoke(err);
      });
  }
  updateJoke(joke: string) {
    this.joke = joke;
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.chuckNorris {
  margin-bottom: 30px;
}
img {
  width: 20%;
}
input {
  margin-left: 5px;
}
</style>
