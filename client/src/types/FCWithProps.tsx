export default interface FCWithProps {
  saving: boolean,
  closeCallback: Function,
  [key: string]: string | number | boolean | Function,
}
