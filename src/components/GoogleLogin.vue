<template>
  <div>
    <!-- Google 登录按钮会渲染到这个容器中 -->
    <div id="googleSignInButton"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleLogin",
  props: {
    clientId: {
      type: String,
      required: true,
    },
    onLoginSuccess: {
      type: Function,
      required: true,
    },
    onLoginFailure: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    this.initializeGoogleLogin();
  },
  methods: {
    initializeGoogleLogin() {
      const scriptId = "google-login-script";

      // 检查是否已经加载了 Google 脚本
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = this.renderGoogleButton;
        document.body.appendChild(script);
      } else {
        this.renderGoogleButton();
      }
    },
    renderGoogleButton() {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" }
        );

        // 可选：自动提示用户登录
        // window.google.accounts.id.prompt();
      }
    },
    handleCredentialResponse(response) {
      if (response.credential) {
        const decodedCredential = this.parseJwt(response.credential);
        this.onLoginSuccess(decodedCredential);
      } else {
        this.onLoginFailure("Login failed");
      }
    },
    parseJwt(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(base64));
      } catch (error) {
        console.error("Failed to parse JWT:", error);
        return null;
      }
    },
  },
};
</script>

<style scoped>
/* 可选：添加样式 */
</style>