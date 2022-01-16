import { App } from 'vue';
import { formateUtcString } from '@/utils/date-formate';

function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formateTime(time: string) {
      return formateUtcString(time);
    },
  };
}

export function setupProperties(app: App) {
  app.use(registerProperties);
}
