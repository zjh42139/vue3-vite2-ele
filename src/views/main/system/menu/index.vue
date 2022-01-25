<template>
  <page-content :table-config="contentTableConfig" page-name="menu"></page-content>
</template>

<script lang="ts" setup>
  import PageContent from '@/components/PageContent';
  import { contentTableConfig } from './config/content.config';
</script>

<style lang="scss" scoped></style>
