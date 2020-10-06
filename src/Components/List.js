import React from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";

const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";


export default class List extends React.Component {

    state = {
        workouts: [],
    };

    componentDidMount() {
        this.setState({filteredContacts: this.state.workouts});
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
        this.setState({description: event.target.value});
        this.setState({workoutSelected: event.target.value});
    };

    render() {


        return (
            <div className="List">

                <div className="AccordionList">
                    <div className="SearchBar">
                        <Form className="SearchBarForm">
                            <Col xs="auto">
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder="Search by name"
                                />
                            </Col>
                            <Col className="CheckboxColumn" xs="auto">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Equipment required"
                                />
                            </Col>
                            <Col xs="auto">
                                <Dropdown className="DropdownFilter">
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Date created
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Newest first</Dropdown.Item>
                                        <Dropdown.Item>Oldest first</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xs="auto">
                                <Button id="ListFilterButton" variant="success" type="submit" className="mb-2">
                                    Filter
                                </Button>
                            </Col>
                        </Form>
                    </div>
                    <div className="Scrollbar">

                        {this.state.workouts.map(workout => (
                            <Accordion defaultActiveKey="1">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            {workout.title}
                                        </Accordion.Toggle>
                                        <div className="divider"/>
                                        <Button id="FavoriteButton">Add to favorites</Button>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {workout.description}<br/><br/>
                                            Workout duration: {workout.duration} minutes<br/>
                                            Equipment required (1 = yes, 0 = no): {workout.equipmentRequired}<br/>
                                            Workout rating: {workout.rating}<br/>
                                            Workout created: {workout.createDate}<br/>
                                            Creators UserID: {workout.createdBy}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}