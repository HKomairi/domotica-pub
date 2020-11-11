import React, { useEffect, useState } from 'react';
import { Card, Loader, Header, Container } from "semantic-ui-react";
import axios from "axios";
import { DB_URL } from '../data/db';
import Control from './Control';
import { useParams } from 'react-router-dom';

const ControlList = (props) => {
    const [loading, setLoading] = useState(false);
    const [controls, setControls] = useState();
    const { nr } = useParams();

    const getAllControls = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${DB_URL}/controls`);
            setControls(response.data.filter(control => control.room === nr));
            console.log(nr);
            response.data.filter(control => console.log(control.room));
        } catch (error) {
            console.log("Could not load controls! " + error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllControls();
    }, []);

    const deleteControl = async (id) => {
        try {
            const response = await axios.delete(`${DB_URL}/controls/${id}`);
            getAllControls();
        } catch (error) {
            console.error("Could not delete:" + error);
        }
    }

    const getControlById = (id) => controls.find(control => control.id === id);

    return (
        <>
            <Container>
                {loading && <Loader active={true} />}
                <Header>List of all Controls</Header>
                {!loading && controls && controls.length === 0 &&
                    <p>You haven't added any controls for this room yet!</p>
                }
                {controls &&
                    <Card.Group>
                        {controls.map((control) => {
                            return <Control key={control.id} control={control} onDelete={deleteControl} />                        }
                        )}
                    </Card.Group>
                }
            </Container>
        </>

    );
}

export default ControlList;