const state = {
  catchPages: [],
}
const mutations = {
  SET_CATCHPAGES(state, pageName) {
    state.catchPages.push(pageName)
  },
}
const actions = {
  setCatchPages({ commit }, name) {
    commit('SET_CATCHPAGES', name)
  },
}
export default {
  state,
  mutations,
  actions
}
