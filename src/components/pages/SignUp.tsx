import { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setError, signUp } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Alert, Button, Input, Stack } from '@mui/material';

const SignUp: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if(error) {
        dispatch<any>(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if(error) {
      dispatch<any>(setError(''));
    }
    setLoading(true);
    dispatch<any>(signUp({ email, password, username }, () => setLoading(false)));
  }

  return(
    <section className="section">
      <div className="container">
      <h2 className="has-text-centered is-size-1 mb-3">Sign Up</h2>
        <form className="form">
          <Stack direction="column" spacing={6}>
            {error && <Alert severity="error">{error}</Alert>}
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
            <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
            <Button id="sign-button" size="large" variant="contained" onClick={submitHandler} disabled={loading}>{loading? "Loading..." : "Sign up"}</Button>
          </Stack>
        </form>
      </div>
    </section>
  );
}

export default SignUp;