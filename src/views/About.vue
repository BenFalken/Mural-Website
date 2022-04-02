<template>
  <div class="about">
    <h1>Los Altos Digital Mural</h1>
    <modal name="businessInfo" :height="600">
      <BusinessInfo />
    </modal>
    <div class="all-info">
      <div class="intro-div">
        <ion-icon name="image"></ion-icon>
        <h2>What is this "digital mural?"</h2>
        <p>
          This digital mural - created by students in Los Altos CA -
          was made with the goal to raise money for small businesses in our local community.
          We want to assist not only the victims of COVID and high rents, but also the victims 
          of fires in Santa Cruz and the East Bay.
        </p>
      </div>
      <div class="help-div">
        <ion-icon name="people-circle"></ion-icon>
        <h2>How do I contribute?</h2>
        <p>
          It's quite easy to pitch in with this project! Simply go to our fiscal host ("Give" button) and donate
          just 1 dollar per 50x50 pixel square you would like to develop. From there, take the following steps:
        </p>
        <p>
          1. Log onto our site with the username and email you used to log onto our opencollective
          fiscal host. It will verify your donation so you can secure your purchase!
        </p>
        <p>
          2. Upload images immediately. They can be anything you like: photographs, sketches,
          paintings... the list goes on! We encourage work that helps to build a tapestry/story of what
          life in the Bay Area has been like during the pandemic. Artists and non-artists are all encouraged
          to contribute. Every piece of work counts!
        </p>
        <p>
          3. Submit. Click, upload and wait a few seconds for the new mural to be created; the process takes 
          time, so please do not close or reload the page. Once the mural is finished
          (estimated time displayed), you will receive the latest version of the mural in downloads.
        </p>
      </div>
      <div class="FAQ-div">
        <ion-icon name="help-circle"></ion-icon>
        <h2>FAQs</h2>
        <div class="question-container">
          <div class="question">
            <h3>I'm an business owner/artist. How does this help me?</h3>
            <p>
              Not only is this mural a tapestry - it is also a place for people to find resources. By hovering over
              a picture/tile, users can navigate to links or gofundmes that spread awareness..
            </p>
          </div>
          <div class="question">
            <h3>What types of images can I upload?</h3>
            <p>Any file is valid (png, jpg, etc) as long as it's an image! All sizes up to 1MB are also valid.
              However, keep in mind that we will be square-ifying all uploaded images, reducing them to a 
              50x50 format. That means your files will be stretched and reduced as necessary. It you'd like more
              pixel space, feel free to buy more tiles to make a more complete piece!
            </p>
          </div>
          <div class="question">
            <h3>What types of images can I upload?</h3>
            <p>Any file is valid (png, jpg, etc) as long as it's an image! All sizes up to 1MB are also valid.
              However, keep in mind that we will be square-ifying all uploaded images, reducing them to a 
              50x50 format. That means your files will be stretched and reduced as necessary. It you'd like more
              pixel space, feel free to buy more tiles to make a more complete piece!
            </p>
          </div>
          <div class="question">
            <h3>Do I have to donate to contribute?</h3>
            <p>We've made our tiles as accessible as possible to harness the collective power
              of countless artists and individuals in the Bay Area. If you want to contribute but
              feel you can't under the current circumstances, please reach out to us and we'll do our
              best to accomodate you!
            </p>
          </div>
          <div class="question">
            <h3>I can't get any more tiles!</h3>
            <p>If you've run out of tiles to purchase, click on the "donate" button at the top
              of our page to buy more squares for $1.00 each. Once the database updates, you should be all
              set to go!
            </p>
          </div>
          <div class="question">
            <h3>I had an error when verifying my account</h3>
            <p>Please let us know if you've encountered an unknown error! We want to make sure everything
              works smoothly and everyone has an equal chance to contribute. Our email is hello@baeinitiative.org
            </p>
          </div>
          <div class="question">
            <h3>I reloaded/exited the page while uploading my photos. What now?</h3>
            <p>If you close or refresh the page, your tiles will be lost to you. They 
              will appear on the mural as fillers, and we keep a record of who purchases 
              what. Please reach out to us, if possible, with the email you used to 
              log into our site so we can verify you in our system. Email us your images so we can
              add them!
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--footer>
      <Footer />
    </footer-->
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue'
import BusinessInfo from '@/components/BusinessInfo.vue'

@Component({
  components: {
    Footer,
    BusinessInfo
  }
})

export default class About extends Vue {
  mounted() {
    this.$modal.show("businessInfo")
  }
}
</script>

<style scoped>
.about {
  font-family: 'Nunito', sans-serif;
  text-align: center;
  color: #2c3e50;
}
h1 {
  padding: 1em;
  font-weight: bold;
  font-size: 35px;
}
h2, p {
  padding-left: 15%;
  padding-right: 15%;
}
h2 {
  font-weight: bold;
}
p {
  font-size: 13px;
  margin-top: 2em;
  margin-bottom: 2em;
}
footer {
  min-height: 200px;
  background: lightslategrey;
}
.intro-div, .help-div, .FAQ-div {
  margin-right: 10%;
  margin-left: 10%;
}
ion-icon {
  font-size: 80px;
}
.intro-div, .help-div, .FAQ-div {
  padding-top: 2em;
  border-top: 2px lightslategrey solid;
}
.FAQ-div h2{
  margin-bottom: 1em;
}
</style>