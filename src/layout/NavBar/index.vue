<template>
  <div class="nav-bar">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isCollapse ? Expand : Fold"></component>
    </el-icon>
    <div class="content">
      <base-breadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Fold, Expand } from '@element-plus/icons-vue';
  import { useAppStore } from '@/store/modules/app';
  import UserInfo from './UserInfo.vue';
  import { pathMapBreadcrumbs } from '@/utils/map-menus';
  import BaseBreadcrumb from '@/components/BaseBreadcrumb';
  import type { IBreadcrumb } from '@/components/BaseBreadcrumb/types';
  import { useUserStore } from '@/store/modules/user';
  import { useRoute } from 'vue-router';

  const appStore = useAppStore();
  const isCollapse = computed(() => appStore.sideBarCollapsed);

  const handleFoldClick = appStore.toggleSideBar;

  const breadcrumbs = computed(() => {
    return pathMapBreadcrumbs(useUserStore().userMenus, useRoute().path);
  });
</script>

<style lang="scss" scoped>
  .nav-bar {
    display: flex;
    width: 100%;
    align-items: center;

    .fold-menu {
      font-size: 30px;
      cursor: pointer;
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      padding: 0 20px;
    }
  }
</style>
