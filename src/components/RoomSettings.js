import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ControlList from './ControlList';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const RoomSettings = () => {

    let history = useHistory();
    const { state } = useLocation();
    console.log(state);

    const routeChange = () => {
        let path = `/room/${state.room.nr}/add`;
        history.push(path);
    }

    return (
        <div className="roomSettings">
            { state ? 
            <Container>
                <h1>{state.room.name}</h1>
                <ControlList className="cards" roomnumber={state.room.nr} room={`/room/${state.room.nr}`} />
                <AddCircleIcon fontSize="large" onClick={() => routeChange() }/>
            </Container> : ''}
        </div>
    );

}


export default withRouter(RoomSettings);