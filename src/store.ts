import Vue from 'vue';
import Vuex from 'vuex';
import Kanmusu from '@/store/kanmusu';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    status: {
      unExists: 0,
      unRemodeled: 1,
      done: 2,
    },
    kanmusu: [
      {
        id : '185',
        name : '龍鳳',
        phonetic : 'りゅうほう',
        shiptype : 'CVL',
        level : 25,
        sekkeizu : 1,
        catapult : 0,
        sentoushouhou : 0,
        koukushizai : 0,
        houkoushizai : 0,
        kaihatsushizai : 0,
        status : 0,
        },
    ],
  },
  getters: {
    getKanmusuById: (state) => (id: string) => {
      return state.kanmusu.filter((e) => e.id === id);
    },
    getKanmusuByStatus: (state) => (status: number) => {
      return state.kanmusu.filter((e) => e.status === status);
    },
  },
  mutations: {
    changeStatus: (state, target) => {
      const status: number = parseInt(target.status, 0);
      state.kanmusu.filter((e) => e.id === target.id)[0].status = status;
    },
  },
  actions: {},
});
