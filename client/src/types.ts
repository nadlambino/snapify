export type Any = Record<string, any>

export type FormComponent = {
  saving: boolean,
  closeCallback: Function,
  [key: string]: any,
}

export interface PostType {
  _id: string,
  user: UserType;
  content: string,
  media: [MediaType],
  comments: CommentType[],
  commentsCount: number,
  reacts: ReactType[],
  reactsCount: number,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
}

export interface MediaType {
  _id: string,
  src: string,
  category: string,
  duration: number
}

export interface UserType {
  _id: String,
  firstName: String,
  lastName: String,
  email: String
}

interface ReactType {
  user: string,
  type: string,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
}

export interface CommentType {
  user: UserType,
  content: string,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
}
