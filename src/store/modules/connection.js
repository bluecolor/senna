// import _ from 'lodash'
import api from '@/api/connection'

const CREATE_CONNECTION = 'CREATE_CONNECTION'
const SET_ALL = 'SET_ALL'

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
    api.create(payload)
    commit(CREATE_CONNECTION, payload)
  }
}

const mutations = {
  [SET_ALL] (state, data) {
    state.connections = data
  },
  [CREATE_CONNECTION] (state, data) {
    state.connections.push(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
