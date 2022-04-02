<template>
  <div class="home">
    <div class="content">
      <div class="titles">
        <h1 class="mural-title">Add onto the mural!</h1>
        <h2 class="mural-subtitle">Click on any available tiles to purchase for a small fee, and help out Los Altos businesses.</h2>
      </div>
      <div id="background-img">
        <v-container class="grid-container" :style="checkPurchase()">
          <v-row no-gutters v-for="row in gridRows" :key="row">
            <template v-for="col in gridCols">
              <v-hover :key="col">
                <v-col>
                  <v-card
                    class="square-card"
                    elevation="0"
                    outlined
                    :style="setBackground(row, col)"
                    @click="addTile(row, col)"
                  ></v-card>
                </v-col>
              </v-hover>
            </template>
          </v-row>
        </v-container>
        <canvas id="canvas" width=800 height=600 style="border: solid;" :style="checkPurchase()"></canvas>
        <h2 class="warning-text" v-if="$store.getters.returnIfTilesBought == true">At this stage, <b>don't</b> close or refresh this page till all your tiles have been uploaded. <br> They will <b>not</b> be saved.</h2>
        <p class="purchase-text" v-if="totalCounted == 0">Select any free tiles!</p>
        <p class="purchase-text" v-if="totalCounted > 0 && $store.getters.returnIfTilesBought == false">You have {{totalCounted}} tiles in your cart.</p>
        <div class="allTiles-container" v-if="$store.getters.returnIfTilesBought == true">
        <div class="custom-file" id="form-input" v-for="prop in Object.keys(clickedList)" v-bind:key="prop">
          <label class="custom-file-label" v-if="selectedImages.hasOwnProperty(prop) == false" for="customFile">Tile at {{prop}}</label>
          <label class="custom-file-label" v-if="selectedImages.hasOwnProperty(prop) == true" for="customFile">Tile at {{prop}}: {{selectedImages[prop].name}}</label>
          <!--input type="file" class="custom-file-input" @change="fileSelected($event.target.files[0], prop)"-->
          <input type="file" accept="image/*" class="custom-file-input" @change="fileSelected($event.target.files[0], prop)">
        </div>
      </div>
      <modal name="signIn" :height="400">
        <SignIn />
      </modal>
      <modal name="loading">
        <Loading />
      </modal>
      <modal name="congratulations" :height="400">
        <Congratulations />
      </modal>
      <button type="button" class="btn btn-primary" v-if="$store.getters.returnIfTilesBought == true" @click="fileUpload()">UPLOAD</button>
      <button type="button" class="btn btn-success" v-if="$store.getters.returnIfTilesBought == false" @click="purchase()">Purchase Tiles?</button>
      </div>
      <a id="download" download="export.jpg" href="" @click="exportImage(this)">Download to image.jpg</a>
    </div>
  </div>
</template>
​
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import SignIn from '@/components/SignIn.vue'
import Loading from '@/components/Loading.vue'
import Congratulations from '@/components/Congratulations.vue'
import Footer from '@/components/Footer.vue'
import firebase from '../firebase.config';
import axios from 'axios'
import 'viewerjs/dist/viewer.css'
import imageCompression from 'browser-image-compression';
@Component({
    components: {
        SignIn,
        Loading,
        Congratulations,
        Footer
    }
})

export default class Fuck extends Vue {
  name: string = "Home";

  backgroundImage: any;
    
  gridMatrix: { [key: string]: any; } = {};
  imageList: Array<any> = []
    
  gridRows: number = 30;
  gridCols: number = 40;
    
  imageWidth: number = 20;
  backgroundWidth: number = 800;

  images: Array<any> = [];
  selectedImages: { [key: string]: any; } = {};
  clickedList: { [key: string]: any; } = {};
  totalCounted: number = 0;

  purchasingTiles: boolean = false;

  URLList: Array<any> = [];
    
  muralURL: string = 'https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Mural1.jpg?alt=media&token=bb810e89-ded3-4d26-be9b-2a1b0cb1623d' //'https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Mural.jpg?alt=media&token=992a0cc2-1ffc-4492-9aab-374c976c8a09'

	mounted() {
    this.addImage(this.muralURL, this.backgroundWidth, (this.backgroundWidth*this.gridRows/this.gridCols), 0, 0);
    this.$store.state.tilesWereBought = false;
    this.getAllImages(false); //usually false, indicates whether or not to make the mural
    this.fillGridMatrix(); // files grid tiles
  }

  getAllImages(isUpdating: boolean) {
    var allPhotos = firebase.db.collection('grids')

    allPhotos.get().then(snapshot => {
    snapshot.forEach(doc => {
      if (doc.data().url == '') {
        firebase.storage.ref(doc.data().name).getDownloadURL().then(url => {
          var updateGrid = firebase.db.collection('grids').doc(doc.id)
          updateGrid.update({
          url: url
          })
          this.gridMatrix[doc.data().coordinates] = url
        })
      } else {
        this.gridMatrix[doc.data().coordinates] = doc.data().url
      }
    })
    if (isUpdating == true) {
      this.createMural()
    }
        //this.$store.state.expectedTimeToFinish = Math.round(this.imagesNumber*28/160);
    })
  }

