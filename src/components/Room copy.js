import React, { useState } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';
import { Card } from 'semantic-ui-react';

const Room = ({ room }) => {

    const roomControls = controls.filter(control => control.room == room.nr);
    console.log(roomControls);

    return (
        <Link
            to={{
                pathname: `/room/${room.nr}`,
                state: { room: room, roomControls }
            }}
            >
            <div className="room">
                {room.name}
                <div className="temperature">
                    {room.temperature}°C
                </div>
                <div className="musicNote">
                    {
                        room.music == 'true' ? <MusicNoteIcon /> : <MusicOffIcon />
                    }
                </div>
            </div>
        </Link>
    )

}

export default Room;