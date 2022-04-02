<template>
  <v-app>
    <!--v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar-->

    <v-content>
      <div id="nav">
        <div id="left">
          <router-link to="/"><button class="btn btn-default">Mural</button></router-link>
          <router-link to="/about"><button class="btn btn-default">About</button></router-link>
        </div>
        <img id="title-logo" src="https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/BAE-Initiative-Logo.png?alt=media&token=ff87bcca-9ec0-41a8-a67b-128f180c7edf">
        <!--button class="btn btn-deafult" id="about-button"><router-link to="/fuck">Update</router-link></button-->
        <div id="right">
          <a href="https://opencollective.com/bae-initiative"><button class="btn btn-default">Give</button></a>
          <a href="https://baeinitiative.org"><button class="btn btn-default">Home</button></a>
        </div>
      </div>
      <router-view/>
      <!--Home/-->
    </v-content>
    <footer>
      <Footer />
    </footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/Footer.vue';
import Home from './views/Home.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Footer,
    Home
  },

  data: () => ({
    //
  }),
});
</script>

<style scoped>
#title-logo {
  width: 150px;
  max-height: 70px;
  vertical-align: top;
}
#nav a {
  font-family: 'Nunito', sans-serif;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 100px;
  color: #2c3e50;
  padding-top: 0.5em;
  margin: 0 0.25em 0.25em 0.25em;
}
button {
  vertical-align: top;
  background-color: aliceblue;
  padding: 15px 15px;
  min-width: 150px;
  min-height: 5vw;
  font-size: 40px;
  border-radius: 20px;
}
#title-logo, button {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>
