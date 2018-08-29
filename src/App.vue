<template>
  <div id="app">
    <div id = "selfIntro">
    <h2>Hi! I'm Zeya Peng!</h2>
    <h3>I'm a first-year in MPS IS.</h3>
    <p>_(:3JL)_</p>
    <p>I am a psychology major undergrad before this semester, where I got very interested in Human Computer Interaction and decided to learn more in the tech side in HCI.
      Over a year later I got into this program and interned as a front end developer in a mini company in my place (somehow).
    </p>
    <p>It is so excited to be part of the studio to make something cool.</p>
    <p>(Besides I hope to be just as magnificent as our TA to work for Google.)</p>
    <p>I am a sedentary kind of person and I am once a frequent movie-goer/ TV shows watcher, not-so-hardcore game player (and developer for a few times at my local Game Jam). </p>
    </div>
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
  text-align: left;
  color: #494945;
  background: #c6ffdd; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #c6ffdd, #fbd786, #f7797d); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
#selfIntro{
  margin: 0 auto;
  width: 50%;
}
</style>
