import React, { useEffect, useState } from 'react';
import { Card, Button, Confirm, Form, Icon, Grid, Header, Table, Checkbox } from 'semantic-ui-react';
import axios from "axios";
import { DB_URL } from '../data/db';
import { TimeInput } from 'semantic-ui-calendar-react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import TimeslotForm from './TimeslotForm';
import './timeTable.css';
import { Add } from '@material-ui/icons';

const TimeTable = ({control}) => {

    const [startTime, setStartTime] = useState('00:00');
    const [stopTime, setStopTime] = useState('00:00');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showTimeslotForm, setShowTimeslotForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [timeslotId, setTimeslotId] = useState(0);
    const [deleteTimeslot, setDeleteTimeslot] = useState(false);

    const handleDeleteTimeslotClick = (id) => {
        console.log('IN:handleDeleteTimeslotClick');
        let newId = 0;
        control.timeslots.splice(id, 1);
        control.timeslots.map(timeslot => timeslot.id = newId++);
        console.log(control.timeslots);
        patchData();
    }
    const handleShowTimeslotForm = (edit, id) => {
        setEdit(edit);
        setTimeslotId(id);
        setShowTimeslotForm(true);
    }
    const toggleShowTimeslotForm = () => {
        setShowTimeslotForm(!showTimeslotForm);
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

    return (
        <>
        <Card.Content>
            <Table celled fixed singleLine>
            { control.timeslots.length > 0 ?
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Start</Table.HeaderCell>
                        <Table.HeaderCell>End</Table.HeaderCell>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            : '' }
            
            { control.timeslots.map(timeslot => 
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{timeslot.start}</Table.Cell>
                        <Table.Cell>{timeslot.stop}</Table.Cell>
                        <Table.Cell>{timeslot.value}</Table.Cell>
                        <Table.Cell><EditIcon onClick={() => handleShowTimeslotForm(true, timeslot.id)}/><DeleteRoundedIcon fontSize="small" onClick={() => handleDeleteTimeslotClick(timeslot.id)} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            ) }

            <Table.Footer fullWidth>                
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => handleShowTimeslotForm(false)}
                        >
                            Add Timeslot
                        </Button>
                        {showTimeslotForm ? <TimeslotForm toggle={toggleShowTimeslotForm} control={control} id={timeslotId} edit={edit} /> : null}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
            </Table>
        </Card.Content>
        </>
    )

}

export default TimeTable;