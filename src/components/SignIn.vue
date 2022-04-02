<template>
    <div class="sign-in">
        <h1 v-if="mustSignIn == false">Verify Purchase</h1>
        <h1 v-if="mustSignIn == true">Verify your account below!</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/BAE-Initiative-Logo.png?alt=media&token=e38d3b65-43b5-4670-92d2-341dabf10c1d">
        <button type="button" class="btn btn-success" v-if="purchaseVerified == false" @click="initiateVerification()">Are you sure you'd like to purchase?</button>
        <div class="input-group mb-3" v-if="mustSignIn == true">
            <div class="input-group-prepend" id="hello">
                <span class="input-group-text" id="basic-addon1">From Open Collective</span>
            </div>
            <input v-model="username" type="text" class="form-control" placeholder="Official Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3" v-if="mustSignIn == true">
            <div class="input-group-prepend" id="hello">
                <span class="input-group-text" id="basic-addon1">Personal</span>
            </div>
            <input v-model="email" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3" v-if="mustSignIn == true">
            <div class="input-group-prepend" id="hello">
                <span class="input-group-text" id="basic-addon1">Personal</span>
            </div>
            <input v-model="password" type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
        </div>
        <button type="button" class="btn btn-primary" v-if="mustSignIn == true" @click="signup()">Submit</button>
        <button type="button" class="btn btn-light" @click="exit()">Cancel</button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../firebase.config';
@Component

export default class SignIn extends Vue {
    mustSignIn: boolean = false;
    totalCounted: number = this.$store.getters.returnTotalCounted;
    remainingTiles: number = 0;
    tilesAlreadyUsed: number = 0;
    isVerified: boolean = false;

    pricePerTile: number = 1.00;
    allTilesPurchasedEver: number = 0;

    username: string = ""
    email: string = ""
    password: string = ""

    userVerified: boolean = false;
    purchaseVerified: boolean = false;

    user: any;

