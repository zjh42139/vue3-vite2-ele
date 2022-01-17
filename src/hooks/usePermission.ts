import { IPageName } from '@/components/PageContent/types';
import { useUserStore } from '@/store/modules/user';
export function usePermission(pageName: IPageName, handleName: string) {
  if (pageName === 'user') {
    pageName = 'users';
  }
  const userStore = useUserStore();
  const permissions = userStore.permissions;
  const verifyPermisson = `system:${pageName}:${handleName}`;
  return !!permissions.find((item) => item === verifyPermisson);
}
