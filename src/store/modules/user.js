const state = {
  userName: undefined,
  // userAccount: undefined,
  userAccount: 111,
  userCode: undefined,
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_USER_ACCOUNT(state, account) {
    state.userAccount = account
  },
  SET_USER_CODE(state, code) {
    state.userCode = code
  },
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  // 设置英文code
  setUserAccount({ commit }, account) {
    commit('SET_USER_ACCOUNT', account)
  },
  // 设置code
  setUserCode({ commit }, code) {
    commit('SET_USER_CODE', code)
  },
}
export default {
  state,
  mutations,
  actions
}
