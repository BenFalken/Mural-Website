(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0e10f":function(t,e,s){},"279e":function(t,e,s){},"4c38":function(t,e,s){"use strict";var a=s("a3c9"),o=s.n(a);o.a},"7c5a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"content"},[t._m(0),s("div",{attrs:{id:"background-img"}},[s("v-container",{staticClass:"grid-container",style:t.checkPurchase()},t._l(t.gridRows,(function(e){return s("v-row",{key:e,attrs:{"no-gutters":""}},[t._l(t.gridCols,(function(a){return[s("v-hover",{key:a},[s("v-col",[s("v-card",{staticClass:"square-card",style:t.setBackground(e,a),attrs:{elevation:"0",outlined:""},on:{click:function(s){return t.addTile(e,a)}}})],1)],1)]}))],2)})),1),s("canvas",{staticStyle:{border:"solid"},style:t.checkPurchase(),attrs:{id:"canvas",width:"800",height:"600"}}),1==t.$store.getters.returnIfTilesBought?s("h2",{staticClass:"warning-text"},[t._v("At this stage, "),s("b",[t._v("don't")]),t._v(" close or refresh this page till all your tiles have been uploaded. "),s("br"),t._v(" They will "),s("b",[t._v("not")]),t._v(" be saved.")]):t._e(),0==t.totalCounted?s("p",{staticClass:"purchase-text"},[t._v("Select any free tiles!")]):t._e(),t.totalCounted>0&&0==t.$store.getters.returnIfTilesBought?s("p",{staticClass:"purchase-text"},[t._v("You have "+t._s(t.totalCounted)+" tiles in your cart.")]):t._e(),1==t.$store.getters.returnIfTilesBought?s("div",{staticClass:"allTiles-container"},t._l(Object.keys(t.clickedList),(function(e){return s("div",{key:e,staticClass:"custom-file",attrs:{id:"form-input"}},[0==t.selectedImages.hasOwnProperty(e)?s("label",{staticClass:"custom-file-label",attrs:{for:"customFile"}},[t._v("Tile at "+t._s(e))]):t._e(),1==t.selectedImages.hasOwnProperty(e)?s("label",{staticClass:"custom-file-label",attrs:{for:"customFile"}},[t._v("Tile at "+t._s(e)+": "+t._s(t.selectedImages[e].name))]):t._e(),s("input",{staticClass:"custom-file-input",attrs:{type:"file",accept:"image/*"},on:{change:function(s){return t.fileSelected(s.target.files[0],e)}}})])})),0):t._e(),s("modal",{attrs:{name:"signIn",height:400}},[s("SignIn")],1),s("modal",{attrs:{name:"loading"}},[s("Loading")],1),s("modal",{attrs:{name:"congratulations",height:400}},[s("Congratulations")],1),1==t.$store.getters.returnIfTilesBought?s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.fileUpload()}}},[t._v("UPLOAD")]):t._e(),0==t.$store.getters.returnIfTilesBought?s("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(e){return t.purchase()}}},[t._v("Purchase Tiles?")]):t._e()],1),s("a",{attrs:{id:"download",download:"export.jpg",href:""},on:{click:function(e){return t.exportImage(this)}}},[t._v("Download to image.jpg")])])])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"titles"},[s("h1",{staticClass:"mural-title"},[t._v("Add onto the mural!")]),s("h2",{staticClass:"mural-subtitle"},[t._v("Click on any available tiles to purchase for a small fee, and help out Los Altos businesses.")])])}],i=s("9ab4"),n=s("60a3"),r=s("677f"),l=s("3a5e"),c=s("728a"),u=s("fd2d"),d=s("526b"),h=(s("0808"),s("4627")),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.name="Home",e.gridMatrix={},e.imageList=[],e.gridRows=30,e.gridCols=40,e.imageWidth=20,e.backgroundWidth=800,e.images=[],e.selectedImages={},e.clickedList={},e.totalCounted=0,e.purchasingTiles=!1,e.URLList=[],e.muralURL="https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/Mural1.jpg?alt=media&token=bb810e89-ded3-4d26-be9b-2a1b0cb1623d",e}return Object(i["__extends"])(e,t),e.prototype.mounted=function(){this.addImage(this.muralURL,this.backgroundWidth,this.backgroundWidth*this.gridRows/this.gridCols,0,0),this.$store.state.tilesWereBought=!1,this.getAllImages(!1),this.fillGridMatrix()},e.prototype.getAllImages=function(t){var e=this,s=d["a"].db.collection("grids");s.get().then((function(s){s.forEach((function(t){""==t.data().url?d["a"].storage.ref(t.data().name).getDownloadURL().then((function(s){var a=d["a"].db.collection("grids").doc(t.id);a.update({url:s}),e.gridMatrix[t.data().coordinates]=s})):e.gridMatrix[t.data().coordinates]=t.data().url})),1==t&&e.createMural()}))},e.prototype.checkPurchase=function(){if(1==this.purchasingTiles){var t={visibility:"hidden"};return t}},e.prototype.fillGridMatrix=function(){for(var t=0;t<this.gridRows;t++)for(var e=0;e<this.gridCols;e++){var s=String("("+t+", "+e+")");this.gridMatrix[s]=0}},e.prototype.addImage=function(t,e,s,a,o){var i=document.getElementById("canvas"),n=i.getContext("2d"),r=new Image;r.src=t,console.log(e,s),console.log(a*s,o*e),r.setAttribute("crossorigin","anonymous"),r.onload=this.drawImage(n,r,a*s,o*e,e,s)},e.prototype.drawImage=function(t,e,s,a,o,i){return function(){t.drawImage(e,s*o,a*i,o,i)}},e.prototype.makeBackgroundMural=function(){var t={background:"url("+this.backgroundImage.src+")"};return t},e.prototype.addTile=function(t,e){if(0==this.$store.getters.returnIfTilesBought){var s="("+String(t)+", "+String(e)+")";1==this.clickedList[s]||this.gridMatrix[s]?this.gridMatrix[s]?delete this.clickedList[s]:(delete this.clickedList[s],this.totalCounted=this.totalCounted-1):(this.clickedList[s]=1,this.totalCounted=this.totalCounted+1);var a=this.gridRows;this.gridRows=0,this.gridRows=a}else alert("Forbidden to select")},e.prototype.fileSelected=function(t,e){return Object(i["__awaiter"])(this,void 0,void 0,(function(){var s,a,o,n;return Object(i["__generator"])(this,(function(i){switch(i.label){case 0:console.log("Size 1 "+t.size),s={maxSizeMB:1,maxWidthOrHeight:50,useWebWorker:!0},i.label=1;case 1:return i.trys.push([1,3,,4]),[4,Object(h["a"])(t,s)];case 2:return a=i.sent(),console.log("compressedFile instanceof Blob",a instanceof Blob),console.log("compressedFile size "+a.size/1024/1024+" MB"),console.log("Size 2 "+a.size),this.selectedImages[e]=a,o=this.clickedList,this.clickedList=[],this.clickedList=o,[3,4];case 3:return n=i.sent(),console.log(n),[3,4];case 4:return[2]}}))}))},e.prototype.fileUpload=function(){var t=this;function e(e,a,o,n){console.log(o+" "+e+" "+a);var r=d["a"].db.collection("grids"),l=r.doc(a);l.update({name:i.name,url:e}).then((function(){var i=a.slice(1,a.length-1),r=i.split(", ");t.addImage(e,t.imageWidth,t.imageWidth,Number(r[0]),Number(r[1])),o==Object.keys(t.selectedImages).length-1&&t.resetPage(),s(Number(o+1),n)}))}function s(s,a){var o=Object.keys(t.selectedImages)[s],i=t.selectedImages[o],n=d["a"].storage.ref(i.name).put(i);n.on("state_changed",(function(t){var e=t.bytesTransferred/t.totalBytes*100;console.log("Upload is "+e+"% done")}),(function(t){console.log("Error loading")}),(function(){n.snapshot.ref.getDownloadURL().then((function(t){e(t,o,s,a),this.URLList.push({url:t,prop:o})}))}))}var a=!0;try{for(var o in this.selectedImages){var i=this.selectedImages[o];console.log(i.Dimensions);var n=i.type.split("/"),r=n[1];if(console.log(r),"JPG"!=r.toUpperCase()&&"JPEG"!=r.toUpperCase()&&"PNG"!=r.toUpperCase()){if(i.name){alert("Invalid files. Must be png or jpg."),a=!1;break}alert("Invalid files. Must be png or jpg."),a=!1;break}}}catch(u){alert("Unknown error. Try again!"),a=!1}if(1==a){console.log(this.selectedImages);var l=0,c=Object.keys(this.selectedImages).length;s(l,c)}},e.prototype.resetPage=function(){this.getAllImages(!0),this.totalCounted=0,this.purchasingTiles=!1,this.selectedImages={},this.$store.state.tilesWereBought=!1},e.prototype.createMural=function(){console.log("creating");var t=document.getElementById("canvas");t.toBlob((function(t){d["a"].storage.ref("Mural1.jpg").put(t)}))},e.prototype.exportImage=function(){var t=document.getElementById("canvas");this.addImage("https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/105052541-Gender_pay_gap_chart_16x9.jpg?alt=media&token=02fe0cd5-81c6-4907-bb4e-09dcb96bb053",50,50,10,10);var e=t.toDataURL("image/jpg"),s=document.getElementById("download");s.href=e},e.prototype.setBackground=function(t,e){var s=this.gridMatrix["("+String(t)+", "+String(e)+")"],a={"background-image":"url("+String(s)+")","background-size":"100% 100%",width:String(800/this.gridCols)+"px",height:String(800/this.gridCols)+"px"};if(s||(a["background-image"]="none"),!s&&1==this.clickedList["("+String(t)+", "+String(e)+")"]){var o={"background-image":"url("+String(s)+")","background-color":"#cceeff",width:String(800/this.gridCols)+"px",height:String(800/this.gridCols)+"px","background-size":"100% 100%"};return o}return a},e.prototype.purchase=function(){this.purchasingTiles=!0,this.$store.state.totalCounted=this.totalCounted,this.$store.state.userPurchasedTiles=Object.keys(this.clickedList),this.$modal.show("signIn")},e=Object(i["__decorate"])([Object(n["a"])({components:{SignIn:r["a"],Loading:l["a"],Congratulations:c["a"],Footer:u["a"]}})],e),e}(n["b"]),p=g,m=p,f=(s("4c38"),s("2877")),b=s("6544"),v=s.n(b),y=s("b0af"),_=s("62ad"),w=s("a523"),k=s("ce87"),C=s("0fd9"),I=Object(f["a"])(m,a,o,!1,null,"4250e090",null);e["default"]=I.exports;v()(I,{VCard:y["a"],VCol:_["a"],VContainer:w["a"],VHover:k["a"],VRow:C["a"]})},"840f":function(t,e,s){"use strict";var a=s("0e10f"),o=s.n(a);o.a},a3c9:function(t,e,s){},a72b:function(t,e,s){"use strict";var a=s("279e"),o=s.n(a);o.a},f820:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"about"},[s("h1",[t._v("Los Altos Digital Mural")]),s("modal",{attrs:{name:"businessInfo",height:600}},[s("BusinessInfo")],1),s("div",{staticClass:"all-info"},[s("div",{staticClass:"intro-div"},[s("ion-icon",{attrs:{name:"image"}}),s("h2",[t._v('What is this "digital mural?"')]),s("p",[t._v(" This digital mural - created by and for people from Los Altos and the Bay Area - was born with the intent to raise money for small businesses in our local community. We're working with the Los Altos Public Arts Commission, Art Sprouts, and other partners to help make projects like this happen! ")])],1),s("div",{staticClass:"help-div"},[s("ion-icon",{attrs:{name:"people-circle"}}),s("h2",[t._v("How do I contribute?")]),s("p",[t._v(' It\'s quite easy to pitch in with this project! Simply go to our fiscal host ("Give" button) and donate just 1 dollar per 50x50 pixel square you would like to develop. From there, take the following steps: ')]),s("p",[t._v(" 1. Log onto our site with the username and email you used to log onto our opencollective fiscal host. It will verify your donation so you can secure your purchase! ")]),s("p",[t._v(" 2. Upload images immediately. They can be anything you like: photographs, sketches, paintings... the list goes on! We encourage work that helps to build a tapestry/story of what life in Los Altos has been like during the pandemic. Artists and non-artists are all encouraged to contribute. Every piece of work counts! ")]),s("p",[t._v(" 3. Submit. Click, upload and wait a few seconds for the new mural to be created; the process takes time, so please do not close or reload the page. Once the mural is finished (estimated time displayed), you will receive the latest version of the mural in downloads. ")])],1),s("div",{staticClass:"FAQ-div"},[s("ion-icon",{attrs:{name:"help-circle"}}),s("h2",[t._v("FAQs")]),t._m(0)],1)])],1)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"question-container"},[s("div",{staticClass:"question"},[s("h3",[t._v("I'm an independent artist. How does this help me?")]),s("p",[t._v(" This digital mural provides a large audience for galleries and artists publicize to, all of whom love art and community. You may insert links in the mural below, so that if any prospective buyers click on your work, they will be navigated to your site! ")])]),s("div",{staticClass:"question"},[s("h3",[t._v("What types of images can I upload?")]),s("p",[t._v("Any file is valid (png, jpg, etc) as long as it's an image! All sizes up to 1MB are also valid. However, keep in mind that we will be square-ifying all uploaded images, reducing them to a 50x50 format. That means your files will be stretched and reduced as necessary. It you'd like more pixel space, feel free to buy more parcels to make a more complete piece! ")])]),s("div",{staticClass:"question"},[s("h3",[t._v("Do I have to donate to contribute?")]),s("p",[t._v("We've made our parcels as accessible as possible to harness the collective power of countless artists and individuals in the Bay Area. If you want to contribute but feel you can't under the current circumstances, please reach out to us and we'll do our best to accomodate you! ")])]),s("div",{staticClass:"question"},[s("h3",[t._v("I can't buy any more parcels!")]),s("p",[t._v('If you\'ve run out of parcels to purchase, click on the "donate" button at the top of our page to buy more squares for $1.00 each. Once the database updates, you should be all set to go! ')])]),s("div",{staticClass:"question"},[s("h3",[t._v("I had an error when verifying my account")]),s("p",[t._v("Please let us know if you've encountered an unknown error! We want to make sure everything works smoothly and everyone has an equal chance to contribute. Our email is hello@baeinitiative.org ")])]),s("div",{staticClass:"question"},[s("h3",[t._v("I reloaded/exited the page while uploading my photos. What now?")]),s("p",[t._v("If you close or refresh the page, your parcels will be lost to you. They will appear on the mural as fillers, and we keep a record of who purchases what. Please reach out to us, if possible, with the email you used to log into our site so we can verify you in our system. Email us your images so we can add them! ")])])])}],i=s("9ab4"),n=s("60a3"),r=s("fd2d"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"congrats-message"},[s("h1",[t._v("Businesses Need You.")]),t._m(0),t._m(1),t._m(2),s("button",{staticClass:"btn btn-light",attrs:{type:"button",id:"cancel-button"},on:{click:function(e){return t.exit()}}},[t._v("Exit")])])},c=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cropped"},[s("img",{attrs:{src:"https://downtownlosaltos.org/wp-content/uploads/2018/08/Cable-Car3.jpg"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"resources"},[s("a",{staticClass:"left-button",attrs:{href:"https://www.losaltoschamber.org/"}},[s("button",{staticClass:"btn btn-primary"},[s("b",[t._v("More on Los Altos Businesses")])])]),s("a",{staticClass:"right-button",attrs:{href:"https://whatsopenlosaltos.org"}},[s("button",{staticClass:"btn btn-primary"},[s("b",[t._v("Open in Los Altos")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"resources"},[s("a",{staticClass:"left-button",attrs:{href:"http://chambermv.org/"}},[s("button",{staticClass:"btn btn-primary"},[s("b",[t._v("More on MV Businesses")])])]),s("a",{staticClass:"right-button",attrs:{href:"http://whatsopen.in/mountain_view/"}},[s("button",{staticClass:"btn btn-primary"},[s("b",[t._v("Open in Mountain View")])])])])}],u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(i["__extends"])(e,t),e.prototype.exit=function(){this.$modal.hide("businessInfo")},e=Object(i["__decorate"])([n["a"]],e),e}(n["b"]),d=u,h=d,g=(s("a72b"),s("2877")),p=Object(g["a"])(h,l,c,!1,null,"194469bc",null),m=p.exports,f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(i["__extends"])(e,t),e.prototype.mounted=function(){this.$modal.show("businessInfo")},e=Object(i["__decorate"])([Object(n["a"])({components:{Footer:r["a"],BusinessInfo:m}})],e),e}(n["b"]),b=f,v=b,y=(s("840f"),Object(g["a"])(v,a,o,!1,null,"4eed7e05",null));e["default"]=y.exports}}]);
//# sourceMappingURL=about.bbcf6338.js.map