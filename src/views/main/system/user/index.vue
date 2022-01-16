<template>
  <div class="user">
    <div class="search p-5">
      <page-search
        :form-config="searchFormConfig"
        @reset-query="handleQueryReset"
        @search-on-query-change="hanldeSearch"
      ></page-search>
    </div>
    <div class="content p-5">
      <page-content ref="pageContentRef" :table-config="contentTableConfig" :page-name="'user'"></page-content>
    </div>
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
