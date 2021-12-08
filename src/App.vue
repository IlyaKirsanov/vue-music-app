<template>
  <main>
    <AppHeader />

    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <AudioPlayer />

    <!-- Auth Modal -->
    <AuthModel />
  </main>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import AuthModel from '@/components/Auth.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
import { INIT_LOGIN } from '@/state/actions';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModel,
    AudioPlayer,
  },
  created() {
    this.$store.dispatch(INIT_LOGIN);
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
