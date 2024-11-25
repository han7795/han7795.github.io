<template>
  <div>
    <h1>Google Login Example</h1>
    <GoogleLoginButton
      :client-id="googleClientId"
      :on-success="handleSuccess"
      :on-failure="handleFailure"
    />
  </div>
</template>

<script>
import GoogleLoginButton from "./components/GoogleLoginButton.vue";

export default {
  name: "App",
  components: {
    GoogleLoginButton,
  },
  data() {
    return {
      googleClientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, // 環境變數中的 Google 客戶端 ID
    };
  },
  methods: {
    handleSuccess(response) {
      console.log("Login Successful:", response.credential);
      // 在這裡處理成功邏輯，例如發送 token 到後端進行驗證
    },
    handleFailure(error) {
      console.error("Login Failed:", error);
    },
  },
};
</script>
