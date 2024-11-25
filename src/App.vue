<template>
  <div>
    <h1>Simple Auth Example</h1>
    <div v-if="!isLoggedIn">
      <GoogleLogin
        :clientId="googleClientId"
        :onLoginSuccess="handleLoginSuccess"
        :onLoginFailure="handleLoginFailure"
      />
    </div>
    <div v-else>
      <p>Welcome, {{ userInfo.name }}!</p>
      <button @click="logout">Logout</button>
      <button @click="goToProtectedPage">Go to Protected Page</button>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "./components/GoogleLogin.vue";
import { ref } from "vue";

export default {
  components: {
    GoogleLogin,
  },
  setup() {
    const googleClientId = "YOUR_GOOGLE_CLIENT_ID"; // 替换为你的 Google Client ID
    const isLoggedIn = ref(false);
    const userInfo = ref({});

    const handleLoginSuccess = (user) => {
  console.log("Login successful:", user);
  isLoggedIn.value = true;
  userInfo.value = user;
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userInfo", JSON.stringify(user));
};

    const handleLoginFailure = (error) => {
      console.error("Login failed:", error);
    };

    const logout = () => {
  isLoggedIn.value = false;
  userInfo.value = {};
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userInfo");
  console.log("User logged out.");
};
if (localStorage.getItem("isLoggedIn") === "true") {
  isLoggedIn.value = true;
  userInfo.value = JSON.parse(localStorage.getItem("userInfo"));
}

    const goToProtectedPage = () => {
      alert("You are navigating to a protected page!");
      // 在这里跳转到受保护的页面
    };

    return {
      googleClientId,
      isLoggedIn,
      userInfo,
      handleLoginSuccess,
      handleLoginFailure,
      logout,
      goToProtectedPage,
    };
  },
};
</script>
