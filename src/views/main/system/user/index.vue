<template>
  <div class="user">
    <page-search
      :form-config="searchFormConfig"
      @reset-query="handleQueryReset"
      @search-on-query-change="hanldeSearch"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :table-config="contentTableConfig"
      page-name="user"
      @add-click="decorateAddClick"
      @edit-click="decorateEditClick"
    ></page-content>
    <page-dialog ref="pageDialogRef" :form-config="additionFormConfig" page-name="users" :current-item="currentItem" />
  </div>
</template>

<script lang="ts" setup>
  import PageSearch from '@/components/PageSearch';
  import PageContent from '@/components/PageContent';
  import PageDialog from '@/components/PageDialog';
  import { searchFormConfig } from './config/search.config';
  import { contentTableConfig } from './config/content.config';
  import { additionFormConfig } from './config/dialog.config';
  import { usePageSearch } from '@/hooks/usePageSearch';
  import { usePageDialog } from '@/hooks/usePageDialog';
  import { useAppStore } from '@/store/modules/app';
  import { ref } from 'vue';

  const { pageContentRef, handleQueryReset, hanldeSearch } = usePageSearch();
  const { pageDialogRef, handleAddClick, handleEditClick } = usePageDialog();

  const currentItem = ref();

  const departmentItem = additionFormConfig.formItems.find((item) => item.field === 'departmentId')!;
  const roleItem = additionFormConfig.formItems.find((item) => item.field === 'roleId')!;
  const appstore = useAppStore();
  departmentItem.options = appstore.departmentOptions.map((item) => ({ label: item.name, value: item.id }));
  roleItem.options = appstore.roleOptions.map((item) => ({ label: item.name, value: item.id }));

  const needHiddenItem = additionFormConfig.formItems.find((item) => item.field === 'password')!;
  const decorateAddClick = () => {
    needHiddenItem.hidden = false;
    handleAddClick();
  };
  const decorateEditClick = (p: any) => {
    currentItem.value = p;
    needHiddenItem.hidden = true;
    handleEditClick(p);
  };
</script>

<style lang="scss" scoped>
  .content {
    border-top: 20px solid #f5f5f5;
  }
</style>
