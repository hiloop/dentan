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
        id : '341',
        name : '長門改二',
        phonetic : 'ながとかいに',
        level: 88,
        sekkeizu : 1,
        catapult : 0,
        sentoushouhou : 0,
        kaihatsusizai : 0,
        koukusizai : 0,
        status : 0,
      },
      {
        id : '404',
        name : '赤城改二',
        phonetic : 'あかぎかいに',
        level: 90,
        sekkeizu : 2,
        catapult : 1,
        sentoushouhou : 1,
        kaihatsusizai : 100,
        koukusizai : 2,
        status : 0,
      },
      {
        id : '405',
        name : '赤城改二2',
        phonetic : 'あかぎかいに',
        level: 90,
        sekkeizu : 2,
        catapult : 1,
        sentoushouhou : 1,
        kaihatsusizai : 100,
        koukusizai : 2,
        status : 0,
      },
      {
        id : '406',
        name : '赤城改二3',
        phonetic : 'あかぎかいに',
        level: 90,
        sekkeizu : 2,
        catapult : 1,
        sentoushouhou : 1,
        kaihatsusizai : 100,
        koukusizai : 2,
        status : 0,
      },
      {
        id : '407',
        name : '赤城改二4',
        phonetic : 'あかぎかいに',
        level: 90,
        sekkeizu : 2,
        catapult : 1,
        sentoushouhou : 1,
        kaihatsusizai : 100,
        koukusizai : 2,
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
