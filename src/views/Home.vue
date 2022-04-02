<template>
  <div class="home">
    <h1 class="mural-title">BAE Initiative - Digital Mural</h1>
    <h2 class="mural-subtitle">Click on any available tiles to purchase for a small fee, and help out Bay Area homes and businesses.</h2>
    <!--a :href="muralURL" target="_blank"><pdf id="pdf-viewer" :src="muralURL" width="500px" height="500px"></pdf></a-->
    <!--viewer>
      <img :src="muralURL" class="mural-img" id="test-img" v-if="notYetVerified == true || canDisplayPDF == true" :style="setImageAspectRatio(750)" alt="Mural is Loading" :complete="imageFirst()"/>
    </viewer-->
    <iframe :src="muralIframeURL" id="test-iframe" class="iframe-img" width="1100" :height="setiFrameAspectRatio(1100)" allowtransparency="true" style="background: #FFFFFF;"></iframe>
    <!--embed :src="muralURL" class="iframe-img" width="425" height="425" /-->
      
    <h2 class="warning-text" v-if="$store.getters.returnIfTilesBought == true">At this stage, <b>don't</b> close or refresh this page till all your tiles have been uploaded. <br> They will <b>not</b> be saved.</h2>
    <p class="purchase-text" v-if="totalCounted == 0">Select any free tiles by clicking below!</p>
    <p class="purchase-text" v-if="totalCounted > 0 && $store.getters.returnIfTilesBought == false">You have {{totalCounted}} tiles in your cart.</p>
    <button type="button" class="btn btn-success" v-if="selectingTiles == false" @click="selectingTiles = true">Select Tiles</button>
    <button type="button" class="btn btn-light" v-if="selectingTiles == true && $store.getters.returnIfTilesBought == false" @click="selectingTiles = false">Cancel</button>

    <div class="allTiles-container" v-if="$store.getters.returnIfTilesBought == true">
      <div class="input-group mb-3" id="URL-input">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Attach a URL link to parcels?</span>
          </div>
        <input v-model="linkedSiteURL" type="text" class="form-control" placeholder="Any appropriate URL link" aria-label="Email" aria-describedby="basic-addon1">
      </div>
      <div class="custom-file" id="form-input" v-for="prop in Object.keys(clickedList)" v-bind:key="prop">
        <label class="custom-file-label" v-if="selectedImages.hasOwnProperty(prop) == false" for="customFile">Tile at Row {{prop.slice(1, prop.length-1).split(', ')[0]}}, Column {{prop.slice(1, prop.length-1).split(', ')[1]}}</label>
        <label class="custom-file-label" v-if="selectedImages.hasOwnProperty(prop) == true" for="customFile">Tile at {{prop}}: {{selectedImages[prop].name}}</label>
        <!--input type="file" class="custom-file-input" @change="fileSelected($event.target.files[0], prop)"-->
        <input type="file" accept="image/*" class="custom-file-input" @change="fileSelected($event.target.files[0], prop)">
      </div>
    </div>
    <modal name="welcome" :height="475">
      <Welcome />
    </modal>
    <modal name="signIn" :height="450">
      <SignIn />
    </modal>
    <modal name="loading" :height="450">
      <Loading />
    </modal>
    <modal name="congratulations" :height="450">
      <Congratulations />
    </modal>
    <button type="button" class="btn btn-primary" v-if="$store.getters.returnIfTilesBought == true" @click="fileUpload()">UPLOAD</button>
    <button type="button" class="btn btn-success" v-if="selectingTiles == true && $store.getters.returnIfTilesBought == false" @click="purchase()">Purchase Tiles?</button>
    <!--div class="container" v-if="selectingTiles == true" :style="getResidualMargin()">
      <div class="row" v-for="row in gridRows" v-bind:key="row">
        <div class="col" v-for="col in gridCols" v-bind:key="col" :style="setBackground(row, col)" @click="addTile(row, col)"></div>
      </div>
    </div-->
    <v-container v-if="selectingTiles == true">
    <!--v-container-->
      <v-row no-gutters v-for="row in gridRows" :key="row" justify="center">
        <template v-for="col in gridCols">
          <v-hover :key="col">
            <v-col>
              <a v-bind:href="siteLink(row, col)"><v-card
                class="square-card"
                elevation="0"
                outlined
                :style="setBackground(row, col)"
                @click="addTile(row, col)"
              ></v-card></a>
            </v-col>
          </v-hover>
        </template>
      </v-row>
    </v-container>
    <!--footer>
      <Footer />
    </footer-->
  </div>
