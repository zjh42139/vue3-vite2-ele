<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<style lang="scss">
  .app {
    height: 100%;
  }
</style>
