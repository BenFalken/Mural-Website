<template>
  <v-container>
    <v-row no-gutters v-for="(row, row_idx) in 8" :key="row_idx" justify="center">
      <template v-for="(col, col_idx) in 8">
        <v-hover v-slot:default="{ hover }" :key="col_idx">
          <v-col>
            <v-card
              :class="[{'on-hover': hover}, 
              'square-card', 
              'flex-center']"
              elevation="4"
              outlined
            ></v-card>
          </v-col>
        </v-hover>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  })
</script>
<style lang="scss" scoped>
.square-card {
  height: 2rem;
  width: 2rem;
  background-image: url(https://firebasestorage.googleapis.com/v0/b/bae-initiative.appspot.com/o/1024px-Ingres%2C_Napoleon_on_his_Imperial_throne.jpg?alt=media&token=cdd7ae0b-5eee-413c-9080-7dc47c2ca70b);
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
</style>