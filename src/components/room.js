import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';

const Room = ({ room }) => {

    const roomControls = controls.filter(control => control.room == room.nr);
    const lightControl = roomControls.filter(control => control.type ==='Light');
    const [backgroundColor, setBackgroundColor] = useState();
    
    var rgbToHex = function (rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };

    let lightColorFromIntensity = function(intensity) {
        let r = intensity * (255/30);
        let g = intensity * (255/30);
        let b = 0;
        var red = rgbToHex(r);
        var green = rgbToHex(g);
        var blue = rgbToHex(b);
        return red+green+blue;
      };
    
    useEffect(() => {
        if (lightControl.length > 0) {
            let color = lightColorFromIntensity(lightControl[0].intensity);
            console.log(color);
            setBackgroundColor('#'+color);
        }
    }, [])

    return (
        <div>
            <Link
                to={{
                    pathname: `/room/${room.nr}`,
                    state: { room: room, roomControls }
                }}
                >
                <div className="room" style={{ background: backgroundColor}}>
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
        </div>
    )

}

export default Room;