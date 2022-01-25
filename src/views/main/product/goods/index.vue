<template>
  <page-content :table-config="contentTableConfig" page-name="goods">
    <template #image="scope">
      <el-image
        style="width: 60px; height: 60px"
        :src="scope.row.imgUrl"
        :preview-src-list="[scope.row.imgUrl]"
      ></el-image>
    </template>
    <template #oldPrice="scope">
      {{ `￥${scope.row.oldPrice}` }}
    </template>
  </page-content>
</template>

<script lang="ts" setup>
  import PageContent from '@/components/PageContent';
  import { contentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped></style>
