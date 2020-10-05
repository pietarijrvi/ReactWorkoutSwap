import React from "react";
//import {Table} from 'react-bootstrap'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'

const apiWorkoutsUrl = 'http://localhost:9000/api/v1/workouts/';

export default class Home extends React.Component {
    state = {
        workouts: [],
        noteContent: '',
        noteId: ''
    };



    componentDidMount() {
        axios.get(apiWorkoutsUrl)
            .then(res => {
                console.log(res);
                this.setState({workouts: res.data});
                console.log("state", this.state.workouts);
            }).catch(err => {
                console.log(err);
        });

    }

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

        axios.post(apiWorkoutsUrl, note)
            .then(res => {
                console.log(res);
                console.log(res.data);

            }).catch(err => {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                console.log('post error with code', err.response);
            } else if (err.request) {
                // client never received a response, or request never left
                console.log('communication error', err.request);
            } else {
                // anything else
                console.log("Post error");
            }

        });
        //window.location.reload();
        return false;
    };

    render() {
        return (
            <div className="Home">
                <div className="AccordionList">
                    {this.state.workouts.map(workout => (
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {workout.id}. {workout.title}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {workout.woDesc}
                                        {workout.duration}
                                        {workout.equipmentRequired}
                                        {workout.rating}
                                        {workout.createDate}
                                        {workout.createBy}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Content:
                        <input type='text' name='content' onChange={this.handleChange}/>
                    </label>
                    <button type='submit'>Add</button>
                </form>
            </div>
        )
    }
}