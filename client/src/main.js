import { createApp, Vue } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import './axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from 'v-pagination-3';


const app = createApp(App);

app.use(router);
app.use(store);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component('pagination', Pagination);
app.mount("#app");
