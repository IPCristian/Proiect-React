import { Button, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import firebase from "../../firebase/config"

const DynamicReview: FC = () => {

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [review, setReview] = useState('');

    var navigate = useNavigate();

    const getReview = async (id: any) => {

        const review = await (await firebase.firestore().collection('/reviews').doc(id).get()).data();
        console.log(review);

        if (review != undefined)
        {
            setAuthor(review?.author);
            setTitle(review?.title);
            setUser(review?.reviewAuthor.name);
            setReview(review?.review);
        }
        else
        {
            navigate('/not-found');
        }
        
    }

    getReview(useParams().id);

  const returnToReview = () => {
    navigate('/dashboard');
  }
 

  return(
    <section className="section">
      <div className="container">
      <Button id="back-button" size="large" variant="contained" onClick={returnToReview}>Back to all reviews</Button>
        <Card>
            <div id="review-card">
                <h1 className="title is-size-1 mb-3">{title}</h1>
                <h2 className="review-page-info">written by {author}</h2>
                <h2 className="review-page-info">reviewed by {user}</h2>
                <Typography id="review-page-info-card" className="review-page" variant="body2">{review}</Typography>
            </div>
        </Card>
      </div>
    </section>
  );
}

export default DynamicReview;