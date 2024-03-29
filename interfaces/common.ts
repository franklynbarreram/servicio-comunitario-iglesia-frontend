export interface InputProps {
  name: string;
  onChangeCustom?: any;
  isFill?: boolean;
  title?: string;
  register?: any;
  customPlaceholder?: string;
  rules?: Record<string, unknown>;
  rightImg?: string | undefined;
  isDirty?: any;
  leftImg?: string | undefined;
  InputSelect?: any;
  setValueInput?: any;
  labelVisible?: boolean;
  verifyValue?: any;
  primary?: boolean;
  handleVerification?: any;
  rightClick?: () => void;
  leftClick?: () => void;
  otherStyles?: string;
  isTextArea?: boolean;
  error?: any;
}
