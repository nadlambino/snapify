import { ReactNode } from 'react'

export default interface UnstrictReactPropType {
  children?: ReactNode,
  [key: string]: String | Number | ReactNode,
}
