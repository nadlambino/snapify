import './../../css/comments.css';
import { TextField } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { commentPost } from '../../api/post';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { FormEvent } from 'react';
import useAuth from '../../hooks/auth';
import { useMutation } from 'react-query';

interface Props {
  postId: string;
  newCommentCB: Function;
}

export default function CommentForm({ postId, newCommentCB }: Props) {
  const [comment, setComment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return commentPost({ postId, comment: comment.trim() });
    },
  });

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleCommentSend = (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (isLoading) return;
    if (comment.trim().length) {
      newCommentCB({
        content: comment,
        createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        updateAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        deletedAt: null,
        user: {
          _id: user?._id || '',
          firstName: user?.firstName || 'Someone',
          lastName: user?.lastName || '',
          email: user?.email || '',
        },
      });

      setComment('');
      mutate();
    }
    inputRef.current?.focus();
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleCommentSend}>
        <TextField
          inputRef={inputRef}
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder="Say something..."
          fullWidth
          variant="outlined"
        />
        <button
          onSubmit={handleCommentSend}
          disabled={isLoading}
        >
          <AiOutlineSend
            size={30}
            className="text-gray-400"
          />
        </button>
      </form>
    </div>
  );
}
