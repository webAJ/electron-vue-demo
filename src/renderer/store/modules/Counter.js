import axios from 'axios'
const state = {
  tabs:[],
  female:[],
  TiId:''
}

const getters = {
  
}

const mutations = {
  // 排行榜
  tabs(state,data){
    state.tabs = data
  },
  female(state,data){
    state.female = data
  },
  TiId(state,data){
    state.TiId = data
  }
}

const actions = {
  // 排行榜
  ClassList({commit}){
    axios(`http://api.zhuishushenqi.com/ranking/gender`)
    .then(data =>{
      console.log(data.data.male)
      commit('tabs',data.data.male)
      commit('female',data.data.female)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
