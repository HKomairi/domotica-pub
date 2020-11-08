import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ControlForm from './ControlForm';
import axios from 'axios';
import { DB_URL } from '../data/db';
import { useHistory, useParams } from 'react-router-dom';

const AddControl = (props) => {
    const history = useHistory();
    const { nr } = useParams();
    const addControl = async (controlData) => {
        const { title, description, type, name } = controlData;
        const now = new Date().getTime();
        console.log('test');
        console.log(props.roomnumber);
        
        try {
            const response = await axios.post(`${DB_URL}/controls`, { title, description, type:type, room: nr, name: name, intensity:0, createdAt: now, updatedAt: now });
            history.goBack();
        } catch (error) {
            console.error("Could not create new control:" + error);
        }
        history.pop();
    }


    return (
        <Container style={{ padding: "50px" }}>
            <Header>Add a new control</Header>
            <ControlForm loading="false" onSubmit={addControl} />
        </Container>
    )
}

export default AddControl;