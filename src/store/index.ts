import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalCounted: 0,
    tilesWereBought: false,
    userPurchasedTiles: [],
    expectedTimeToFinish: 0
  },
  mutations: {
    updateCount(state, updatedCount) {
      state = updatedCount
    }
  },
  getters: {
    returnTotalCounted: state => {
      return state.totalCounted
    },
    returnIfTilesBought: state => {
      return state.tilesWereBought
    },
    returnUserPurchasedTiles: state => {
      return state.userPurchasedTiles
    },
    returnExpectedTimeToFinish: state => {
      return state.expectedTimeToFinish
    }
  },
  actions: {
  },
  modules: {
  }
})
