import React, { useState } from 'react';
import './floor.css';
import Room from './Room';
import data from '../data/home.json';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

const Floor = () => {
    let i = 0;
    const { nr } = useParams();
    if (nr) i = nr
    else i = 1;
    const rooms = data.floors[i-1].rooms;
    const floor = data.floors[i-1].name;

    return (
        <div className="floor">
            <h1>{ floor }</h1>
            <div className="rooms">
            <Grid align="center">
                { rooms.map(room => <Room room={room} key={room.name}/>) }
            </Grid>
            </div>
        </div>
    )

}

export default Floor;