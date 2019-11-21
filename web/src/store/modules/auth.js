import matchaAPI from "../../services/matcha-api";

const state = {
  me: {
    infos: null,
    likedBy: null,
    seenBy: null,
    contacts: null
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
    const { data: dataLikes } = await matchaAPI.getMyLikes();
    const { data: dataViews } = await matchaAPI.getMyViews();
    commit("setLikedBy", dataLikes.likes);
    commit("setSeenBy", dataViews.views);
  },
  async fetchMyContacts({ commit }) {
    const { data } = await matchaAPI.getMyContacts();
    commit("setContacts", data.contacts);
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
  },
  setContacts(state, contacts) {
    state.me.contacts = contacts;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
