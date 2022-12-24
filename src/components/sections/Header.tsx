import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { logOut, needVerification } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Button, Stack} from '@mui/material'
import image from "../../images/logo.png"

const Header: FC = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { authenticated, needVerification } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch<any>(logOut());
  }

  return(
    <nav className="navbar is-spaced is-link">
      <div className="container">
        <div className="navbar-brand">
          <img src={image} width="100" height="28"></img>
          <Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}>Booker</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-items">
            {!authenticated ? <div className="buttons">
              {/* If we're not logged in then we only provide the Sign Up and Sign In buttons */}
              <Stack direction="row" spacing={4}>
                <Button className="button" size="large" variant="contained" onClick={() => history('/signup')}>Sign up</Button>
                <Button className="button" size="large" variant="contained" onClick={() => history('/signin')}>Sign in</Button>
              </Stack>
              </div>
              :
              // If we are, we provide the Sign Out and, if the account is verified, the Submit Post button 
              <Stack direction="row" spacing={4}>
                <Button className="button" size="large" variant="contained" onClick={logoutClickHandler}>Sign out</Button>
                {!needVerification && <Button className="button" size="large" variant="contained" onClick={() => history('/submit-post')}>Submit Review</Button>}
                </Stack>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;