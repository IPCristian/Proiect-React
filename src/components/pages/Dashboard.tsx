import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Button, Card, CardContent, Chip, Divider, getPopoverUtilityClass, Grid, IconButton, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import firebase, { db } from '../../firebase/config'
import DeleteIcon from '@mui/icons-material/Delete'
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ConstructionOutlined } from '@mui/icons-material';

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [reviewList, setReviewList] = useState<any[]>([]);

  var navigate = useNavigate();

  useEffect(() => {

    const getReviews = async () => {
      const data = await firebase.firestore().collection('/reviews').get();

      // Since the retrieved data from the firestore has a lot of information,
      // we map it so that we only get the relevant fields
      setReviewList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }

    getReviews();

    if(success) {
      dispatch<any>(setSuccess(''));
    }
  }, [success, dispatch]);

  const deleteReview = async (id: any) => {
    const reviewDoc = doc(db, "/reviews", id);
    await deleteDoc(reviewDoc);

    // We update the existing reviews
    const data = await firebase.firestore().collection('/reviews').get();
    setReviewList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  }

  return(
    <section className="section">
      <div className="container">
        {needVerification && <Chip size="medium" style={{backgroundColor:'white'}} label="Please verify your email address to 
        gain the ability to submit reviews." variant="outlined" />} 
        <h1 id="dashboard-greet" className="is-size-1">Welcome back, {user?.username}</h1>
        {/*  For each review from the firestore, we create a card */}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {reviewList.map((review) => {

            function viewMore(id: any): void {
              navigate('/reviews/' + id);
            }

          return <Grid item xs={2} sm={4} md={4}><Card className="review" sx={{ width: 400, height: 500}}>
              <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                  {review.title}
              </Typography>
              <Typography id="author" variant="h5"> written by {review.author} </Typography>
              <Typography id="author" variant="h5"> reviewed by {review.reviewAuthor.name} {review.reviewAuthor.id == user?.id && 
                <IconButton id="delete-icon" size="small" onClick={() => deleteReview(review.id)} aria-label="remove review">
                  <DeleteIcon/>
                </IconButton>} 
              </Typography>
              <Typography id="review-text" variant="body1" color="text.secondary">
                {/* If the review's title is long, we don't want the text and the read more button to be outside of the card so
                    we make the displayed text smaller (use less characters from the original text) */}
                {(review.title.length > 15)? ((review.review.length > 50)? review.review.slice(0,200) + "..." : review.review) : 
                ((review.review.length > 50)? review.review.slice(0,300) + "..." : review.review)}
              </Typography>
            </CardContent>
            <Button id="view-button" size="large" variant="contained" onClick={() => viewMore(review.id)}>View More</Button>
          </Card></Grid>;
        })}</Grid>
      </div>
    </section>
  );
}

export default Dashboard;