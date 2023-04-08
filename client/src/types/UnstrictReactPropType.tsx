import { ReactNode } from 'react'

export default interface UnstrictReactPropType {
  children?: String | ReactNode,
  [key: string]: String | Number | ReactNode | Function | void ,
}
