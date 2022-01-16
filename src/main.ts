import 'normalize.css';
import 'virtual:windi.css';
import { createApp } from 'vue';
import { setupStore } from '@/store';
import { setupProperties } from '@/global/register-properties';
import App from './App.vue';
import router from './router';
import 'nprogress/nprogress.css';

const app = createApp(App);

setupStore(app);
setupProperties(app);
app.use(router);

app.mount('#app');
