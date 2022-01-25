<template>
  <div class="user">
    <div class="search p-5">
      <page-search :form-config="searchFormConfig"></page-search>
    </div>
    <div class="content p-5">
      <page-content :table-config="contentTableConfig" :page-name="'role'"></page-content>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PageSearch from '@/components/PageSearch';
  import PageContent from '@/components/PageContent';
  import { searchFormConfig } from './config/search.config';
  import { contentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped>
  .content {
    border-top: 20px solid #f5f5f5;
  }
</style>
