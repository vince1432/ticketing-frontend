import { createStore } from 'vuex'
import vuexPersister from '../utils/vuexPersister'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

const store = createStore({
  state,
  actions,
  mutations,
  getters,
	plugins: [vuexPersister.persist]
})

export default store
