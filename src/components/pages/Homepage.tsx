import { FC } from 'react';

const Homepage: FC = () => {
  return(
    <section className="section">
      <div className="container">
        <h1 id="title-homepage" className="title has-text-centered is-size-1 mb-3">Welcome to Booker</h1>
        <h2 className="homepage-text">Booker is a free online website for all of your Book review needs.
         Been eyeing a book for a while but don't know if it's worth investing a ton of hours into a cliché story?
          Booker has got you covered! View over 1 million reviews already present on our website and decide for yourself.
           Or maybe you just want to say how much you hated the ending of the last criminal novel you read?
            Just sign up or log into your account and post all of your thoughts for other people to see and judge.
        </h2>
      </div>
    </section>
  );
}

export default Homepage;