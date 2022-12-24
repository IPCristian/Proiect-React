import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Alert, Button, Input, Stack, TextField } from '@mui/material';
import firebase from '../../firebase/config';


const SubmitPost: FC = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);

  var navigate = useNavigate();

  useEffect(() => {
    return () => {
      if(error) {
        dispatch<any>(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(error) {
      dispatch<any>(setError(''));
    }
    setLoading(true);
    await firebase.firestore().collection('/reviews')
    .add({title: bookTitle, 
        author: bookAuthor, 
        review, 
        reviewAuthor: { name: user?.username, id: user?.id}})
    setLoading(false);
    navigate('/dashboard');
  }

  

  return(
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-1 mb-3">Submit Review</h2>
        <form className="form">
          <Stack direction="column" spacing={6}>
            {error && <Alert severity="error">{error}</Alert>}
            <Input placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.currentTarget.value)} />
            <Input placeholder="Author" value={bookAuthor} onChange={(e) => setBookAuthor(e.currentTarget.value)} />
            <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={6}
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
            />
            <Button id="sign-button" size="large" variant="contained" onClick={submitHandler} disabled={loading}>{loading? "Loading..." : "Submit"}</Button>
          </Stack>
        </form>
      </div>
    </section>
  );
}

export default SubmitPost;