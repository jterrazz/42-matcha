import matchaAPI from "../../services/matcha-api";

const state = {
  me: {
    infos: null,
    likedBy: null,
    seenBy: null
  }
};

const getters = {};

const actions = {
  async login({ commit }, { username, password }) {
    const { data: userData } = await matchaAPI.login({ username, password });
    commit("setMeInfos", userData);
  },
  async fetchMeIfNeeded({ state, commit }, forceFetch = false) {
    if (!state.infos || forceFetch) {
      const { data: userData } = await matchaAPI.getMe();
      commit("setMeInfos", userData);
    }
  },
  async fetchMyInteractions({ commit }) {
    // TODO Async together
    const { data: likes } = await matchaAPI.getMyLikes();
    const { data: views } = await matchaAPI.getMyViews();
    commit("setLikedBy", likes);
    commit("setSeenBy", views);
  }
};

const mutations = {
  setMeInfos(state, userData) {
    state.me.infos = userData;
  },
  setLikedBy(state, likes) {
    state.me.likedBy = likes;
  },
  setSeenBy(state, seenBy) {
    state.me.seenBy = seenBy;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
