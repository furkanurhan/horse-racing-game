import { createStore } from 'vuex'
import racingModule from './modules/racing.js'

export default createStore({
  modules: {
    racing: racingModule
  }
})
