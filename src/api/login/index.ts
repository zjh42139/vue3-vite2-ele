import request from '@/utils/request';

import { IAccount, ILoginResult } from './type';
import { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/', // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
  });
}
