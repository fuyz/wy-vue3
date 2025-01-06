import { ActionContext } from 'vuex'
import { RecipeState } from '@/types/index'

const state = {
  recipeFilterParams: {}
}

const mutations = {
  updateRecipeParams (state: RecipeState, params: any) {
    state.recipeFilterParams = Object.assign({}, state.recipeFilterParams, params)
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
