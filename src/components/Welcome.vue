<template>
    <div class="congrats-message">
        <h1>Welcome to the BAE Initiative Mural!</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/BAE-Initiative-Logo.png?alt=media&token=e38d3b65-43b5-4670-92d2-341dabf10c1d">
        <p>This mural is designed as a digital archive of art, culture and experiences during 2020 fires and the COVID-19 outbreak. All contributions - art, photos, etc - are welcome.</p>
        <button type="button" class="btn btn-primary" @click="exit()">Take me to the Mural!</button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component
export default class Welcome extends Vue {
    exit() {
        this.$modal.hide('welcome');
    }
}
</script>

<style scoped>
.congrats-message {
    min-height: 40vh;
}
h1, p {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 1em;
    text-align: center
}
img {
    margin-left: 25%;
    width: 50%;
    height: calc(70% / 3);
}
button {
    margin: 5%;
    width: 90%;
}
</style>
