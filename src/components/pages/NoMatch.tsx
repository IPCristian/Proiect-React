import { FC } from 'react';

import image from '../../images/not-found.png'

const NoMatch: FC = () => {
  return(
    <section className="section">
      <div className="container">
        <h1 id="title-homepage" className="title has-text-centered is-size-1 mb-3">Error 404 : Page not Found</h1>
        <img src={image} id="not-found-image"></img>
      </div>
    </section>
  );
}

export default NoMatch;