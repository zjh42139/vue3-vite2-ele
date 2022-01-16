<template>
  <div class="side-bar">
    <div class="logo box-content">
      <el-image class="img" style="height: 100%" :src="Logo" fit="fill"></el-image>
      <span v-if="!isCollapse" class="title">Vite</span>
    </div>
    <el-menu
      :default-active="activeMenuIndex"
      class="el-menu-vertical"
      :collapse="isCollapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="menu in userMenus" :key="menu.id">
        <!-- 二级菜单 -->
        <template v-if="menu.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <el-icon v-if="menu.icon">
                <component :is="fontToSvg[menu.icon]"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subMenu in menu.children" :key="subMenu.id">
              <el-menu-item :index="subMenu.id + ''" @click="handleMenuItemClick(subMenu)">
                <el-icon v-if="subMenu.icon">
                  <component :is="fontToSvg[subMenu.icon]"></component>
                </el-icon>
                <span>{{ subMenu.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''">
            <el-icon v-if="menu.icon">
              <component :is="fontToSvg[menu.icon]"></component>
            </el-icon>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Logo from '@/assets/img/logo.svg';
  import { useUserStore } from '@/store/modules/user';
  import { useAppStore } from '@/store/modules/app';
  import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  import { pathMapToMenu } from '@/utils/map-menus';

  const appStore = useAppStore();
  const isCollapse = computed(() => appStore.sideBarCollapsed);

  const userStore = useUserStore();
  const router = useRouter();
  const userMenus = userStore.userMenus;

  const fontToSvg = {
    'el-icon-monitor': Monitor,
    'el-icon-setting': Setting,
    'el-icon-goods': Goods,
    'el-icon-chat-line-round': ChatLineRound,
  };

  const handleMenuItemClick = (menu: any) => {
    router.push(menu.url);
  };

  // const getActiveMenuIndex = () => {
  //   let res;
  //   function cursiveSearch(arr: typeof userMenus) {
  //     const curPageUrl = useRoute().path;
  //     for (const menu of arr) {
  //       if (menu.url === curPageUrl) {
  //         res = menu.id + '';
  //       }
  //       if (menu.children) {
  //         cursiveSearch(menu.children);
  //       }
  //     }
  //   }
  //   cursiveSearch(userMenus);
  //   return res;
  // };
  const activeMenuIndex = computed(() => {
    return pathMapToMenu(userMenus, useRoute().path).id + '';
  });
</script>

<style lang="scss" scoped>
  .side-bar {
    height: 100%;
    background-color: #001529;

    .logo {
      display: flex;
      height: 28px;
      padding: 12px 10px 8px 10px;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .img {
        height: 100%;
        margin: 0 10px;
      }

      .title {
        font-size: 16px;
        font-weight: 700;
        color: white;
      }
    }

    .el-menu {
      border-right: none;
    }

    // 目录
    .el-sub-menu {
      background-color: #001529 !important;
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135 !important;
      }
    }

    ::v-deep .el-sub-menu__title {
      background-color: #001529 !important;
    }

    // hover 高亮
    .el-menu-item:hover {
      color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
</style>
