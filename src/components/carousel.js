import React from 'react';
import data from '../data/data.json';
import { RouterCarousel, FallbackPage } from 'react-router-carousel';
import { Route } from 'react-router-dom';
import Floor from './floor';

const Carousel = () => {

    const floors = data.floors;

    const FallbackPage = () => {
        return (
          <div style={{ width: '100%', height: 540 }}>
            <h1>404 page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        )
      };

    return (
        
        <RouterCarousel
            swipeLeftClassName={'router-carousel-zone router-carousel-zone--left'}
            swipeRightClassName={'router-carousel-zone router-carousel-zone--right'}
            fallbackRoute={<FallbackPage />}
            >
            {floors.map(floor => <Route path={`/floor/${floor.nr}`} swipeleft swiperight><Floor /></Route>)};
        </RouterCarousel>
    )
}

export default Carousel;