import 'normalize.css';
import 'virtual:windi.css';
import 'nprogress/nprogress.css';
import { createApp } from 'vue';
import { setupStore } from '@/store';
import { setupProperties } from '@/global/register-properties';
import App from './App.vue';
import router from './router';

const app = createApp(App);

setupStore(app);
setupProperties(app);
app.use(router);

app.mount('#app');

document.addEventListener(
  'mousewheel',
  () => {
    console.log(123);
  },
  { passive: true },
);
