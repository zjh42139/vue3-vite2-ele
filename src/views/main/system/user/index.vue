<template>
  <div class="user">
    <page-search
      :form-config="searchFormConfig"
      @reset-query="handleQueryReset"
      @search-on-query-change="hanldeSearch"
    ></page-search>
    <page-content ref="pageContentRef" :table-config="contentTableConfig" :page-name="'user'"></page-content>
  </div>
</template>

<script setup lang="ts">
  import PageSearch from '@/components/PageSearch';
  import PageContent from '@/components/PageContent';
  import { searchFormConfig } from './config/search.config';
  import { contentTableConfig } from './config/content.config';
  import { usePageSearch } from '@/hooks/usePageSearch';

  const [pageContentRef, handleQueryReset, hanldeSearch] = usePageSearch();
</script>

<style lang="scss" scoped>
  .content {
    border-top: 20px solid #f5f5f5;
  }
</style>
