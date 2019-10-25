import _ from 'lodash'

const OPEN_CONNECTION = 'OPEN_CONNECTION'
const SET_ACTIVE_CONNECTION = 'SET_ACTIVE_CONNECTION'

const state = {
  activeConnection: undefined,
  openConnections: []
}

const getters = {
  activeConnection: state => state.activeConnection,
  openConnections: state => state.openConnections
}

const actions = {
  openConnection ({ commit, state }, id) {
    if (id === state.activeConnection) {
      return
    }
    if (_.chain(state.openConnections).find({ id }).isEmpty().value()) {
      commit(OPEN_CONNECTION, id)
      commit(SET_ACTIVE_CONNECTION, id)
    } else {
      commit(SET_ACTIVE_CONNECTION, id)
    }
  }
}

const mutations = {
  [OPEN_CONNECTION] (state, id) {
    let connection = {
      id,
      tabs: [{
        title: 'Tab 1'
      }]
    }
    state.openConnections.push(connection)
  },
  [SET_ACTIVE_CONNECTION] (state, id) {
    state.activeConnection = id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
