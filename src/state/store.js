import { createStore } from 'vuex';
// eslint-disable-next-line import/named
import { REGISTER, TOGGLE_AUTH, TOGGLE_AUTH_MODAL } from '@/state/actions';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    [TOGGLE_AUTH_MODAL]: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    [TOGGLE_AUTH]: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
  actions: {
    async [REGISTER]({ commit }, values) {
      await auth.createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      commit(TOGGLE_AUTH);
    },
  },
  modules: {},
});
