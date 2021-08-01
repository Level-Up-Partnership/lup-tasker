import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from './components/UI/BaseCard.vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.mount('#app');