import 'virtual:windi.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'nprogress/nprogress.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');

import request from '@/utils/request';
console.log(request);
interface resType {
  data: any;
  returnCode: string;
  success: boolean;
}
request
  .get<resType>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('111');
        return config;
      },
      responseInterceptor: (res) => {
        console.log('222');
        return res;
      },
    },
  })
  .then((res) => {
    console.log(res);
  });