  checkPurchase() {
    if (this.purchasingTiles == true) {
      var param = {"visibility": "hidden"}
      return param
    }
  }

  fillGridMatrix() {
    for (var row=0; row<this.gridRows; row++) {
      for (var col=0; col<this.gridCols; col++) {
        var newIndex = String('(' + row + ', ' + col + ')')
        this.gridMatrix[newIndex] = 0
      }
    }
  }

	addImage(imageURL: string, width: number, height: number, row: number, col: number) {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
		var context = canvas.getContext("2d");

    var muralBackground = new Image();
    muralBackground.src = imageURL
    console.log(width, height)
    console.log(row*height, col*width)
    muralBackground.setAttribute('crossorigin', 'anonymous');
   
    muralBackground.onload = this.drawImage(context, muralBackground, row*height, col*width, width, height);
  }
  
	drawImage(ctx, img, x, y, width, height) {
		return () => {
			ctx.drawImage(img, x * width, y * height, width, height);
		};
  }

  makeBackgroundMural() {
    var param = {"background": "url(" + this.backgroundImage.src + ")"}
    return param
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
        url: downloadURL
      }).then(() => {
        var stringProp = prop.slice(1, prop.length-1)
        var coorindates = stringProp.split(', ')
        self.addImage(downloadURL, self.imageWidth, self.imageWidth, Number(coorindates[0]), Number(coorindates[1]))
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
          this.URLList.push({url: downloadURL, prop: prop})
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
      
      processNewImage(uploadImageCounter, totalLength)
    }
    //window.location.reload(true);
  }

  resetPage() {
    this.getAllImages(true)
    this.totalCounted = 0;
    this.purchasingTiles = false;
    this.selectedImages = {};
    this.$store.state.tilesWereBought = false;
  }

  createMural() {
    console.log('creating')
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    
    canvas.toBlob(function(blob){
      firebase.storage.ref('Mural1.jpg').put(blob);
    });
  }
  
	exportImage() {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.addImage('https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/105052541-Gender_pay_gap_chart_16x9.jpg?alt=media&token=02fe0cd5-81c6-4907-bb4e-09dcb96bb053', 50, 50, 10, 10)
		var image = canvas.toDataURL("image/jpg");
    var otherImage = document.getElementById("download") as HTMLLinkElement
    otherImage.href = image;
  }

  setBackground(row: number, col: number) {
    var newImage = 0
    var url = this.gridMatrix['(' + String(row) + ', ' + String(col) + ')']
    var param = {
      "background-image": "url(" + String(url) + ")",
      "background-size": "100% 100%",
      "width": String(800/this.gridCols)+"px",
      "height": String(800/this.gridCols)+"px"
    }

    if (!url) {
      param["background-image"] = "none"
    }
    if (!url && this.clickedList['(' + String(row) + ', ' + String(col) + ')'] == 1) {
      var clickedParam = {
        "background-image": "url(" + String(url) + ")",
        "background-color": "#cceeff",
        "width": String(800/this.gridCols)+"px",
        "height": String(800/this.gridCols)+"px",
        "background-size": "100% 100%",
      }
      return clickedParam
    }
    return param
  }

  purchase() {
    this.purchasingTiles = true;
    this.$store.state.totalCounted = this.totalCounted
    this.$store.state.userPurchasedTiles = Object.keys(this.clickedList)
    //this.images[0] = this.mergeAllNewFiles()
    this.$modal.show('signIn');
  }
};

</script>

<style scoped>
.home {
  font-family: 'Nunito', sans-serif;
  min-height: 800px;
}
.mural-title, .mural-subtitle {
  width: 100%;
  text-align: center;
  padding: 0.5em;
  color: #2c3e50;
}
.mural-title {
  font-weight: bold;
}
.mural-subtitle {
  font-size: 1vw;
  font-style: italic;
}
.background-img {
  width: 800px;
  height: 600px;
  /*margin-left: calc(50% - 400px;)*/
}
#canvas {
    position: absolute;
    top: 400px;
    left: calc(50% - 400px);
}
.grid-container {
  position: absolute;
  top: 391px;
  left: calc(50% - 409px);
  z-index: 10;
}
.square-card {
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgb(255, 255, 255, 0);
}
.square-card:hover {
  background-color: #cceeff;
}
.col {
  flex-grow: 0;
}
footer {
  border: solid 2px lightslategrey;
  margin-top: 700px;
  background: lightslategrey;
}
.warning-text {
  margin: 1em calc(50% - 400px) 1em calc(50% - 400px);
  text-align: center;
  padding: 0.25em;
  border: 2px solid darkred;
  width: 800px;
  border-radius: 5px;
}
.purchase-text {
  margin-top: 600px;
  text-align: center;
}
#form-input {
  width: 800px;
  margin-left: calc(50% - 400px);
  margin-right: calc(50% - 400px);
}
button {
  margin: 1em calc(50% - 400px) 1em calc(50% - 400px);
  /*margin-left: calc(50% - 375px);*/
  width: 800px;
}
</style>