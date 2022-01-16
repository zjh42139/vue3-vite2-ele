import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      sideBarCollapsed: false,
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
