<template>
  <div class="text-white text-center font-bold p-4 mb-4" v-if="loginShowAlert"
       :class="loginAlertVariant"
  > {{ loginAlertMessage }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border
                        border-gray-300 transition duration-500
                        focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password"/>
    </div>
    <button
      type="submit"
      :disabled="loginInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>

import { LOGIN } from '@/state/actions';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      loginInSubmission: false,
      loginShowAlert: false,
      loginAlertVariant: 'bg-blue-500',
      loginAlertMessage: 'Please wait! We are logging you in',
    };
  },
  methods: {
    async login(values) {
      this.loginInSubmission = true;
      this.loginShowAlert = true;
      this.loginAlertVariant = 'bg-white-500';
      this.loginAlertMessage = 'Please wait! We are logging you in';

      try {
        await this.$store.dispatch(LOGIN, values);
      } catch (error) {
        this.loginInSubmission = false;
        this.loginAlertVariant = 'bg-red-500';
        this.loginAlertMessage = 'Invalid login! Error!';
      }

      this.loginAlertVariant = 'bg-green-500';
      this.loginAlertMessage = 'Success logged in!';
      window.location.reload();
    },
  },
};

</script>
