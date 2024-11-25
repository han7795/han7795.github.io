import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(GoogleLogin, {
    clientId: '912148148886-m74apbsn2dokgrafs9mto26en07memc2.apps.googleusercontent.com',
});

app.mount('#app');