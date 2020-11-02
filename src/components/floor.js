import React, { useState } from 'react';
import './floor.css';
import Room from './room';
import data from '../data/home.json';
import { useParams } from 'react-router-dom';

const Floor = () => {

    const { nr } = useParams();
    const rooms = data.floors[nr-1].rooms;
    const floor = data.floors[nr-1].name;

    return (
        <div className="floor">
            <h1>{ floor }</h1>
            <div className="rooms">
            { rooms.map(room => <Room room={room} key={room.name}/>) }
            </div>
        </div>
    )

}

export default Floor;