</template>

<script lang='ts'>
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import Welcome from '@/components/Welcome.vue'
import SignIn from '@/components/SignIn.vue'
import Loading from '@/components/Loading.vue'
import Congratulations from '@/components/Congratulations.vue'
import Footer from '@/components/Footer.vue'
import firebase from '../firebase.config';
import axios from 'axios'
import 'viewerjs/dist/viewer.css'
import imageCompression from 'browser-image-compression';
//import mergeImages from 'merge-images';
import jsPDF from 'jspdf';
import Viewer from 'v-viewer'
//import pdf from 'vue-pdf'
Vue.use(Viewer)


@Component({
    components: {
      Welcome,
      SignIn,
      Loading,
      Congratulations,
      Footer
    }
})

export default class Home extends Vue{
  imagesNumber: number = 0;
  imageURI: string = ""

  gridMatrix: { [key: string]: any; } = {};
  gridRows: number = 30;
  gridCols: number = 40;

  allSiteLinks: { [key: string]: any; } = {};
  linkedSiteURL: string = "";

  selectedImages: { [key: string]: any; } = {};
  clickedList: { [key: string]: any; } = {};
  totalCounted: number = 0;

  selectingTiles: boolean = false;
  purchasingTiles: boolean = false;
  isSignedIn: boolean = false;

  defaultFiller: string = 'https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Gray%20Filler.png?alt=media&token=bf2ba9a0-22ac-4f6f-8d26-189053a73696';
  canvasShow: boolean = false;

  globalImageInfo: number[] = [];

  globalCounter: number = 0;

  muralURL: string = 'https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Mural.pdf?alt=media&token=8a2b0f77-aa8e-493a-a845-c0cd7c9ab93d';
  muralIframeURL: string = "https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Mural.pdf?alt=media&token=8a2b0f77-aa8e-493a-a845-c0cd7c9ab93d" +'#toolbar=0&navpanes=0&scrollbar=0';
  notYetVerified: boolean = true;
  
  canDisplayPDF: boolean = true;
  uploadImageCounter: number = 0;

  mounted() {
    this.$store.state.tilesWereBought = false;
    this.getAllImages(false); //usually false, indicates whether or not to make the mural
    this.fillGridMatrix(); // files grid tiles
    var user = firebase.auth.currentUser
    if (!user) {
      this.$modal.show('welcome')
    }
  }

  created() {
    //console.log('hi')
  }

