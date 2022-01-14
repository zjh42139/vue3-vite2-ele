export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

interface ISubMenu {
  children: ISubMenu[];
  id: number;
  name: string;
  parentId: number;
  sort: number;
  type: number;
  url: string;
}

export interface IMenu {
  children: ISubMenu[];
  id: number;
  name: string;
  parentId: number;
  sort: number;
  type: number;
  url: string;
  icon: string;
}

export interface IDataType<T = any> {
  code: number;
  data: T;
}
