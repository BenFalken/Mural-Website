<template>
    <div id="loading">
        <h1>Loading...</h1>
        <p>Please wait while the Mural is loading. Expect time to finish: {{expectedTime}} seconds</p>
        <img src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif">
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component
export default class Loading extends Vue {
    expectedTime: number = this.$store.getters.returnExpectedTimeToFinish
    exit() {
        this.$modal.hide('loading');
    }
}
</script>

<style scoped>
h1, p {
    margin-top: 1em;
    text-align: center
}
img {
    margin-left: 20%;
    width: 60%;
    height: auto;
}
button {
    margin-left: 5%;
    width: 90%;
}
</style>
