<template>
  <div class="item">
    <div class="w-1 bg-red-600"></div>
    <div class="title">{{ title }}</div>
    <div class="operation flex">
      <el-cascader
        v-model="value"
        class="w-64"
        :options="options"
        :props="cascaderProps"
        placeholder="请选择映射关系"
        clearable
        @change="handleChange"
      ></el-cascader>
      <div v-if="value" class="ml-2 flex items-center text-xs">
        <el-icon color="green" size="20"><circle-check /></el-icon>已自动关联
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { CircleCheck } from '@element-plus/icons-vue';
  const props = defineProps<{
    title: string;
    // value: string[];
  }>();

  const value = ref();

  const cascaderProps = {
    expandTrigger: 'hover',
  };

  const handleChange = (value) => {
    console.log(value);
  };

  const options = [
    {
      value: 'guide',
      label: '经济',
      children: [
        {
          value: 'disciplines',
          label: '法人单位总数',
          children: [
            {
              value: 'consistency',
              label: '法人',
            },
            {
              value: 'feedback',
              label: '反馈',
            },
            {
              value: 'efficiency',
              label: '效率',
            },
            {
              value: 'controllability',
              label: '可控',
            },
          ],
        },
        {
          value: 'navigation',
          label: '产业法人单位数',
          children: [],
        },
      ],
    },
    {
      value: 'component',
      label: '人口',
      children: [],
    },
    {
      value: 'resurce',
      label: '经济',
      children: [],
    },
  ];
</script>

<style lang="scss" scoped>
  .item {
    @apply flex text-left py-2;
    border-bottom: 1px solid #dcdfe6;
    .title {
      margin-left: 0.5rem;
      flex: 2;
    }
    .operation {
      flex: 3;
    }
  }
</style>
