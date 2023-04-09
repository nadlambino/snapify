export default interface PostType {
  _id: string,
  user: string;
  content: string,
  comments: CommentType[],
  commentsCount: number,
  reacts: ReactType[],
  reactsCount: number,
  deletedAt: string | null,
  updateAt: string,
  createdAt: string
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
