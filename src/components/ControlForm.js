import React, { useState } from "react";
import { Form } from 'semantic-ui-react';

const ControlForm = ({ loading, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "",
        name: ""
    })


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
                <Form.Input
                    name="type"
                    label="Control type"
                    placeholder='The control to be added to this room'
                    value={formData.type}
                    onChange={onChange}
                />
                <Form.Button content="Submit" />
            </Form>
        </div>
    )
}

export default ControlForm;