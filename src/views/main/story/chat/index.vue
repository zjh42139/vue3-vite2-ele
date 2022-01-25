<template>
  <div class="h-64 p-4">
    <data-item v-for="(item, index) in dataList" :key="index" :title="item" />
  </div>
</template>

<script lang="ts" setup>
  import DataItem from './components/DataItem.vue';

  const dataList = ['人口', '法人', 'GDP'];
</script>

<style lang="scss" scoped></style>
