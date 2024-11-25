<template>
  <div>
    <h1>Google Login Example with Vue</h1>
    <GoogleLogin
      :clientId="googleClientId"
      :onLoginSuccess="handleLoginSuccess"
      :onLoginFailure="handleLoginFailure"
    />
  </div>
</template>

<script>
import GoogleLogin from "./components/GoogleLogin.vue";

export default {
  components: {
    GoogleLogin,
  },
  data() {
    return {
      googleClientId: "912148148886-m74apbsn2dokgrafs9mto26en07memc2.apps.googleusercontent.com", // 替换为你的客户端 ID
    };
  },
  methods: {
    handleLoginSuccess(user) {
      console.log("User logged in successfully:", user);
    },
    handleLoginFailure(error) {
      console.error("Login failed:", error);
    },
  },
};
</script>
