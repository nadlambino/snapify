export default interface PostType {
  _id: string,
  user: UserType;
  content: string,
  comments: CommentType[],
  commentsCount: number,
  reacts: ReactType[],
  reactsCount: number,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
}

interface UserType {
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

interface CommentType {
  user: string,
  content: string,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
}
