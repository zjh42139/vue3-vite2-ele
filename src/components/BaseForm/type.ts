type IFromType = 'input' | 'password' | 'select' | 'datePicker';

interface IOption {
  value: string | number | boolean | object;
  label: string | number;
}

export interface IFormItem {
  field: string;
  type: IFromType;
  label: string;
  rules?: any[];

  placeholder?: string;
  options?: IOption[];
  config?: any;
  hidden?: boolean;
}

export interface IColumnLayout {
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  span?: number;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  columnLayout?: IColumnLayout;
}
