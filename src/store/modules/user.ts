import { defineStore } from 'pinia';

import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/api/login';
import router from '@/router';

import { IAccount, IMenu } from '@/api/login/type';
import localCache from '@/utils/local-cache';

interface UserState {
  token: string;
  userInfo: object;
  userMenus: IMenu[];
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

      router.push('/main');
    },
  },

  persist: {
    enabled: true,
  },
});
