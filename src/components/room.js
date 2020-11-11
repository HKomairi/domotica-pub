import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { controls } from '../data/controls.json';
import axios from "axios";
import { DB_URL } from '../data/db';
import { Form, Grid } from 'semantic-ui-react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Room = ({ room }) => {

    const roomControls = controls.filter(control => control.room === room.nr);
    const lightControl = roomControls.filter(control => control.type ==='Light');
    const audioControl = roomControls.filter(control => control.type ==='Audio');
    const curtainControl = roomControls.filter(control => control.type === 'Curtain');
    const tempControl = roomControls.filter(control => control.type === 'Temp');
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
        let red = 0;
        let green = 0;
        let blue = 0;
        if (curtainControl.length > 0 && curtainControl[0].value == '0') {
            red = rgbToHex(intensity * (255/20));
            green = rgbToHex(intensity * (255/20));
            blue = rgbToHex(0);
        }
        else {
            red = rgbToHex(255);
            green = rgbToHex(255);
            blue = rgbToHex(255 - intensity * (255/20));
        }
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
                        { tempControl.length > 0 ? tempControl[0].value + '°C' : '' }
                    </div>
                    <div className="musicNote">
                        {
                            audioControl.length > 0 ? audioControl[0].value >= 1 ? <MusicNoteIcon /> : <MusicOffIcon /> : ''
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