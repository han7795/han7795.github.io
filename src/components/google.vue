<template>
  <div>
    <GoogleLoginButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleLoginSuccess(response) {
      console.log('Login Success:', response);
    },
    handleLoginError(error) {
      console.error('Login Error:', error);
    },
  },
};
</script>
