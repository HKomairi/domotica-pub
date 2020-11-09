import React, { useEffect, useState } from 'react';
import { Card, Button, Confirm, Form, Icon, Grid, Header, Table, Checkbox } from 'semantic-ui-react';
import axios from "axios";
import { DB_URL } from '../data/db';
import { TimeInput } from 'semantic-ui-calendar-react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const TimeTable = ({control}) => {

    // State
    const [startTime, setStartTime] = useState('00:00');
    const [stopTime, setStopTime] = useState('00:00');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Handlers
    const handleStartTimeChange = (e, {value}) => {
        console.log('starttime: ' + value);
        setStartTime(value);
    }
    const handleStopTimeChange = (e, {value}) => {
        console.log('starttime: ' + value);
        setStopTime(value);
    }
    const handleAddTimeSlot = () => {
        async function patchTimeslotData() {
            try {
                const response = await axios.patch(`${DB_URL}/controls/${control.id}`, { timeslots: [...control.timeslots, { id: control.timeslots.length, start: startTime, stop: stopTime }]});
            } catch (error) {
                console.log("Could not update control! " + error);
            }
        }
        patchTimeslotData();
    }

    // Hooks
    useEffect(() => {
        document.getElementById('starttime').value = startTime;
    }, [startTime]);
    useEffect(() => {
        console.log(control);
    }, []);

    return (
        <Card.Content>
            <Table compact celled fixed singleLine>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Start</Table.HeaderCell>
                    <Table.HeaderCell>End</Table.HeaderCell>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>0</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            
            { control.timeslots.map(timeslot => 
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{timeslot.start}</Table.Cell>
                        <Table.Cell>{timeslot.stop}</Table.Cell>
                        <Table.Cell>{control.intensity}</Table.Cell>
                        <Table.Cell><EditIcon /><DeleteRoundedIcon fontSize="small" onClick={() => setShowConfirmDialog(true)} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            ) }

            <Table.Footer fullWidth>
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
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={handleAddTimeSlot}
                        >
                            Add Time Range
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
            </Table>
        </Card.Content>
    )

}

export default TimeTable;