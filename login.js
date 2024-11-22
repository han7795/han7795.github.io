
  // 當用戶登入成功時觸發的回調函數
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    
    // 解碼 ID Token (使用 JWT 解碼工具)
    const data = parseJwt(response.credential);
    console.log("用戶資料：", data);
  }

  // 解碼 JWT ID Token 的工具函數
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(base64);
  }

  // 初始化 Google 按鈕
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "912148148886-m74apbsn2dokgrafs9mto26en07memc2.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.querySelector(".g_id_signin"), // 渲染按鈕的容器
      { theme: "outline", size: "large" } // 按鈕樣式設定
    );

    google.accounts.id.prompt(); // 自動提示用戶登入
  };
