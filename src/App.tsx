import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/sections/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import firebase from './firebase/config';
import { getUserByID, setLoading, needVerification } from './store/actions/authActions';
import { PrivateRoute } from './components/routes/private-route';
import { RestrictedRoute } from './components/routes/restricted-route';
import image from './images/background.png'
import SubmitPost from './components/pages/SubmitPost';
import NoMatch from './components/pages/NoMatch';
import DynamicReview from './components/pages/DynamicReview';

const App: FC = () => {
  const dispatch = useDispatch();

  // Check if user exists
  useEffect(() => {
    dispatch<any>(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        dispatch<any>(setLoading(true));
        await dispatch<any>(getUserByID(user.uid));
        // Check if user verified email after account creation
        if(!user.emailVerified) {
          dispatch<any>(needVerification());
        }
      }
      dispatch<any>(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  var style_homepage = {
    backgroundImage: `url(${image})`, 
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  }

  var style_dashboard = {
    backgroundImage: `url(${image})`, 
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto"
  }

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={
                <div id="background" style={style_homepage}><RestrictedRoute><Header /><Homepage/></RestrictedRoute></div>}/> 
            <Route path={"/signup"} element={<RestrictedRoute><Header /><SignUp/></RestrictedRoute>}/>
            <Route path={"/signin"} element={<RestrictedRoute><Header /><SignIn/></RestrictedRoute>} />
            <Route path={"/forgot-password"} element={<RestrictedRoute><Header /><ForgotPassword/></RestrictedRoute>} />
            <Route path="/dashboard" element={<div style={style_dashboard}><PrivateRoute><Header /><Dashboard/></PrivateRoute></div>}/>
            <Route path="/submit-post" element={<PrivateRoute><Header /><SubmitPost/></PrivateRoute>}/>
            <Route path="/reviews/:id" element={<div  style={style_homepage}><Header /><DynamicReview/></div>}/>
            <Route path="*" element={<div  style={style_homepage}><Header /><NoMatch /></div>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;