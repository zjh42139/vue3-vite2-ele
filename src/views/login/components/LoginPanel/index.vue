<template>
  <div class="w-60 mb-10">
    <el-tabs v-model="activeName" type="border-card" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="flex items-center justify-center">
            <el-icon><user /></el-icon>账号登录
          </span>
        </template>
        <LoginAccount ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="flex items-center justify-center">
            <el-icon><cellphone /></el-icon>手机登录
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>

    <div class="w-full flex justify-between items-center">
      <el-checkbox v-model="remember" size="large">记住密码</el-checkbox>
      <el-button type="text">忘记密码</el-button>
    </div>

    <el-button type="primary" class="w-full" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import LoginAccount from './LoginAccount.vue';
  import LoginPhone from './LoginPhone.vue';
  import { User, Cellphone } from '@element-plus/icons-vue';

  const activeName = ref('account');
  const remember = ref(true);

  const loginAccountRef = ref<InstanceType<typeof LoginAccount>>();
  const handleLoginClick = () => {
    if (activeName.value === 'account') {
      loginAccountRef.value?.loginAction();
    }
  };
</script>
