import React, { useEffect, useState } from 'react';
import { Card, Button, Confirm, Form, Icon, Grid, Header, Table, Checkbox } from 'semantic-ui-react';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from "axios";
import { DB_URL } from '../data/db';

import TimeTable from './TimeTable';

const LightControl = ({ control, onDelete }) => {
    const { name, description, type, value } = control;
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [controlValue, setControlValue] = useState(value);
    const [applyValue, setApplyValue] = useState(false);
    const [valueChanged, setValueChanged] = useState(false);

    const handleChangeIntensity = (e) => {
        setControlValue(e.target.value);
        setValueChanged(true);
    }

    const handleApplyChange = () => {
        setApplyValue(true);
    }
    const toggleCurtainPos = () => {
        if (controlValue == '1') setControlValue(0);
        else setControlValue(1);
        setApplyValue(true);
    }

    useEffect(() => {
        console.log('Value: ' + value);
        // document.getElementById('intensity').value = value;
    }, [])
    useEffect(() => {
        async function patchData() {
            console.log('lightIntensity: ' + controlValue);
            try {
                const response = await axios.patch(`${DB_URL}/controls/${control.id}`, { value: controlValue });
            } catch (error) {
                console.log("Could not update control! " + error);
            }
        }
        patchData();
    }, [applyValue])

    

    return (
        <>
            <Confirm
                open={showConfirmDialog}
                header="You are about to delete this control!"
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
                { control.type == 'Curtains' ? 
                    <Card.Content>
                        <Button
                            
                            icon

                            primary
                            size='large'
                            onClick={toggleCurtainPos}
                        >
                            { controlValue=='1'? 'Close' : 'Open' }
                        </Button>
                    </Card.Content>
                :
                    <Card.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width="12">
                                    <Form.Input
                                        fluid label={`Intensity: ${controlValue}`}
                                        min={0}
                                        max={type == 'Temp' ? 30 : 20}
                                        name='intensity'
                                        onChange={handleChangeIntensity}
                                        step={1}
                                        type='range'
                                        id='intensity'
                                        value={controlValue} 
                                    />
                                </Grid.Column>
                                <Grid.Column width="1"><CheckCircleIcon fontSize="large" color={valueChanged ? 'action' : 'primary'} onClick={() => handleApplyChange()} /></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>                    
                }
                <TimeTable control={control} />
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


