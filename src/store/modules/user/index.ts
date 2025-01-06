// import { ActionContext } from 'vuex'
import { UserState } from '@/types/index'

const state = {
  userInfo: {},
  userPositions: {},
  curUserPositions: {},
  menuList: []
}

const mutations = {
  updateUserInfo (state: UserState, params: any) {
    state.userInfo = params.userInfo
    state.curUserPositions = params.curUserPositions
    state.userPositions = params.userPositions
    state.menuList = params.menuList
  }
}

const actions = {
  // async userInfo ({ commit }: ActionContext<UserState, unknown>) {
  //   try {
  //     const { data } = await apiGetPersonInfo({ platformType: '' })
  //     commit('updateUserInfo', data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
