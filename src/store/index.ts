import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    coins: [],
    currentCoin: {},
    mainInfo: [
      {
        id: 1,
        image: "coins.png",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Consequat mauris nunc congue nisi vitae suscipit tellus. Vulputate ut pharetra sit amet. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Mi quis hendrerit dolor magna eget. Sed augue lacus viverra vitae congue eu consequat.",
      },
      {
        id: 2,
        image: "maxGolden.png",
        text: "Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Ut faucibus pulvinar elementum integer enim neque. Etiam erat velit scelerisque in dictum. Mauris rhoncus aenean vel elit. Elementum curabitur vitae nunc sed velit dignissim sodales. Sit amet consectetur adipiscing elit ut aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada. Odio euismod lacinia at quis risus. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Enim facilisis gravida neque convallis a cras semper auctor. Massa sed elementum tempus egestas sed sed.",
      },
      {
        id: 3,
        image: "coins.png",
        text: "Purus viverra accumsan in nisl. Ornare massa eget egestas purus viverra accumsan in. Tellus at urna condimentum mattis pellentesque id nibh. Sed risus pretium quam vulputate dignissim suspendisse. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Tristique senectus et netus et. Diam ut venenatis tellus in metus vulputate eu scelerisque. Volutpat commodo sed egestas egestas fringilla phasellus. Nisi est sit amet facilisis magna etiam tempor orci. Augue interdum velit euismod in pellentesque massa.",
      },
      {
        id: 4,
        image: "coins.png",
        text: "Posuere sollicitudin aliquam ultrices sagittis orci a. Netus et malesuada fames ac turpis egestas integer eget aliquet. Massa tempor nec feugiat nisl pretium. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Senectus et netus et malesuada fames. Lectus mauris ultrices eros in cursus.",
      },
    ],
    siteInfo: {},
    metas: [],
    pages: [],
  },
  getters: {
    COINS(state) {
      return state.coins;
    },
    METAS(state) {
      return state.metas;
    },
  },
  mutations: {
    PUT_COINS_TO_STATE: (state, coins) => {
      if (!state.coins.length) {
        state.coins = coins;
      }
    },
    PUT_CURRENT_COIN_TO_STATE: (state, coin) => {
      state.currentCoin = coin;
    },
    PUT_METAS_TO_STATE: (state, metas) => {
      if (!state.metas.length) {
        state.metas = metas;
      }
    },
    PUT_PAGES_TO_STATE: (state, pages) => {
      if (!state.pages.length) {
        state.pages = pages;
      }
    },
  },
  actions: {
    async GET_COINS_FROM_IP({ commit }) {
      const data = await axios("http://127.0.0.1:8000/api/cards", {
        method: "GET",
      });
      if (data.data) {
        commit("PUT_COINS_TO_STATE", data.data);
      } else {
        console.log(
          "Ошибка: " + "не удалось выполнить запрос, повторите попытку позже."
        );
      }

      return data;
    },
    async GET_COIN_FROM_IP({ commit }, objID) {
      const data = await axios("http://127.0.0.1:8000/api/cards/" + objID.id, {
        method: "GET",
      });
      if (data.data) {
        commit("PUT_CURRENT_COIN_TO_STATE", data.data);
      } else {
        console.log(
          "Ошибка: " + "не удалось выполнить запрос, повторите попытку позже."
        );
      }

      return data;
    },
    async GET_METAS_FROM_IP({ commit }) {
      const data = await axios("http://127.0.0.1:8000/api/metas", {
        method: "GET",
      });
      if (data.data) {
        commit("PUT_METAS_TO_STATE", data.data);
      } else {
        console.log(
          "Ошибка: " + "не удалось выполнить запрос, повторите попытку позже."
        );
      }
      return data;
    },
    async GET_PAGES_FROM_IP({ commit }) {
      const data = await axios("http://127.0.0.1:8000/api/pages", {
        method: "GET",
      });
      if (data.data) {
        commit("PUT_PAGES_TO_STATE", data.data);
      } else {
        console.log(
          "Ошибка: " + "не удалось выполнить запрос, повторите попытку позже."
        );
      }
      return data;
    },
  },
});
