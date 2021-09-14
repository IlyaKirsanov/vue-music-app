<template>
  <div class="text-white text-center font-bold p-5 md-4" v-if="registrationShowAlert"
       :class="registrationAlertVariant">
    {{ registrationAlertMessage }}
  </div>
  <VeeForm :validation-schema="schema"
           :initial-values="userData"
           @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        :bails="false"
        v-slot="{field, errors}"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border
                  border-gray-300 transition duration-500 focus:outline-none
                  focus:border-black rounded"
          placeholder="Password" v-bind="field">
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800
                        border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField name="tos" value="1" type="checkbox"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos"/>
    </div>
    <button
      :disabled="registrationInSubmission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>

import { REGISTER } from '@/state/actions';

export default {
  name: 'RegistrationForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'numeric|min_value:18|max_value:100',
        password: 'required|min:3|max:32',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded: Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      registrationInSubmission: false,
      registrationShowAlert: false,
      registrationAlertVariant: 'bg-blue-500',
      registrationAlertMessage: 'Please wait! Your account is being created',
    };
  },
  methods: {
    async register(values) {
      this.registrationShowAlert = true;
      this.registrationInSubmission = true;
      this.registrationAlertVariant = 'bg-blue-500';
      this.registrationAlertMessage = 'Please wait! Your account is being created';

      try {
        await this.$store.dispatch(REGISTER, values);
      } catch (error) {
        this.registrationInSubmission = false;
        this.registrationAlertVariant = 'bg-red-500';
        this.registrationAlertMessage = `Error ${error.message}! Try again`;
        return;
      }

      this.registrationAlertVariant = 'bg-green-500';
      this.registrationAlertMessage = 'Success! Account created!';
    },
  },
};
</script>
