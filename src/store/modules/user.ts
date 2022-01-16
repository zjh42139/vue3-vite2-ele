import { defineStore } from 'pinia';

import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/api/login';
import router from '@/router';

import { IAccount } from '@/api/login/type';
import localCache from '@/utils/local-cache';
import { mapMenusToRoutes } from '@/utils/map-menus';

interface UserState {
  token: string;
  userInfo: object;
  userMenus: any[];
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
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
      this.userMenus = userMenus;
      localCache.set('userMenus', userMenus);

      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });

      router.push('/main');
    },
    loadLocalState() {
      if (this.userMenus) {
        const routes = mapMenusToRoutes(this.userMenus);
        routes.forEach((route) => {
          router.addRoute('main', route);
        });
      }
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
