import React, { useEffect, useState } from 'react';
import { Card, Button, Confirm, Form, Icon, Grid, Header } from 'semantic-ui-react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import axios from "axios";
import { DB_URL } from '../data/db';

const LightControl = ({ control, onDelete }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { name, createdAt, description, intensity } = control;
    const [lightIntensity, setLightIntensity] = useState(intensity);

    const handleChangeIntensity = (e) => {
        setLightIntensity(e.target.value);
    }

    useEffect(() => {
        console.log('intensity changed!')
        async function patchData() {
            console.log(intensity);
            try {
                const response = await axios.patch(`${DB_URL}/controls/${control.id}`, { intensity: lightIntensity });
            } catch (error) {
                console.log("Could not update control! " + error);
            }
        }
        patchData();
    }, [lightIntensity])

    return (
        <>
            <Confirm
                open={showConfirmDialog}
                header="You are about to delete this temperature control!"
                content={"Are you sure?"}
                confirmButton="Yes"
                cancelButton="Cancel"
                onCancel={() => setShowConfirmDialog(false)}
                onConfirm={() => onDelete(control.id)}
            />
            <Card>
                <Card.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={13}>
                                <Header>{name}</Header>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <DeleteRoundedIcon fontSize="large" onClick={() => setShowConfirmDialog(true)} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <Card.Description>{description}</Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    <Form.Input
                        fluid label={`Intensity: ${intensity}`}
                        min={0}
                        max={30}
                        name='intensity'
                        onChange={handleChangeIntensity}
                        step={2}
                        type='range'
                        value={intensity}
                    />
                </Card.Content>
            </Card>
        </>
    );
}

const TempControl = ({ tempControl, onDelete, onChangeTemperature }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { title, description, createdAt, done } = tempControl;
    return (
        <>
            <Confirm
                open={showConfirmDialog}
                header="You are about to delete this temperature control!"
                content={"Are you sure?"}
                confirmButton="Yes"
                cancelButton="Cancel"
                onCancel={() => setShowConfirmDialog(false)}
                onConfirm={() => onDelete(tempControl.id)}
            />
            <Card>
                <Card.Content>
                    <Card.Header className={done ? "done" : "null"}>{title}</Card.Header>
                    <Card.Meta>Aangemaakt op: {createdAt ? new Date(createdAt).toDateString() : "Niet ingevuld"}</Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic={done ? true : false} color={done ? 'orange' : 'green'} onClick={() => onChangeTemperature(tempControl.id)}>{done ? "Reactivate" : "Done"}</Button>
                        <Button color='red' onClick={() => setShowConfirmDialog(true)}>Delete</Button>
                    </div>
                </Card.Content>
            </Card>
        </>
    );
}

const AudioControl = ({ audioControl, onDelete, onChangeAudioVolume }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const { title, description, createdAt, done } = audioControl;
    return (
        <>
            <Confirm
                open={showConfirmDialog}
                header="You are about to delete this audio control!"
                content={"Are you sure?"}
                confirmButton="Yes"
                cancelButton="Cancel"
                onCancel={() => setShowConfirmDialog(false)}
                onConfirm={() => onDelete(audioControl.id)}
            />
            <Card>
                <Card.Body>
                    <Card.Title className={done ? "done" : "null"}>{title}</Card.Title>
                    <Card.Subtitle>Aangemaakt op: {createdAt ? new Date(createdAt).toDateString() : "Niet ingevuld"}</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic={done ? true : false} color={done ? 'orange' : 'green'} onClick={() => onChangeAudioVolume(audioControl.id)}>{done ? "Reactivate" : "Done"}</Button>
                        <Button color='red' onClick={() => setShowConfirmDialog(true)}>Delete</Button>
                    </div>
                </Card.Content>
            </Card>
        </>
    );
}

const CurtainControl = ({ control, onDelete, onChangeCurtainPos }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { name, createdAt, description } = control;
    return (
        <>
            <Confirm
                open={showConfirmDialog}
                header="You are about to delete this temperature control!"
                content={"Are you sure?"}
                confirmButton="Yes"
                cancelButton="Cancel"
                onCancel={() => setShowConfirmDialog(false)}
                onConfirm={() => onDelete(control.id)}
            />
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>Aangemaakt op: {createdAt ? new Date(createdAt).toDateString() : "Niet ingevuld"}</Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={() => onChangeCurtainPos(control.id)}>Done</Button>
                        <Button onClick={() => setShowConfirmDialog(true)}>Delete</Button>
                    </div>
                </Card.Content>           
            </Card>
        </>
    );
}

export { LightControl, TempControl, AudioControl, CurtainControl };


