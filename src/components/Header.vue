<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="TOGGLE_AUTH_MODAL">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li >
              <a class="px-2 text-white" href="#">Manage</a>
            </li>
            <li >
              <a class="px-2 text-white" href="#" @click.prevent="SIGNOUT">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex';
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
