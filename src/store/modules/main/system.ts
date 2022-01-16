import { defineStore } from 'pinia';
import { getPageList } from '@/api/main/system';
import { IPageName } from '@/components/PageContent/types';

interface ISystemState {
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
}
const requestUrlMap = {
  user: '/users/list',
  role: '/role/list',
};
export const useSystemStore = defineStore({
  id: 'system',
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
    };
  },
  getters: {
    pageList: (state) => (pageName: IPageName) => state[`${pageName}List`],
    pageCount: (state) => (pageName: IPageName) => state[`${pageName}Count`],
  },
  actions: {
    async getPageListAction(payload: any) {
      const { pageName } = payload;
      const requestUrl = (requestUrlMap as any)[pageName];
      const pageList = await getPageList(requestUrl, payload.queryInfo);
      const { list, totalCount } = pageList.data;

      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      this[`change${changePageName}List`](list);
      this[`change${changePageName}Count`](totalCount);
    },
    changeUserList(userList: any[]) {
      this.userList = userList;
    },
    changeUserCount(userCount: number) {
      this.userCount = userCount;
    },
    changeRoleList(roleList: any[]) {
      this.roleList = roleList;
    },
    changeRoleCount(roleCount: number) {
      this.roleCount = roleCount;
    },
  },
  persist: {
    enabled: true,
  },
});
