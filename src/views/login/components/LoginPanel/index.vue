<template>
  <el-tabs v-model="activeName" @tabClick="handleClick" class="w-80">
    <el-tab-pane name="account">
      <template #label>
        <span>
          <el-icon><user /></el-icon>账号登录
        </span>
      </template>
      <LoginAccount />
    </el-tab-pane>
    <el-tab-pane name="phone">
      <template #label>
        <span>
          <el-icon><cellphone /></el-icon>手机登录
        </span>
      </template>
      <LoginPhone />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import LoginAccount from './LoginAccount.vue';
  import LoginPhone from './LoginPhone.vue';

  const activeName = ref('account');

  const handleClick = (tab: string, event: Event) => {
    console.log(tab, event);
  };
</script>
