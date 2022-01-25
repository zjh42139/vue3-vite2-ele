<template>
  <div class="layout">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <side-bar />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-bar />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import SideBar from './SideBar/index.vue';
  import NavBar from './NavBar/index.vue';
  import { useAppStore } from '@/store/modules/app';

  const appStore = useAppStore();
  const isCollapse = computed(() => appStore.sideBarCollapsed);
</script>

<style lang="scss">
  .layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .main-content,
  .page {
    height: 100%;
  }

  .page-content {
    height: calc(100% - 48px);

    .page-info {
      // height: 100%;
      background-color: #fff;
      border-radius: 5px;
    }
  }

  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-header {
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
</style>
