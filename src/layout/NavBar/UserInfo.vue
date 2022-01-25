<template>
  <el-dropdown class="user-info">
    <div class="avatar-container">
      <el-avatar :src="circleUrl" shape="square" class="avatar" size="small"></el-avatar>
      <el-icon class="cursor-pointer">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided @click="handleLogoutClick">
          <el-icon> <circle-close /> </el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import { ArrowDown, CircleClose } from '@element-plus/icons-vue';
  import { useUserStore } from '@/store/modules/user';

  const circleUrl = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80';

  const handleLogoutClick = () => {
    router.push({
      name: 'login',
    });
  };
</script>

<style lang="scss" scoped></style>
