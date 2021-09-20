import { createStore } from 'vuex';
// eslint-disable-next-line import/named
import {
  INIT_LOGIN, LOGIN, REGISTER, SET_USER_DATA, SIGNOUT, TOGGLE_AUTH, TOGGLE_AUTH_MODAL,
} from '@/state/actions';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    userData: null,
  },

  mutations: {
    [TOGGLE_AUTH_MODAL]: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    [TOGGLE_AUTH]: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    [SET_USER_DATA]: (state, data) => {
      state.userData = data;
    },
  },

  getters: {
    // authModalShow: (state) => state.authModalShow,
  },

  actions: {
    async [REGISTER]({ commit }, values) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      await usersCollection.doc(userCredentials.user.uid)
        .set({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });

      await userCredentials.user.updateProfile({
        displayName: values.name,
      });

      commit(TOGGLE_AUTH);
    },

    async [LOGIN]({ commit }, values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      commit(TOGGLE_AUTH);
    },

    async [SIGNOUT]({ commit }) {
      await auth.signOut();
      commit(TOGGLE_AUTH);
      window.location.reload();
    },

    [INIT_LOGIN]({ commit }) {
      const user = auth.currentUser;

      if (user) {
        const {
          displayName,
          email,
          photoURL,
          uid,
        } = user;

        commit(SET_USER_DATA, {
          displayName,
          email,
          photoURL,
          uid,
        });
        commit(TOGGLE_AUTH);
      }
    },
  },
  modules: {},
});