    /*created() {
        this.getAllUserData(this.username)
    }*/
    created() {
        this.user = firebase.auth.currentUser 
    }
    initiateVerification() {
        this.purchaseVerified = true
        var self = this
        if (!self.user) {
            self.forceSignIn();
        } 
        else if (self.user) {
            var checkUser = firebase.db.collection('users').doc(this.user.uid);
            checkUser.get().then(doc => {
                self.getAllUserData(doc.data().username, true)
                //self.verifyTiles(user);
            })
        }
        else {
            alert('Error in processing! Try again?');
        }
    }
    forceSignIn() {
        this.mustSignIn = true;
    }
    signup() {
        this.getAllUserData(this.username, false)
    }
    verifyTiles() {
        this.mustSignIn = false;
        //Get this.totalCounted from store
        var checkUser = firebase.db.collection('users').doc(this.user.uid);
        checkUser.get().then(doc => {
            this.remainingTiles = doc.data().remainingTiles;
            this.tilesAlreadyUsed = doc.data().tilesAlreadyUsed;
            this.email = doc.data().email
            this.username = doc.data().username

            //In case they've donated more since before
            if (this.allTilesPurchasedEver > doc.data().allTilesPurchasedEver) {
                checkUser.update({
                    allTilesPurchasedEver: this.allTilesPurchasedEver,
                    remainingTiles: this.allTilesPurchasedEver - this.tilesAlreadyUsed
                })
                this.remainingTiles = this.allTilesPurchasedEver - this.tilesAlreadyUsed
            }

            var remainder = this.remainingTiles - this.totalCounted
            if (remainder >= 0) {
                this.isVerified = true;
                this.withdrawTiles(checkUser)
                alert('Success! Tiles have been purchased.')
                this.exit()
            }
            else {
                this.isVerified = false;
                alert('Sorry! You have exceeded the ' + String(this.remainingTiles)
                    + ' tiles left in your account by ' + String(remainder*-1) 
                    + ' tiles. Please go back and pick at most '  + String(this.remainingTiles) + ' tiles')
                this.exit()
            }
            this.$store.state.tilesWereBought = this.isVerified
        })
        // Get total Counetd from Vuex
    }
    getAllUserData(username: string, alreadyUser: boolean) {
        //console.log('requesting!!!')
        //this.username = username

        var self = this

        const request = require('request');
        const options = {
            url: 'https://cors-anywhere.herokuapp.com/https://opencollective.com/bae-initiative/members/all.json',
            headers: {
                'User-Agent': 'request',
                'orgin': 'http://localhost'
            }
        };
        function callback(error: Error, response: any, body: any) {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                for (var i=0; i<info.length; i++) {
                    var openCollectiveUser = info[i]
                    console.log(openCollectiveUser.name)
                    if (openCollectiveUser.name.toLowerCase() == username.toLowerCase()) {
                        // For testing
                        /*if (openCollectiveUser.name == 'Alex') {
                            openCollectiveUser.totalAmountDonated = 100
                        }*/
                        self.allTilesPurchasedEver = Math.floor(openCollectiveUser.totalAmountDonated/self.pricePerTile)
                        console.log(self.allTilesPurchasedEver)
                        self.userVerified = true
                        self.transferData(alreadyUser, self.userVerified, self.allTilesPurchasedEver)
                        break
                    }
                }
                //return [self.userVerified, self.allTilesPurchasedEver]
            }
        }
        request(options, callback)
        //alert('Ran out')
        //this.transferData(storeUser, alreadyUser, self.userVerified, self.allTilesPurchasedEver)
    }
    transferData(alreadyUser: boolean, userVerified: boolean, allTilesPurchasedEver: number) {
        this.userVerified = userVerified
        this.allTilesPurchasedEver = allTilesPurchasedEver
        if (alreadyUser == true) {
            this.verifyTiles();
        }
        else {
            if (this.userVerified == true) {
                this.mustSignIn = false;
                try {
                    firebase.auth.setPersistence(firebase.Authentication.Auth.Persistence.LOCAL)
                    firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
                        this.user = user.user
                        //Check if username same in the open collective as it is here; if so, continue
                        //Set this.remainingTiles to the found amount of tiles in the json
                        var newUser = firebase.db.collection('users').doc(this.user.uid);
                        newUser.set({
                            email: this.email,
                            username: this.username,
                            allTilesPurchasedEver: this.allTilesPurchasedEver,
                            remainingTiles: this.allTilesPurchasedEver,
                            tilesAlreadyUsed: 0
                        })
                        this.verifyTiles()
                    })
                }
                catch {
                    alert('Invalid account info! Please try again with a valid Username/Email and Password')
                }
            } else {
                this.mustSignIn = true;
                alert('Please use the address you used to donate on our site!')
            }
        }
    }
    withdrawTiles(checkUser: any) {
        checkUser.update({
            tilesAlreadyUsed: this.tilesAlreadyUsed + this.totalCounted,
            remainingTiles: this.remainingTiles - this.totalCounted,
            allPurchasedTilesList: this.$store.getters.returnUserPurchasedTiles
        })
        var allGrids = firebase.db.collection('grids')
        for (var i=0; i<this.$store.getters.returnUserPurchasedTiles.length; i++) {
            var prop = this.$store.getters.returnUserPurchasedTiles[i]
            console.log(prop)
            var newGrid = allGrids.doc(prop)
            newGrid.set({
                owner: this.username,
                email: this.email,
                name: 'Untitled',
                url: 'https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/EmptyURL.png?alt=media&token=816d7cfd-ca62-4d2f-8aaf-893b03bb89be',
                coordinates: prop
            })
        }
    }
    exit() {
        this.$modal.hide('signIn');
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 1em;
}
img {
    margin-left: 30%;
    margin-bottom: 1em;
    width: 40%;
    height: auto;
}
button {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 1em;
}
input {
    width: 90%;
    margin-right: 5%;
    margin-bottom: 1em;
}
#hello {
    margin-left: 5%;
}
</style>