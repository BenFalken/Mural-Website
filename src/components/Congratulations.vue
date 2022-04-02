<template>
    <div class="congrats-message">
        <h1>Congrats on your Contribution!</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/BAE-Initiative-Logo.png?alt=media&token=e38d3b65-43b5-4670-92d2-341dabf10c1d">
        <p>You may download a pdf file of the mural if you wish.<br>Tag us at @baeinitiative, with #BAEMural</p>
        <div class="all-icons">
            <a style="color: slategrey" href="https://twitter.com/BaeInitiative"><ion-icon name="logo-instagram"></ion-icon></a>
            <a style="color: slategrey" href="https://www.instagram.com/baeinitiative/"><ion-icon name="logo-facebook"></ion-icon></a>
            <a style="color: slategrey" href="https://www.facebook.com/bae.initiative.12"><ion-icon name="logo-twitter"></ion-icon></a>
        </div>
        <button type="button" class="btn btn-light" @click="exit()">Exit</button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component
export default class Congratulations extends Vue {
    exit() {
        this.$modal.hide('congratulations');
    }
}
</script>

<style scoped>
.congrats-message {
    min-height: 40vh;
}
h1, p {
    margin-top: 1em;
    text-align: center
}
.all-icons {
    width: 50%;
    margin-left: 25%;
    display: flex;
    justify-content: center;
}
ion-icon {
    margin: 0 0.5em 0 0.5em;
    font-size: 40px;
}
img {
    margin-left: 25%;
    width: 50%;
    height: calc(50% * 35/75);
}
button {
    margin: 5%;
    width: 90%;
}
</style>
