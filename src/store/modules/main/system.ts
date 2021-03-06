import { defineStore } from 'pinia';
import { createPageItem, deletePageItem, editPageItem, getPageList } from '@/api/main/system';
import { IPageName } from '@/components/PageContent/types';

interface ISystemState {
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
  goodsList: any[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
}
const requestUrlMap = {
  user: '/users/list',
  users: '/users/list',
  role: '/role/list',
  goods: '/goods/list',
  menu: '/menu/list',
};
export const useSystemStore = defineStore({
  id: 'system',
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
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
    async deletePageItemAction(payload: any) {
      let { pageName, id } = payload;
      if (pageName === 'user') {
        pageName = 'users';
      }
      const pageUrl = `/${pageName}/${id}`;
      await deletePageItem(pageUrl);
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async createPageItemAction(payload: any) {
      const { pageName, formData } = payload;
      const requestUrl = `/${pageName}`;
      await createPageItem(requestUrl, formData);

      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async editPageItemAction(payload: any) {
      const { pageName, formData, id } = payload;
      const requestUrl = `/${pageName}/${id}`;
      await editPageItem(requestUrl, formData);

      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    changeUserList(userList: any[]) {
      this.userList = userList;
    },
    changeUserCount(userCount: number) {
      this.userCount = userCount;
    },
    changeUsersList(userList: any[]) {
      this.userList = userList;
    },
    changeUsersCount(userCount: number) {
      this.userCount = userCount;
    },
    changeRoleList(roleList: any[]) {
      this.roleList = roleList;
    },
    changeRoleCount(roleCount: number) {
      this.roleCount = roleCount;
    },
    changeGoodsList(goodsList: any[]) {
      this.goodsList = goodsList;
    },
    changeGoodsCount(goodsCount: number) {
      this.goodsCount = goodsCount;
    },
    changeMenuList(menuList: any[]) {
      this.menuList = menuList;
    },
    changeMenuCount(menuCount: number) {
      this.menuCount = menuCount;
    },
  },
  persist: {
    enabled: true,
  },
});
