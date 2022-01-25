import { ref } from 'vue';
import PageDialog from '@/components/PageDialog';

export function usePageDialog() {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>();
  const handleAddClick = () => {
    if (pageDialogRef.value) {
      pageDialogRef.value.changeFormData({});
      pageDialogRef.value.dialogVisible = true;
    }
  };
  const handleEditClick = (item: any) => {
    if (pageDialogRef.value) {
      pageDialogRef.value.changeFormData(item);
      pageDialogRef.value.dialogVisible = true;
    }
  };
  return {
    pageDialogRef,
    handleAddClick,
    handleEditClick,
  };
}
