import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Alert, Button, Input, Stack } from '@mui/material';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if(error) {
        dispatch<any>(setError(''));
      }
      if(success) {
        dispatch<any>(setSuccess(''));
      }
    }
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(success) {
      dispatch<any>(setSuccess(''));
    }
    if(error) {
      dispatch<any>(setError(''));
    }
    // We enter a state of loading until the reset email is sent succesfully
    setLoading(true);
    await dispatch<any>(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  }

  return(
    <section className="section">
      <div className="container">
      <h2 className="has-text-centered is-size-1 mb-3">Reset Password</h2>
        <form className="form">
          <Stack direction="column" spacing={6}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <Button  size="large" variant="contained" onClick={submitHandler} disabled={loading}>{loading? "Loading..." : "Send password reset email"}</Button>
          </Stack>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;