<template>
    <div class="congrats-message">
        <h1>Businesses Need You.</h1>
        <div class="cropped">
            <img src="https://downtownlosaltos.org/wp-content/uploads/2018/08/Cable-Car3.jpg">
        </div>
        <!--p>Resources are here for businesses and the people who want to help them.<br>Find a list of businesses at this link: https://downtownlosaltos.org/member/<br>Find businesses to donate to directly at https://whatsopenlosaltos.org</p-->
        <div class="resources">
            <a href="https://www.kqed.org/science/1963889/coronavirus-some-bay-area-counties-are-about-to-open-up-more-heres-where-your-county-stands" class="left-button"><button class="btn btn-primary"><b>What's open in the Bay Area</b></button></a>
            <a href="https://www.nytimes.com/2020/09/14/us/wildfires-live-updates.html" class="right-button"><button class="btn btn-primary"><b>Fire Updates</b></button></a>
        </div>
        <div class="resources">
            <a href="https://www.sfchronicle.com/projects/california-fire-map/" class="left-button"><button class="btn btn-primary"><b>Bay Area Fire Map</b></button></a>
            <a href="https://www.cnet.com/how-to/2020-wildfires-in-california-and-west-what-we-know-and-how-to-help/" class="right-button"><button class="btn btn-primary"><b>Other ways to help</b></button></a>
        </div>
        <button type="button" class="btn btn-light" id="cancel-button" @click="exit()">Exit</button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component
export default class BusinessInfo extends Vue {
    exit() {
        this.$modal.hide('businessInfo');
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
.resources {
    margin-left: 5%;
    width: 90%;
    height: auto;
}
.left-button, .right-button {
    min-width: calc(50% - 1em);
    margin-top: 0.5em;
}
.left-button {
    float: left;  
}
.left-button button {
    min-width: 100%;
}
.right-button {
    float: right;
}
.right-button button {
    min-width: 100%;
}
.cropped {
    margin-left: calc(50% - 150px);
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
}
img {
    margin-left: 0;
    width: calc(300px * 1967/1312);
    height: 300px;
}
#cancel-button {
    margin: 5%;
    width: 90%;
}
</style>