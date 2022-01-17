import { defineStore } from 'pinia';

import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/api/login';
import router from '@/router';

import { IAccount } from '@/api/login/type';
import localCache from '@/utils/local-cache';
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus';

interface UserState {
  token: string;
  userInfo: object;
  userMenus: any[];
  permissions: any[];
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  actions: {
    async accountLoginAction(account: IAccount) {
      const {
        data: { id, token },
      } = await accountLoginRequest(account);
      this.token = token;
      localCache.set('token', token);

      const { data: userInfo } = await requestUserInfoById(id);
      this.userInfo = userInfo;
      localCache.set('userInfo', userInfo);

      const { data: userMenus } = await requestUserMenusByRoleId(userInfo.role.id);
      this.changeUserMenus(userMenus);
      router.push('/main');
    },
    loadLocalState() {
      if (this.userMenus) {
        this.changeUserMenus(this.userMenus);
      }
    },
    changeUserMenus(userMenus: any[]) {
      this.userMenus = userMenus;
      localCache.set('userMenus', userMenus);

      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });

      const permissions = mapMenusToPermissions(userMenus);
      this.permissions = permissions;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
