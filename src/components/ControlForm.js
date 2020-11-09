import React, { useState } from "react";
import { Form } from 'semantic-ui-react';

const ControlForm = ({ loading, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        name: ""
    })
    const options = [
        { key: '0', text: 'Audio', value: 'Audio' },
        { key: '1', text: 'Curtain', value: 'Curtain' },
        { key: '2', text: 'Light', value: 'Light' },
        { key: '3', text: 'Temp', value: 'Temp' },
    ]

    const onChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    return (
        <div>
            <Form onSubmit={() => onSubmit(formData)}>
                <Form.Input
                    name="name"
                    label="Control name"
                    placeholder='The name of the control to be added to this room'
                    value={formData.name}
                    onChange={onChange}
                />
                <Form.Input
                    name="description"
                    label="Control description"
                    placeholder='A short description of the task'
                    value={formData.description}
                    onChange={onChange}
                />
                <Form.Select
                    name="type"
                    label="Control type"
                    options={options}
                    placeholder='The control to be added to this room'
                    onChange={onChange}
                />
                <Form.Button content="Submit" />
            </Form>
        </div>
    )
}

export default ControlForm;