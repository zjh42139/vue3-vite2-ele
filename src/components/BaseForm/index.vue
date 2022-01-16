<template>
  <div class="base-form">
    <div class="form-header">
      <slot name="header"></slot>
    </div>
    <el-form ref="formRef" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="columnLayout">
            <el-form-item :label="item.label" :rules="item.rules" class="px-10 py-2.5">
              <template v-if="['input', 'password'].includes(item.type)">
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.config"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                  v-bind="item.config"
                  class="w-full"
                >
                  <el-option
                    v-for="optionItem in item.options"
                    :key="optionItem.value"
                    :label="optionItem.label"
                    :value="optionItem.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker v-model="formData[item.field]" type="daterange" v-bind="item.config" class="w-full">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref, watch } from 'vue';
  import { IColumnLayout, IFormItem } from './type';
  import type { ElForm } from 'element-plus';

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    columnLayout: {
      type: Object as PropType<IColumnLayout>,
      default: () => ({
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const formData = ref({ ...props.modelValue });
  watch(
    () => formData,
    (formData) => {
      console.log(formData.value, props.modelValue);
      emit('update:modelValue', formData.value);
    },
    {
      deep: true,
    },
  );
  const formRef = ref<InstanceType<typeof ElForm>>();
  const setFormData = (val: Object) => {
    formData.value = val;
  };
  defineExpose({
    setFormData,
  });
</script>

<style lang="scss" scoped>
  .base-form {
    :deep(.el-date-editor) {
      width: 100%;
    }
  }
</style>
