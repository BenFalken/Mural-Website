<template>
    <div class="all-links">
        <a style="color: white" href="https://baeinitiative.org">Explore our main site to learn more!</a>
        <!--a style="color: white" href="https://mural.baeinitiative.org/about">See more about this mural</a-->
        <a style="color: white" href="https://baeinitiative.org/contact">Contact us</a>
        <a style="color: white" href="https://baeinitiative.org/about">Coded by Benjamin Falkenburg</a>
        <div class="all-icons">
            <a style="color: white" href="https://twitter.com/BaeInitiative"><ion-icon name="logo-instagram"></ion-icon></a>
            <a style="color: white" href="https://www.instagram.com/baeinitiative/"><ion-icon name="logo-facebook"></ion-icon></a>
            <a style="color: white" href="https://www.facebook.com/bae.initiative.12"><ion-icon name="logo-twitter"></ion-icon></a>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component

export default class Footer extends Vue {
}
</script>

<style scoped>
.all-links {
    color: white;
    background-color: slategrey;
    padding: 0;
    margin: 0;
    padding-top: 2vh;
    font-family: 'Nunito', sans-serif;
    margin-top: 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    text-align: center;
    display: block;
    margin: 1.5vh;
    text-decoration: none !important;
    font-size: 16px;
}
.all-icons {
    display: flex;
    padding: 0;
    width: 40%;
    margin-left: 30%;
    justify-content: center;
    padding-bottom: 1em;
}
ion-icon {
    font-size: 28px;
    text-align: center;
    padding: 0 0.5em 0 0.5em;
}
</style>