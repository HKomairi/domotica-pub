import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const ControlForm = ({ loading, onSubmit }) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        low: 0,
        high: 20,
        defaultValue: 0,
        timeSlots: [{
            start: "",
            end: "",
            value: 0
        }],
    });

    const [lightControl, setLightControl] = useState({
        name: "",
        description: "",
        low: 0,
        high: 20,
        defaultValue: 0,
        timeSlots: [{
            start: "",
            end: "",
            value: 0
        }],
    });

    const [tempControl, setTempControl] = useState({
        name: "",
        description: "",
        low: 0,
        high: 20,
        defaultValue: 0,
        timeSlots: [{
            start: "",
            end: "",
            value: 0
        }],
    });

    const [musicControl, setMusicControl] = useState({
        name: "",
        description: "",
        low: 0,
        high: 20,
        defaultValue: 0,
        timeSlots: [{
            start: "",
            end: "",
            value: 0
        }],
    });

    const [curtainControl, setCurtainControl] = useState({
        name: "",
        description: "",
        low: 0,
        high: 20,
        defaultValue: 0,
        timeSlots: [{
            start: "",
            end: "",
            value: 0
        }],
    });

    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
          },
        },
      }));
    
    function valuetext(value) {
        return `${value}°C`;
    }

    const onChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    return (
        <Form onSubmit={() => onSubmit(formData)}>
            <Form.Input
                name="Name"
                label="Name"
                placeholder="A title for this todo"
                value={formData.name}
                onChange={onChange}
            />
            <Form.Input
                name="description"
                label="Beschrijving"
                placeholder='A short description of the task'
                value={formData.description}
                onChange={onChange}
            />
            <TextField
                label="Name"
                id="Name"
                defaultValue=""
                variant="filled"
                size="small"
                />
            <TextField
                label="Description"
                id="Description"
                defaultValue=""
                variant="filled"
                size="small"
                />
            <Typography id="discrete-slider" gutterBottom>
                Temperature
            </Typography>
            <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                />
            <Form.Button content="Submit" />
        </Form>
    )
}

export default ControlForm;