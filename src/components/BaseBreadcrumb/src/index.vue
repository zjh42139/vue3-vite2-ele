<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { IBreadcrumb } from '../types';

  defineProps({
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      required: true,
    },
  });
</script>

<style lang="scss" scoped></style>
