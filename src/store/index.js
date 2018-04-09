import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {

  // PopForm
  popForm: {
    isShow: false,
    formName: "LogIn"
  },

  // Notification
  notification: {
    isShow: false,
    title: "",
    description: "",
  },

  // UserInfo
  isLogIn: false,
  userInfo: {
    name: "Clapeysron",
    rank: "5",
    score: 8250,
  },

  // challenges
  challenges: [

  ],

  // scoreboard
  ranks: [

  ],

  // about & news
  announcements: [

  ],
}

const getters = {

}

export default new Vuex.Store({
  state,
  getters,
	actions,
	mutations
})
