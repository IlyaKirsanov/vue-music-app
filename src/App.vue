<template>

  <AppHeader/>

  <router-view></router-view>

  <AudioPlayer/>

  <!-- Auth Modal -->
  <AuthModel/>
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
