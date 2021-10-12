import Cookies from 'js-cookie'

interface userState {
  token?: string
}

const state: userState = {
  token: <string>Cookies.get('token'),
}

const mutations = {
  SET_TOKEN: (state: userState, token: string) => {
    state.token = token
  },
}

const actions = {
  setToken(context: any, token: string) {
    context.commit('SET_TOKEN', token)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
