import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";

export default class Add extends React.Component {
    state = {
        id: '',
        workouts: [],
        title: "",
        description: "",
        duration: 0,
        equipmentRequired: true,
        rating: 0,
        createdBy: 0,
        error: false,
        success: false,
    };

    onShowError = () => {
        this.setState({error: true}, () => {
            window.setTimeout(() => {
                this.setState({error: false})
            }, 2000)
        });
    };

    onShowSuccess = () => {
        this.setState({success: true}, () => {
            window.setTimeout(() => {
                this.setState({success: false})
            }, 2000)
        });
    };

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({[name]: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const note = {
            id: this.state.id,
            description: this.state.description,
            title: this.state.title,
            duration: this.state.duration,
            equipmentRequired: this.state.equipmentRequired,
            rating: this.state.rating,
            createdBy: this.state.createdBy,
        };

        axios.post(apiWorkoutsUrl, note)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({success: true});
                this.onShowSuccess()
            }).catch(err => {
            this.setState({error: true});
            this.onShowError();
            if (err.response) {
                this.setState({errorMessage: err.response});
                // client received an error response (5xx, 4xx)
                console.log('post error with code', err.response);
            } else if (err.request) {
                this.setState({errorMessage: err.request});
                // client never received a response, or request never left
                console.log('communication error', err.request);
            } else {
                this.setState({errorMessage: 'Oops! Try again'});
                console.log("Post error");
            }

        });
        return false;
    };

    render() {
        return (
            <div className="Add">
                {this.state.error && <Alert variant="danger" isopen="true">
                    Error!
                </Alert>}
                {this.state.success && <Alert variant="success" isopen="true">
                    Success!
                </Alert>}

                <Form className="AddWorkoutForm" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formWorkoutName">
                        <Form.Label>Workout name</Form.Label>
                        <Form.Control name="title" required type="text" placeholder="Name your workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formWorkoutDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" required as="textarea" rows="4"
                                      placeholder="Explain your workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formWorkoutDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control name="duration" required type="number"
                                      placeholder="Minutes to complete the workout"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formWorkoutUserId">
                        <Form.Label>UserID</Form.Label>
                        <Form.Control name="createdBy" required type="text" placeholder="Enter your UserID"
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formEquipmentNeeded">
                        <Form.Check name="equipmentRequired" type="checkbox" checked={this.state.equipmentRequired}
                                    label="Check this box if your workout requires equipment"
                                    onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="SubmitForm">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}