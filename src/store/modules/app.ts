import { getPageList } from '@/api/main/system';
import { defineStore } from 'pinia';

interface IAppState {
  sideBarCollapsed: boolean;
  departmentOptions: any[];
  roleOptions: any[];
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppState => {
    return {
      sideBarCollapsed: false,
      departmentOptions: [],
      roleOptions: [],
    };
  },
  actions: {
    toggleSideBar() {
      this.sideBarCollapsed = !this.sideBarCollapsed;
    },
    async getInitialDataAction() {
      const {
        data: { list: deparmentList },
      } = await getPageList('/department/list', { offset: 0, size: 99999 });
      const {
        data: { list: roleList },
      } = await getPageList('/role/list', { offset: 0, size: 99999 });

      this.departmentOptions = deparmentList;
      this.roleOptions = roleList;
    },
  },
  persist: {
    enabled: true,
  },
});
