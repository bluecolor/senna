const shortid = require('shortid')
import _ from 'lodash'

const OPEN_CONNECTION = 'OPEN_CONNECTION'
const SET_ACTIVE_CONNECTION = 'SET_ACTIVE_CONNECTION'
const NEW_TAB = 'NEW_TAB'

const state = {
  connections: []
}

const getters = {
  activeConnection: state => {
    return _.find(state.connections, { active: true })
  },
  connections: state => state.connections
}

const actions = {
  newTab ({ commit }) {
    const id = shortid.generate()
    commit(NEW_TAB, id)
    return id
  },
  openConnection ({ commit, state }, id) {
    if (_.chain(state.connections).find({ id }).isEmpty().value()) {
      commit(OPEN_CONNECTION, id)
      commit(SET_ACTIVE_CONNECTION, id)
    } else {
      commit(SET_ACTIVE_CONNECTION, id)
    }
  }
}

const mutations = {
  [NEW_TAB] (state, id) {
    let connection = _.find(state.connections, { active: true })
    let tabs = _.map(connection.tabs, tab => {
      tab.active = false
      return tab
    })

    tabs.push({
      id,
      title: 'New tab',
      active: true,
      viewState: undefined,
      model: undefined
    })
    connection.tabs = tabs
  },
  [OPEN_CONNECTION] (state, id) {
    let connection = {
      id,
      tabs: [{
        id: shortid.generate(),
        title: 'Tab 1',
        active: true,
        viewState: undefined,
        model: undefined
      }]
    }
    state.connections.push(connection)
  },
  [SET_ACTIVE_CONNECTION] (state, id) {
    state.connections = _.map(state.connections, connection => {
      connection.active = (connection.id === id)
      return connection
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
