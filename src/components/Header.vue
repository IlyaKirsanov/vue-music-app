<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }" exact-active-class="no-active">
        Music
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1 w-full">
          <!-- Navigation Links -->

          <li>
            <router-link
              :to="{ name: 'about' }"
              class="px-2 text-white">
              About
            </router-link>
          </li>

          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="TOGGLE_AUTH_MODAL">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }" class="px-2 text-white">Manage</router-link>
            </li>
            <li class="flex-grow text-right">
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="SIGNOUT"
              >Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex';
import { SIGNOUT, TOGGLE_AUTH_MODAL } from '@/state/actions';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations([TOGGLE_AUTH_MODAL]),
    ...mapActions([SIGNOUT]),
    // toggleAuthModal() {
    //   this.$state.commit('toggleAuthModal');
    // },
  },
};
</script>
