<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="60px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { ElForm } from 'element-plus';
  import { useUserStore } from '@/store/modules/user';
  import localCache from '@/utils/local-cache';
  import { rules } from './config';

  const userStore = useUserStore();

  const loginFormRef = ref<InstanceType<typeof ElForm>>();

  const loginForm = reactive({
    username: localCache.get('username') ?? '',
    password: localCache.get('password') ?? '',
    remember: true,
  });

  const loginAction = () => {
    loginFormRef.value?.validate((valid) => {
      if (valid) {
        if (loginForm.remember) {
          localCache.set('username', loginForm.username);
          localCache.set('password', loginForm.password);
        } else {
          localCache.delete('username');
          localCache.delete('password');
        }
        const params = {
          name: loginForm.username,
          password: loginForm.password,
        };
        userStore.accountLoginAction(params);
      }
    });
  };
  defineExpose({
    loginAction,
  });
</script>
