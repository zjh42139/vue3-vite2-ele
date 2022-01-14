<template>
  <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="100px">
    <el-form-item label="username" prop="username">
      <el-input v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="remember" prop="remember">
      <el-checkbox v-model="loginForm.remember" size="large"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">Submit</el-button>
      <el-button @click="resetForm(loginFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { resetForm, submitForm } from './utlis';
  import type { ElForm } from 'element-plus';
  import { useUserStore } from '@/store/modules/user';
  import localCache from '@/utils/local-cache';

  const userStore = useUserStore();

  const loginFormRef = ref<InstanceType<typeof ElForm>>();

  const loginForm = reactive({
    username: localCache.get('username') ?? '',
    password: localCache.get('password') ?? '',
    remember: true,
  });

  const handleLogin = () => {
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

  const rules = {
    username: [
      {
        required: true,
        message: '用户名是必传内容',
        trigger: 'blur',
      },
      {
        pattern: /^[a-z0-9]{5,10}$/,
        message: '用户名必须是5-10个字母或者数字',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '密码是必传内容',
        trigger: 'blur',
      },
      {
        pattern: /^[a-z0-9]{6,}$/,
        message: '用户名必须是6位以上的字母或者数字',
        trigger: 'blur',
      },
    ],
  };
</script>
