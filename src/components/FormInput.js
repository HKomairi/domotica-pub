import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import axios from "axios";
import { DB_URL } from '../data/db';

const FormInput = ({ control }) => {

    const [ value, setValue ] = useState();
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleChangedValue = (value) => {
        console.log('value: ' + value);
        async function patchData() {
            console.log(control.intensity);
            try {
                const response = await axios.patch(`${DB_URL}/controls/${control.id}`, { intensity: control.intensity });
            } catch (error) {
                console.log("Could not update control! " + error);
            }
        }
        patchData();
    }
    useEffect(() => {
        document.getElementById('formInput').addEventListener('mouseup', () => handleChangedValue(value));
    }, [value])

    return (
        
        <div className="forminput" id="formInput">
            { console.log(control.intensity) }
            <Form.Input
                fluid label={`Intensity: ${control.intensity}`}
                min={0}
                max={30}
                name='intensity'
                onChange={handleChange}
                step={2}
                type='range'
                value={control.intensity}
            />
        </div>
    )
}

export default FormInput;