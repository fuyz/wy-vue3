// import { ActionContext } from 'vuex'
import { UserState } from '@/types/index'

const state = {
  newsDataMap: {},
  newsDetail_DATA: {},
  video_DATA: {},
  Position: {}
}

const mutations = {
  setData (state, obj) {
    console.log(['存储数据', obj])
    if (obj.type == 'news') {
      state.news_DATA[obj.title] = obj.data;
      // state.Position[obj.title] = obj.position;
    } else if (obj.type == 'video') {
      state.video_DATA[obj.title] = obj.data;
    } else if (obj.type == 'newsDetail') {
      state.newsDetail_DATA[obj.title] = obj.data;
    }

    // if(obj.type == 'position'){
    //   state.Position[obj.title] = obj.position;
    // }
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
