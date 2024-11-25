<template>
  <div id="google-login-button"></div>
</template>

<script>
export default {
  name: "GoogleLoginButton",
  props: {
    clientId: {
      type: String,
      required: true, // 必須傳入 Google OAuth 客戶端 ID
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    onFailure: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    // 確保 Google API 加載成功
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!window.google) {
      console.error("Google API script not loaded.");
      return;
    }

    // 初始化 Google API
    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response) => {
        if (response.credential) {
          this.onSuccess(response);
        } else {
          this.onFailure(response);
        }
      },
    });

    // 渲染 Google 登入按鈕
    window.google.accounts.id.renderButton(
      this.$el, // 渲染在元件根元素上
      {
        theme: "outline", // 按鈕主題
        size: "large",    // 按鈕大小
        text: "signin_with", // 按鈕顯示的文字
      }
    );
  },
};
</script>
