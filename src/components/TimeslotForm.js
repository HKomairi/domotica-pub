import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';
import axios from "axios";
import { DB_URL } from '../data/db';

const TimeslotForm = ({toggle, control, id, edit}) => {

    const { name, description, type, value } = control;

    // State
    const [startTime, setStartTime] = useState('00:00');
    const [stopTime, setStopTime] = useState('00:00');
    const [controlValue, setControlValue] = useState(value);
    const [valueChanged, setValueChanged] = useState(false);

    const handleChangeValue = (e) => {
        setControlValue(e.target.value);
        setValueChanged(true);
    }

    // Handlers
    const handleStartTimeChange = (e, {value}) => {
        console.log('starttime: ' + value);
        setStartTime(value);
    }
    const handleStopTimeChange = (e, {value}) => {
        console.log('stoptime: ' + value);
        setStopTime(value);
    }
    const handleCommitTimeSlot = () => {
        if (edit) {
            editTimeslot();
        }
        else {
            addTimeslot();
        }
        toggle();
    }
    const editTimeslot = () => {
        control.timeslots
            .filter(timeslot => timeslot.id == id)
            .map(timeslot => { 
                timeslot.start = startTime;
                timeslot.stop = stopTime;
                timeslot.value = controlValue;
                console.log('This is the starttime: ' + timeslot.start)
            });
        patchData();
    }
    const addTimeslot = () => {
        control.timeslots = [ ...control.timeslots, { id: control.timeslots.length, start: startTime, stop: stopTime, value: controlValue }];
        patchData();
    }
    const patchData = () => {
        async function patchTimeslotData() {
            try {
                const response = await axios.patch(`${DB_URL}/controls/${control.id}`, { timeslots: control.timeslots});
            } catch (error) {
                console.log("Could not update control! " + error);
            }
        }
        patchTimeslotData();
    }

    useEffect(() => {
        if (edit) {
            setStartTime(control.timeslots[id].start);
            setStopTime(control.timeslots[id].stop);
            setControlValue(control.timeslots[id].value);
        }
    },[])

    return (
        <div className="modal">
            <div className="modal_content">
                <Table>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <TimeInput
                                name="starttime"
                                id="starttime"
                                placeholder="Start time"
                                iconPosition="left"
                                value={startTime + ' (start)'}
                                onChange={handleStartTimeChange}
                                />
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <TimeInput
                                name="endtime"
                                id="endtime"
                                placeholder="End time"
                                iconPosition="left"
                                value={stopTime + ' (end)'}
                                onChange={handleStopTimeChange}
                                />
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Form.Input
                                fluid label={`Intensity: ${controlValue}`}
                                min={0}
                                max={type == 'Temp' ? 30 : 20}
                                name='intensity'
                                onChange={handleChangeValue}
                                step={1}
                                type='range'
                                id='intensity'
                                value={controlValue} 
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button.Group>
                            <Button
                                floated='left'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => toggle()}
                            >
                                Cancel
                            </Button>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={handleCommitTimeSlot}
                            >
                                { edit ? 'Edit' : 'Add' }
                            </Button>
                            </Button.Group>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table>
            </div>
        </div>
        
    )
}

export default TimeslotForm;