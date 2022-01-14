<template>
  <div class="font-bold">
    用户名:{{ mainStore.name }}
    <br />
    长度:{{ mainStore.nameLength }}
  </div>
  <hr />
  <button @click="updateName">修改store中的name</button>
  <ol>
    <li>1</li>
    <li>1</li>
    <li>12</li>
  </ol>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store';

const mainStore = useMainStore();

const updateName = () => {
  // $patch 修改 store 中的数据
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了',
  });
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
