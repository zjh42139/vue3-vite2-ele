<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts" setup>
  import LoginPanel from './components/LoginPanel/index.vue';
</script>

<style lang="scss" scoped>
  .login {
    @apply w-full h-full flex justify-center items-center;
    background: url('@/assets/img/login-bg.svg');
  }
</style>
