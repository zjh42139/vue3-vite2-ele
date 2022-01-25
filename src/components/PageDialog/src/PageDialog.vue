<template>
  <el-dialog v-model="dialogVisible" title="新增用户" width="30%" center destroy-on-close>
    <base-form v-bind="formConfig" ref="formRef" v-model="formData"></base-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import BaseForm from '@/components/BaseForm/index.vue';
  import { useSystemStore } from '@/store/modules/main/system';

  const props = defineProps({
    formConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    currentItem: {
      type: Object,
      required: true,
    },
  });

  const formRef = ref<InstanceType<typeof BaseForm>>();
  let isAdd: any = null;

  const dialogVisible = ref(false);
  const formData = ref<any>({
    name: '',
    realname: '',
    password: '',
    cellphone: '',
  });
  const changeFormData = (newVal: any) => {
    isAdd = Object.keys(newVal).length === 0;
    for (const item of props.formConfig.formItems) {
      formData.value[item.field] = newVal[item.field];
    }
  };

  const systemStore = useSystemStore();
  const handleConfirmClick = () => {
    dialogVisible.value = false;
    if (isAdd) {
      systemStore.createPageItemAction({
        pageName: props.pageName,
        formData: formData.value,
      });
    } else {
      systemStore.editPageItemAction({
        pageName: props.pageName,
        formData: formData.value,
        id: props.currentItem.id,
      });
    }
  };

  defineExpose({
    dialogVisible,
    changeFormData,
  });
</script>

<style lang="scss" scoped></style>
