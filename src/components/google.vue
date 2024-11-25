<template>
    <div>
      <h1>Google 登入範例</h1>
      <!-- 用於自動處理登入 -->
      <div
        id="g_id_onload"
        :data-client_id="clientId"
        data-auto_prompt="false"
      ></div>
  
      <!-- 顯示 Google 登入按鈕 -->
      <div
        class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GoogleLogin",
    data() {
      return {
        clientId: "912148148886-m74apbsn2dokgrafs9mto26en07memc2.apps.googleusercontent.com", // 在這裡填入 Google Cloud 的 Client ID
      };
    },
    methods: {
      handleCredentialResponse(response) {
        console.log("Encoded JWT ID token:", response.credential);
        const userData = this.parseJwt(response.credential);
        console.log("用戶資料：", userData);
        // 你可以將 userData 傳遞到 Vuex 或其他應用邏輯
      },
      parseJwt(token) {
        const base64Url = token.split(".")[1];
        const base64 = decodeURIComponent(
          atob(base64Url)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(base64);
      },
      initializeGoogleSignIn() {
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse,
        });
  
        google.accounts.id.renderButton(
          document.querySelector(".g_id_signin"),
          { theme: "outline", size: "large" }
        );
  
        google.accounts.id.prompt();
      },
    },
    mounted() {
      // 確保 Google SDK 已加載，然後初始化登入邏輯
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = this.initializeGoogleSignIn;
      document.head.appendChild(script);
    },
  };
  </script>
  
  <style scoped>
  /* 添加任何需要的樣式 */
  </style>
  