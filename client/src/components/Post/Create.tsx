import { Grid, TextField, Alert } from '@mui/material';
import { createPost } from '../../api/post';
import Dropzone from '../Reusable/Dropzone';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReloadPosts } from '../../store/modules/post';
import { FormComponent } from '../../types';
import { useMutation } from 'react-query';

const Create: React.FC<FormComponent> = (props) => {
  const [media, setMedia] = useState([]);
  const [caption, setCaption] = useState('');
  const { saving } = props;
  const [error, setError] = useState('');
  const { closeCallback, failedSave } = props;
  const dispatch = useDispatch();
  const limit = 200;
  const { mutate, isLoading, isSuccess, isError, data } = useMutation({
    mutationFn: (formData: FormData) => {
      return createPost(formData);
    },
  });

  useEffect(() => {
    if (!isLoading && isError) {
      failedSave();
      setError('Something went wrong. Please try again later.');
    }
    if (data && isSuccess && !isLoading) {
      closeCallback();
      dispatch(setReloadPosts(true));
    }
  }, [isLoading, isSuccess, isError, data]);

  useEffect(() => {
    if (saving === true) {
      handlePostSubmit();
    }
  }, [saving]);

  const handleCaptionChange = (value: string) => {
    if (value.length <= limit || value.length < caption.length) {
      setCaption(value);
    }
  };

  const handlePostSubmit = async () => {
    setError('');
    if (media.length === 0) {
      setError(`Please select an image or video to post`);
      failedSave();
      return;
    }

    const formData = new FormData();
    await media.map((file) => formData.append(`files`, file));
    formData.append('content', caption);

    mutate(formData);
  };

  return (
    <Grid
      container
      gap={5}
      padding={2}
      justifyContent="space-between"
    >
      {error && (
        <Alert
          severity="error"
          className="w-full"
        >
          {error}
        </Alert>
      )}
      <Dropzone setMedia={setMedia} />
      <div className="w-full">
        <TextField
          value={caption}
          multiline
          maxRows={4}
          variant="standard"
          label="Caption"
          fullWidth
          onChange={(e) => handleCaptionChange(e.target.value)}
        />
        <small className="text-gray-500 w-full text-right block">
          {caption.length}/{limit}
        </small>
      </div>
    </Grid>
  );
};

export default Create;
