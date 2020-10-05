import React, {useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";

function ErrorAlert() {
    const [showError, setShowError] = useState(true);

    if (showError) {
        return (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>

        );
    }
    return <Button onClick={() => setShowError(true)}>Show Alert</Button>;

}

function SuccessAlert() {
    const [showSuccess, setShowSuccess] = useState(true);

    if (showSuccess) {
        return (

            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>Nice</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>
        );
    }
        return <Button onClick={() => setShowSuccess(true)}>Show Alert</Button>;

}

export default class Add extends React.Component {
    state = {
        notes: [],
        noteContent: '',
        noteId: '',
        error: false,
        success: false
    };


    handleChange = event => {
        this.setState({noteContent: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("noteIdPost", this.state.noteId);
        const note = {
            content: this.state.noteContent,
            id: this.state.noteId
        };

        axios
            .post(apiWorkoutsUrl, note)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({success: true});
            })
            .catch(err => {
                this.setState({error: true});
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    console.log("post error with code", err.response);
                } else if (err.request) {
                    // client never received a response, or request never left
                    console.log("communication error", err.request);
                } else {
                    // anything else
                    console.log("Post error");
                }
            });
        return false;
    };

    render() {
        return (
            <div className="Add">

                <div className="errorAlert">
                    {this.state.error && <ErrorAlert/>}
                </div>
                <div className="successAlert">
                    {this.state.success && <SuccessAlert/>}
                </div>
                <Form className="AddWorkoutForm" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formWorkoutName">
                        <Form.Label>Workout name</Form.Label>
                        <Form.Control required type="text" placeholder="Name your workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formWorkoutDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required as="textarea" rows="4" placeholder="Explain your workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formWorkoutDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control required type="number" placeholder="Minutes to complete the workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formWorkoutUserId">
                        <Form.Label>UserID</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your UserID"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formEquipmentNeeded">
                        <Form.Check required type="checkbox" label="Check this box if your workout requires equipment"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}