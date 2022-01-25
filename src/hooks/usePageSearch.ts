import { ref } from 'vue';
import PageContent from '@/components/PageContent';

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleQueryReset = () => {
    pageContentRef.value?.getPageData();
  };
  const hanldeSearch = (query: any) => {
    pageContentRef.value?.getPageData(query);
  };
  return { pageContentRef, handleQueryReset, hanldeSearch };
}
