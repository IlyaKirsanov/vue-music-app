import { mapMutations } from 'vuex';
<template>
  <div
    id="modal"
    class="fixed inset-0 z-10 overflow-y-auto"
    :class="{ hidden: !modal }"
  >
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75" />
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
      >&#8203;</span>

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left">
          <!--Title-->
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">
              Your Account
            </p>
            <!-- Modal Close Button -->
            <div
              class="z-50 cursor-pointer modal-close"
              @click.prevent="TOGGLE_AUTH_MODAL"
            >
              <i class="fas fa-times" />
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block px-4 py-3 transition rounded"
                href="#"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600 ': tab === 'register',
                }"
                @click.prevent="tab = 'login'"
              >Login</a>
            </li>
            <li class="flex-auto text-center">
              <a
                class="block px-4 py-3 transition rounded"
                href="#"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login',
                }"
                @click.prevent="tab = 'register'"
              >Register</a>
            </li>
          </ul>

          <LoginForm v-if="tab === 'login'" />
          <RegistrationForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import RegistrationForm from './RegistrationForm.vue';
import LoginForm from './LoginForm.vue';
import { TOGGLE_AUTH_MODAL } from '@/state/actions';

export default {
  name: 'AuthModel',
  components: { RegistrationForm, LoginForm },
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    ...mapState({
      modal: 'authModalShow',
    }),
  },
  methods: {
    ...mapMutations([TOGGLE_AUTH_MODAL]),
  },
};
</script>
