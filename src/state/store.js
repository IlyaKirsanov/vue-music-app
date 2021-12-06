import { createStore } from 'vuex';
// eslint-disable-next-line import/named
import { Howl } from 'howler';
import {
  INIT_LOGIN, LOGIN, REGISTER, SET_USER_DATA, SIGNOUT, TOGGLE_AUTH, TOGGLE_AUTH_MODAL,
  NEW_SONG,
  TOGGLE_AUDIO,
  PROGRESS,
  UPDATE_POSITION,
} from '@/state/actions';
import { auth, usersCollection } from '@/includes/firebase';
import { formatTime } from '@/includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    userData: null,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
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
    [NEW_SONG]: (state, payload) => {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    [UPDATE_POSITION]: (state) => {
      state.seek = formatTime(state.sound.seek());
      state.duration = formatTime(state.sound.duration());
    },
  },

  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    },
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

    async [NEW_SONG]({ commit, state, dispatch }, payload) {
      commit(NEW_SONG, payload);

      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch(PROGRESS);
        });
      });
    },
    [PROGRESS]({ commit, state, dispatch }) {
      commit(UPDATE_POSITION);

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch(PROGRESS);
        });
      }
    },

    async [TOGGLE_AUDIO]({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
  },
  modules: {},
});
