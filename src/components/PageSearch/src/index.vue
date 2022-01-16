<template>
  <base-form v-bind="formConfig" ref="formRef" v-model="formData">
    <!-- <template #header>
      <h1>title</h1>
    </template> -->
    <template #footer>
      <div class="text-right">
        <el-button @click="handleResetClick">
          <el-icon class="mr-1.5"> <refresh /> </el-icon>重置
        </el-button>
        <el-button type="primary" @click="handleSearchClick">
          <el-icon class="mr-1.5"> <search /> </el-icon>搜索
        </el-button>
      </div>
    </template>
  </base-form>
</template>

<script setup lang="ts">
  import BaseForm from '@/components/BaseForm/index.vue';
  import { ref, watch } from 'vue';
  import { Refresh, Search } from '@element-plus/icons-vue';

  const props = defineProps({
    formConfig: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(['resetQuery', 'SearchOnQueryChange']);

  const formItems = props.formConfig.formItems ?? [];
  const formOriginData: any = {};
  for (const item of formItems) {
    formOriginData[item.field] = '';
  }

  const formData = ref(formOriginData);

  const formRef = ref<InstanceType<typeof BaseForm>>();
  const handleResetClick = () => {
    formRef.value?.setFormData(formOriginData);
    emit('resetQuery');
  };
  const handleSearchClick = () => {
    emit('SearchOnQueryChange', formData.value);
  };
</script>

<style lang="scss" scoped></style>
