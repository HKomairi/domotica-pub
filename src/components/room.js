import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';
import axios from "axios";
import { DB_URL } from '../data/db';
import { Card, Button, Confirm, Form, Icon, Grid, Header } from 'semantic-ui-react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Room = ({ room }) => {
    const roomControls = controls.filter(control => control.room === room.nr);
    const lightControl = roomControls.filter(control => control.type ==='Light');
    const [backgroundColor, setBackgroundColor] = useState();
    const [intensity, setIntensity] = useState(lightControl[0]?lightControl[0].value:0);
    const [applyIntensity, setApplyIntensity] = useState(false);
    const [intensityChanged, setIntensityChanged] = useState(false);
    
    const handleChangeIntensity = (e) => {
        console.log('IN:handleChangeIntensity: ' + e.target.value)
        setIntensity(e.target.value);
        setIntensityChanged(true);
    }

    const handleApplyIntensity = () => {
        setApplyIntensity(true);
    }
    
    const rgbToHex = function (rgb) { 
        console.log('IN rgbToHex - rgb: ' + rgb);
        let hex = Number(Math.round(rgb)).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
    };
    
    let lightColorFromIntensity = function(intensity) {
        console.log('IN lightColorFromIntensity - intensity: ' + intensity);
        var red = rgbToHex(intensity * (255/20));
        var green = rgbToHex(intensity * (255/20));
        var blue = rgbToHex(0);
        return red+green+blue;
    };

    useEffect(() => {
        if (lightControl.length > 0) {
            setBackgroundColor('#'+lightColorFromIntensity(intensity));
            document.getElementById('intensity').label = 'Intensity: ' + intensity;
        }
    }, [intensity])

    useEffect(() => {
        if (lightControl.length > 0) {
            setBackgroundColor('#'+lightColorFromIntensity(lightControl[0].value));
            // document.getElementById('intensity').value = lightControl[0].intensity;
            // console.log('background-color: ' + lightColorFromIntensity(lightControl[0].value))
            // console.log('intensity: ' + lightControl[0].value)
        }
    }, [])
    useEffect(() => {
        if (lightControl.length > 0) {
            async function patchData() {
                try {
                    const response = await axios.patch(`${DB_URL}/controls/${lightControl[0].id}`, { value: intensity });
                } catch (error) {
                    console.log("Could not update control! " + error);
                }
            }
            patchData();
        }
    }, [applyIntensity])
    
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
                        <div>  
                        <Grid>    
                            <Grid.Row>
                                <Grid.Column width="12">
                                    <Form.Input
                                        fluid label={`Intensity: ${intensity}`}
                                        min={0}
                                        max={20}
                                        name='intensity'
                                        onChange={handleChangeIntensity}
                                        step={1}
                                        type='range'
                                        id='intensity' 
                                        value={intensity} 
                                    />
                                </Grid.Column>
                                <Grid.Column width="1"><CheckCircleIcon fontSize="small" color={intensityChanged ? 'action' : 'primary'} onClick={() => handleApplyIntensity()} /></Grid.Column>
                            </Grid.Row>
                        </Grid>               
                            
                            </div>
                            : ''}
                    </div>       
            </div>
        </div>
    )

}

export default Room;