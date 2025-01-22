export interface FormField {
  controlType: string;
  labelText: string;
  labelFor?: string;
  inputType?: string;
  inputId?: string;
  value?: string;
  options?: string[]
}