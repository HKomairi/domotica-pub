import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ControlForm from './form';

const RoomSettings = () => {

    const { state } = useLocation();
    console.log(state);
    const [showForm, setShowForm] = useState('false');

    return (
        <div className="roomSettings">
            <h1>{state.room.name}</h1>
            { state.controls.map(control => <p>{control.name}</p>) }
            { showForm == 'true' ? 
                <ControlForm />
                :
                'nothing here'}
            <AddCircleIcon onClick={() => setShowForm('true')}/>
        </div>
    );

}


export default RoomSettings;