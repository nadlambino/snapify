export type Any = Record<string, any>

export type FormComponent = {
  saving: boolean,
  closeCallback: Function,
  [key: string]: any,
}