  getAllImages(isUpdating: boolean) {
    this.imagesNumber = 0
    var allPhotos = firebase.db.collection('grids')

    allPhotos.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.imagesNumber = this.imagesNumber + 1
        if (doc.data().url == '') {
          firebase.storage.ref(doc.data().name).getDownloadURL().then(url => {
            var updateGrid = firebase.db.collection('grids').doc(doc.id)
            updateGrid.update({
              url: url
            })
            this.gridMatrix[doc.data().coordinates] = url
            /* NEW CODE */
            this.allSiteLinks[doc.data().coordinates] = doc.data().siteLink
          })
        }
        else {
          this.gridMatrix[doc.data().coordinates] = doc.data().url
          /* NEW CODE */
          this.allSiteLinks[doc.data().coordinates] = doc.data().siteLink
        }
      })
      /* Important */
      if (isUpdating == true) {
        this.createMural({gridMatrix: this.gridMatrix, gridRows: this.gridRows, gridCols: this.gridCols, defaultFiller: this.defaultFiller});
        /*firebase.functions.httpsCallable('createMural')({gridMatrix: this.gridMatrix, gridRows: this.gridRows, gridCols: this.gridCols, defaultFiller: this.defaultFiller}).then(result => {
          // Console log the result we get from the cloud function
          console.log('Success!');
				})*/
      }
      this.$store.state.expectedTimeToFinish = Math.round(this.imagesNumber*28/160);
    })
  }

  fillGridMatrix() {
    for (var row=0; row<this.gridRows; row++) {
      for (var col=0; col<this.gridCols; col++) {
        var newIndex = String('(' + row + ', ' + col + ')')
        this.gridMatrix[newIndex] = 0
      }
    }
  }

  setBackground(row: number, col: number) {
    var newImage = 0
    var url = this.gridMatrix['(' + String(row) + ', ' + String(col) + ')']
    var param = {
        "background-image": "url(" + String(url) + ")",
        "background-size": "100% 100%",
        "width": String(750/this.gridCols)+"px",
        "height": String(750/this.gridCols)+"px"
    }/*
        "max-width": String(750/this.gridCols)+"px",
        "min-height": String(750/this.gridCols)+"px",
        "border": "aliceblue 1px solid"
      }*/
    if (!url) {
      param["background-image"] = "none"
    }
    if (!url && this.clickedList['(' + String(row) + ', ' + String(col) + ')'] == 1) {
      var clickedParam = {
        "background-image": "url(" + String(url) + ")",
        "background-color": "#cceeff",
        "width": String(750/this.gridCols)+"px",
        "height": String(750/this.gridCols)+"px",
        "background-size": "100% 100%",
      }
      return clickedParam
    }
    return param
  }

  siteLink(row: number, col: number) {
    console.log(this.allSiteLinks['(' + String(row) + ', ' + String(col) + ')'])
    return this.allSiteLinks['(' + String(row) + ', ' + String(col) + ')']
  }

  addTile(row: number, col:number) {
    if (this.$store.getters.returnIfTilesBought == false){
      var coordinate = '(' + String(row) + ', ' + String(col) + ')'
      //console.log(coordinate)
      if (this.clickedList[coordinate] != 1 && !this.gridMatrix[coordinate]) {
        this.clickedList[coordinate] = 1
        this.totalCounted = this.totalCounted + 1
      }
      else if (this.gridMatrix[coordinate]) {
        delete this.clickedList[coordinate]
      }
      else {
        delete this.clickedList[coordinate]
        this.totalCounted = this.totalCounted - 1
      }
      var saveRows = this.gridRows
      this.gridRows = 0
      this.gridRows = saveRows
    }
    else {
      alert('Forbidden to select')
    }
  }

  /*fileSelected(fileUpload: any, prop: string) {
    this.selectedImages[prop] = fileUpload
    console.log(fileUpload)
    var saveClickedList = this.clickedList
    this.clickedList = []
    this.clickedList = saveClickedList
    //console.log(this.selectedImages)
  }*/

  async fileSelected(fileUpload: any, prop: string) {
    console.log('Size 1 ' + fileUpload.size)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 50,
      useWebWorker: true
    }

    try {
      const compressedFile = await imageCompression(fileUpload, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      console.log('Size 2 ' + compressedFile.size)
      this.selectedImages[prop] = compressedFile
      var saveClickedList = this.clickedList
      this.clickedList = []
      this.clickedList = saveClickedList
    } catch (error) {
      console.log(error);
    }
  }

  fileUpload() {
    var self = this

    function recordUrl(downloadURL: string, prop: string, uploadImageCounter: number, totalLength: number) {
      console.log(uploadImageCounter + " " + downloadURL + " " + prop)
      var allGrids = firebase.db.collection('grids')
      var newGrid = allGrids.doc(prop)
      newGrid.update({
        name: newFile.name,
        url: downloadURL,
        siteLink: this.linkedSiteURL
      }).then(() => {
        if (uploadImageCounter == Object.keys(self.selectedImages).length - 1) {
          self.resetPage()
        }
        processNewImage(Number(uploadImageCounter+1), totalLength)
      })
    }

    function processNewImage(uploadImageCounter: number, totalLength:number) {
      var prop = Object.keys(self.selectedImages)[uploadImageCounter]
      var newFile = self.selectedImages[prop]
      const storageRef = firebase.storage.ref(newFile.name).put(newFile);
      storageRef.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        console.log('Error loading')
      }, function() {
        storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          recordUrl(downloadURL, prop, uploadImageCounter, totalLength)
        });
      })
    }

    var allImagesVerified = true
    try {
      for (var prop in this.selectedImages) {
        var newFile = this.selectedImages[prop]
        console.log(newFile.Dimensions)
        var fileList = newFile.type.split('/')
        var fileType = fileList[1]
        console.log(fileType)
        if (fileType.toUpperCase() == 'JPG' || fileType.toUpperCase() == 'JPEG' || fileType.toUpperCase() == 'PNG') {
          continue
          //https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/1024px-Ingres%2C_Napoleon_on_his_Imperial_throne.jpg?alt=media&token=275bb82e-082c-40ba-80ab-0732f8957c98
        } else if (!newFile.name) {
          alert('Invalid files. Must be png or jpg.')
          allImagesVerified = false
          break
        }
        else {
          alert('Invalid files. Must be png or jpg.')
          allImagesVerified = false
          break
        }
      }
    } catch {
      alert('Unknown error. Try again!')
      allImagesVerified = false
    }
    if (allImagesVerified == true) {
      console.log(this.selectedImages)
      var uploadImageCounter = 0;
      var totalLength = Object.keys(this.selectedImages).length
      try {
        processNewImage(uploadImageCounter, totalLength)
      }
      catch {
        alert('One or more of your images is invalid! Please try again')
      }
    }
    //window.location.reload(true);
  }

  resetPage() {
    this.getAllImages(true)
    this.totalCounted = 0;
    this.selectingTiles = false;
    this.purchasingTiles = false;
    this.$store.state.tilesWereBought = false;
  }

  createMural(allParams: any) {
    this.$modal.show('loading')
    var self = this
    var gridMatrix = allParams.gridMatrix
    var gridCols = allParams.gridCols
    var gridRows = allParams.gridRows
    var defaultFiller = allParams.defaultFiller
    
    var getImageFromUrl = function(url: Array<any>, callback: any) {
      var stringURL = url[0]
      var img = new Image();
      img.onerror = function() {
        alert('Cannot load image: "'+url+'"');
      };
      img.onload = function() {
        callback(img, url[1], url[2], url[3], url[4], url[5]);
      };
      img.src = stringURL;
    }

    var createPDF = function(imgData: HTMLImageElement, newCoordinate: any, currIndex: number, lastIndex: number, doc: jsPDF, stringUrl: string) {
      console.log(currIndex)
      var minusPadding = 100;
      if (stringUrl == defaultFiller) {
        var totalWidth = 133.25*gridCols
        var scaledHeight = Math.round(totalWidth*(gridRows/gridCols))
        doc.addImage(imgData, 'JPEG', newCoordinate[1], newCoordinate[0], totalWidth, scaledHeight);
      } else {
        doc.addImage(imgData, 'JPEG', Number(100*newCoordinate[1]) - minusPadding, Number(100*newCoordinate[0]) - minusPadding, 100, 100);
      }
      if (currIndex == lastIndex) {
        doc.save('Mural.pdf')
        const file = doc.output("blob");
        const storageRef = firebase.storage.ref('Mural.pdf').put(file);
        self.changeModals()
        return 
      }
      else {
        addNewMuralImage(currIndex+1, doc)
      }
    }

    function toDataURL(URLData: any, callback: any) {
      var url = URLData[0]
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result, URLData[1], URLData[2], URLData[3], URLData[4], URLData[0]);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

    function addNewMuralImage(trackIndex: number, doc: jsPDF) {
      var newURL = filledGridURLs[trackIndex]
      var newCoordinate = filledGridCoordinates[trackIndex]
      var URLData = [newURL, newCoordinate, trackIndex, filledGridCoordinates.length-1, doc]
      
      toDataURL(URLData, function(dataUrl: any, storedCoordinate: number[], currIndex: number, lastIndex: number, doc: jsPDF, stringUrl: string) {
        getImageFromUrl([dataUrl, storedCoordinate, currIndex, lastIndex, doc, stringUrl], createPDF)
        //console.log('New Index ' + trackIndex)
      })
    }

    var filledGridCoordinates = [[0, 0]]
    var filledGridURLs = [defaultFiller]
    for (var i=0; i<Object.keys(gridMatrix).length; i++) {
      var coordinate = Object.keys(gridMatrix)[i]
      var url = gridMatrix[String(coordinate)]
      if (url && url != 0) {
        var splitCoordinate = coordinate.slice(1, coordinate.length-1).split(', ')

        filledGridCoordinates.push([Number(splitCoordinate[0]), Number(splitCoordinate[1])])
        filledGridURLs.push(url)
      }
    }
    var totalWidth = 133.25*gridCols
    var scaledHeight = Math.round(totalWidth*(gridRows/gridCols))
    var doc = new jsPDF({unit: 'px', orientation: 'landscape', format: [totalWidth, scaledHeight]});
    var trackIndex = 0;

    addNewMuralImage(trackIndex, doc)
  }

  changeModals() {
    this.$modal.hide('loading');
    this.$modal.show('congratulations');
  }

  getResidualMargin() {
    //var residual = String((50 - (25/this.gridCols))/2)
    var param = {
      "margin-left": "calc(50% - 375px)",
      "margin-right": "calc(50% - 375px)",
      "min-width": "750px"
    }
    return param
  }

  setImageAspectRatio(width: number) {
    var param = {
      "width": String(width)+"px",
      "height": String(Math.round(width*this.gridRows/this.gridCols))+"px",
      "margin-left": "calc(50% - " + String(width) + "px/2)"
    }
    return param
  }

  setiFrameAspectRatio(width: number) {
    var height = String(Math.round(width*this.gridRows/this.gridCols))
    return height
  }

  purchase() {
    this.purchasingTiles = true;
    this.$store.state.totalCounted = this.totalCounted
    this.$store.state.userPurchasedTiles = Object.keys(this.clickedList)
    //this.images[0] = this.mergeAllNewFiles()
    this.$modal.show('signIn');
  }
}
</script>

