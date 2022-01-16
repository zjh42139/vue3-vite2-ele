import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import { useUserStore } from './modules/user';

const store = createPinia();
store.use(piniaPluginPersist);

export function setupStore(app: App<Element>) {
  app.use(store);
  useUserStore().loadLocalState();
}

export { store };
