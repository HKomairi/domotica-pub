import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';
import axios from "axios";
import { DB_URL } from '../data/db';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Form } from 'semantic-ui-react';

const Room = ({ room }) => {

    const roomControls = controls.filter(control => control.room === room.nr);
    const lightControl = roomControls.filter(control => control.type ==='Light');
    const [backgroundColor, setBackgroundColor] = useState();
    const [intensity, setIntensity] = useState();
    
    const handleChangeIntensity = (e) => {
        console.log('IN:handleChangeIntensity: ' + e.target.value)
        setIntensity(e.target.value);
    }
    
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
        console.log('useEffect intensity:' + intensity)
        if (lightControl.length > 0) {
            let color = lightColorFromIntensity(intensity);
            console.log(color);
            setBackgroundColor('#'+color);
        }
        return (
            async () => {
                try {
                    const response = await axios.patch(`${DB_URL}/controls/${lightControl[0].id}`, { intensity: intensity });
                } catch (error) {
                    console.log("Could not update control! " + error);
                }
            }
        )
    }, [intensity])
    useEffect(() => {
        if (lightControl.length > 0) {
            console.log('useEffect ' + lightControl[0].intensity)
            let color = lightColorFromIntensity(lightControl[0].intensity);
            console.log(color);
            setBackgroundColor('#'+color);
        }
    }, [])
    
    return (
        <div>
            <div className="room" style={{ background: backgroundColor}}>
                <Link
                    to={{
                        pathname: `/room/${room.nr}`,
                        state: { room: room, roomControls }
                    }}
                    >
                    {room.name}</Link>
                    <div className="temperature">
                        {room.temperature}°C
                    </div>
                    <div className="musicNote">
                        {
                            room.music == 'true' ? <MusicNoteIcon /> : <MusicOffIcon />
                        }
                    </div>
                    <div className="slider">
                        {lightControl.length > 0 ?
                            /*
                            <div>
                                {console.log(lightControl[0].intensity)}
                                <Typography id="continuous-slider" gutterBottom>
                                    Light intensity
                                </Typography>
                                <Slider
                                    label="Light intensity"
                                    min={0}
                                    step={2}
                                    max={30}
                                    onChangeCommitted={handleChangeIntensity}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    value={lightControl[0].intensity}
                                />
                            </div>
                           */
                           
                            <Form.Input
                                fluid label={`Intensity: ${lightControl[0].intensity}`}
                                min={0}
                                max={30}
                                name='intensity'
                                onChange={handleChangeIntensity}
                                step={2}
                                type='range'
                                value={lightControl[0].intensity}
                            /> : ''}
                    </div>       
            </div>
        </div>
    )

}

export default Room;