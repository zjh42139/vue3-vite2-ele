import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      sideBarCollapsed: true,
    };
  },
  actions: {
    toggleSideBar() {
      this.sideBarCollapsed = !this.sideBarCollapsed;
    },
  },
  persist: {
    enabled: true,
  },
});
