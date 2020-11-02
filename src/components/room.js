import React, { useState } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';

const Room = ({ room }) => {

    const roomControls = controls.filter(control => control.room == room.nr);
    console.log(roomControls);

    return (
        <div className="room">
            <Link
                to={{
                    pathname: `/room/${room.nr}`,
                    state: { room: room, roomControls }
                }}
                >
                <div className="room">
                    {room.name}
                    <div className="temperature">
                        {room.temperature}
                    </div>
                    <div className="musicNote">
                        {
                            room.music == 'true' ? <MusicNoteIcon /> : <MusicOffIcon />
                        }
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default Room;