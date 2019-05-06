import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_data: [],
    test_data: [],
    current_test: [],
    response: "",
    baseLoginUrl: "https://quiez-api.herokuapp.com/api/auth/login/",
    baseRegisterUrl:
      "https://quiez-api.herokuapp.com/api/auth/register/?format=json"
  },
  mutations: {
    setResponse(state, resp) {
      state.response = resp;
    },
    setUserData(state, resp) {
      state.user_data = resp;
    },
    setTestData(state, resp) {
      state.test_data = resp;
    },
    setCurrentTest(state, resp) {
      state.current_test = resp;
    }
  },
  actions: {
    async register({ state, commit }, data) {
      return await axios
        .post(state.baseRegisterUrl, JSON.stringify(data), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          commit("setResponse", response);
          alert("Успешно");
          this.$router.push("/");
        })
        .catch(error => {
          commit("setResponse", error);
          alert("Пользователь уже зарегистрирован!");
        });
    },

    async login({ state, commit }, data) {
      return await axios
        .post(state.baseLoginUrl, JSON.stringify(data), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          commit("setResponse", response.data.key);
          sessionStorage.setItem("token", response.data.key);
        })
        .catch(error => {
          commit("setResponse", error);
          sessionStorage.removeItem("token");
          alert("Такого пользователя не существует!");
        });
    },

    async getUserData({ commit }) {
      return await axios
        .get(
          "https://cors-anywhere.herokuapp.com/quiez-api.herokuapp.com/api/auth/user/?format=json",
          {
            headers: {
              Authorization: "Token " + sessionStorage.token,
              Accept: "application/json"
            }
          }
        )
        .then(response => {
          commit("setUserData", response.data);
        });
    },

    async getAllTests({ commit }) {
      return await axios
        .get(
          "https://cors-anywhere.herokuapp.com/quiez-api.herokuapp.com/api/test/?format=json",
          {
            headers: {
              Authorization: "Token " + sessionStorage.token,
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          commit("setTestData", response.data);
        });
    },

    async createTest({commit}, data) {
      return await axios.post("https://quiez-api.herokuapp.com/api/test/?format=json", JSON.stringify(data), {
        headers: {
          Authorization: "Token " + sessionStorage.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        alert("Success");
      }).catch(error => {
        alert("Something went wrong!");
      });
    },

    async openTest({commit}, data) {
      return await axios.post("https://quiez-api.herokuapp.com/api/test/" + data + "/open/",  null, {
        headers: {
          Authorization: "Token " + sessionStorage.token,
          Accept: "application/json"
        }
      }).then(response => {
        alert("Successfully opened!");
        location.reload();
      }).catch(error => {
        alert("This test is already opened!");
      })
    },

    async closeTest({commit}, data) {
      return await axios.post("https://quiez-api.herokuapp.com/api/test/" + data + "/close/",  null, {
        headers: {
          Authorization: "Token " + sessionStorage.token,
          Accept: "application/json"
        }
      }).then(response => {
        alert("Closed successfully!");
        location.reload();
      }).catch(error => {
        alert("This test is not opened yet!")
      })
    },

    async startTest({commit}, id) {
      return await axios.get("https://quiez-api.herokuapp.com/api/test/" + id + "/", {
        headers: {
          Authorization: "Token " + sessionStorage.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response =>  {
        commit("setCurrentTest", response.data);
      }).catch(error => {
        console.error(error);
      });
    },

    async submitTest({commit}, data) {
      return await axios.post("https://quiez-api.herokuapp.com/api/test/" + data[0] + "/submit/?format=json", JSON.stringify(data[1]), {
        headers: {
          Authorization: "Token " + sessionStorage.token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        alert(JSON.stringify(response))
      }).catch(error => {
        console.error(error);
      })
    }
  }
});