<style scoped>
.mural-title, .mural-subtitle {
  width: 100%;
  text-align: center;
  padding: 0.5em;
  color: #2c3e50;
}
.home {
  font-family: 'Nunito', sans-serif;
  padding: 0;
}
.mural-title {
  font-weight: bold;
}
.mural-subtitle {
  font-size: 1vw;
  font-style: italic;
}
.mural-img {
  /*background: url('https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif');*/
  background: url('https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif');
  background-position: center;
  /*background-size: 100% 100%;*/
  /*--width-toal: 750px;
  width: var(--width-toal);
  height: var(--width-toal);*/
  text-align: center;
  /*margin-left: calc(50% - var(--width-toal)/2);*/
  /*background-image: url('https://static.scientificamerican.com/sciam/cache/file/5C51E427-1715-44E6-9B14D9487D7B7F2D_source.jpg?w=590&h=800&EA562668-5B43-4B0F-8F081C64132DE4F6');*/
  border: solid 2px slategray;
  border-radius: 2px;
}
iframe {
  margin-left: calc(50% - 550px);
  border-radius: 5px;
  overflow:hidden !important;
  scroll-behavior: unset;
}
.warning-text {
  margin: 1em calc(50% - 375px) 1em calc(50% - 375px);
  text-align: center;
  padding: 0.25em;
  border: 2px solid darkred;
  width: 750px;
  border-radius: 5px;
}
.container {
  margin-bottom: 1em;
}
.square-card {
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.square-card:hover {
  background-color: #cceeff;
}
.col {
  flex-grow: 0;
}
.purchase-text {
  text-align: center;
  color: #2c3e50;
}
#URL-input {
  width: 750px;
  margin-left: calc(50% - 375px);
  margin-right: calc(50% - 375px);
}
#form-input {
  width: 750px;
  margin-left: calc(50% - 375px);
  margin-right: calc(50% - 375px);
}
button {
  margin: 1em calc(50% - 375px) 1em calc(50% - 375px);
  /*margin-left: calc(50% - 375px);*/
  width: 750px;
}
#pdf-viewer {
  --width-toal: 750px;
  width: var(--width-toal);
  height: var(--width-toal);
  margin-left: calc(50% - var(--width-toal)/2);
  border: solid 1px slategray;
}
footer {
  border: solid 2px lightslategrey;
  min-height: 200px;
  background: lightslategrey;
  margin: 0;
  padding: 0;
}
</style>

<!--style lang="scss" scoped>
.square-card {
  /*height: 2rem;
  width: 2rem;*/
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-image: url(https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/1024px-Ingres%2C_Napoleon_on_his_Imperial_throne.jpg?alt=media&token=cdd7ae0b-5eee-413c-9080-7dc47c2ca70b);*/
}
.square-card:hover {
  background-color: #cceeff;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col {
  flex-grow: 0;
}
.on-hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.01) !important;
}
</style-->