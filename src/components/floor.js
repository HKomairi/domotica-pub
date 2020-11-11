import React, { useEffect, useState } from 'react';
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
            { localStorage.getItem('renderStyle') === 'list' ?
            <Grid align="center">
                { rooms.map(room => <Room room={room} key={room.name}/>) }
            </Grid>
            : rooms.map(room => <div className="room" style={{top:room.x, left:room.y, width:room.width, height:room.height, position:'absolute', border:'none'}}> <Room room={room} key={room.name}/> </div>) }
            </div>
        </div>
    )

}

export default Floor;