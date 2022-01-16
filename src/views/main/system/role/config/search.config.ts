import { IForm } from '@/components/BaseForm/type';

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
    },
    {
      field: 'createTimeRange',
      type: 'datePicker',
      label: '创建时间',
      placeholder: '请选择创建时间范围',
      config: {
        rangeSeparator: '-',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    },
  ],
};
