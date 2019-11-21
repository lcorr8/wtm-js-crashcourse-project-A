/* eslint-disable no-shadow */
import axios from 'axios';

const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const ADD_LIKES = 'ADD_LIKES';
const FETCH_JOB = 'FETCH_JOB';

const state = {
  data: [],
  likes: 0,
  job: {},
};

const mutations = {
  [REQUEST_SUCCESS](state, data) {
    state.data = data;
  },
  [ADD_LIKES](state) {
    // eslint-disable-next-line no-plusplus
    state.likes++;
    // this only saves it to state meaning you lose data upon page reload
    // to persist between reloads you must send request to db
  },
  [FETCH_JOB](state, data) {
    state.job = data;
  },
};

const actions = {
  async fetchJobs({ commit }) {
    const res = await axios.get('http://localhost:3000/job/all/json');
    commit(REQUEST_SUCCESS, res.data);
  },
  async fetchJob({ commit }, id) {
    const res = await axios.get(`http://localhost:3000/job/${id}/json`);

    console.log(res.data);
    commit(FETCH_JOB, res.data);
  },
  addLike({ commit }) {
    commit('ADD_LIKES');
  },
};

export default {
  state,
  mutations,
  actions,
};
