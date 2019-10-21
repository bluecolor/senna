import _ from 'lodash'
import api from '@/api/connection'

const CREATE = 'CREATE'
const SET_ALL = 'SET_ALL'
const DESTROY = 'DESTROY'
const UPDATE = 'UPDATE'

const state = {
  connections: []
}

const getters = {
  connections: state => state.connections
}

const actions = {
  async test ({ commit }, payload) {
    return api.test(payload)
  },
  findAll ({ commit }) {
    commit(SET_ALL, api.findAll())
  },
  create ({ commit }, payload) {
    const connection = api.create(payload)
    commit(CREATE, connection)
  },
  update ({ commit }, payload) {
    api.update(payload)
    commit(UPDATE, payload)
    return payload
  },
  destroy ({ commit }, id) {
    api.destroy(id)
    commit(DESTROY, id)
    return id
  }
}

const mutations = {
  [SET_ALL] (state, data) {
    state.connections = data
  },
  [CREATE] (state, data) {
    state.connections.push(data)
  },
  [DESTROY] (state, id) {
    const i = _.findIndex(state.connections, { id })
    state.connections.splice(i, 1)
  },
  [UPDATE] (state, data) {
    const { id } = data
    const i = _.findIndex(state.connections, { id })
    state.connections.splice(i, 1, data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
