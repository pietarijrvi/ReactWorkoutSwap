import React from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import authHeader from "../services/auth-header";
import authService from '../services/auth.service';

let favoritesUrl;


export default class Favorites extends React.Component {

    state = {
        workouts: [],
    };

    componentDidMount() {
        favoritesUrl = "http://localhost:9000/api/v1/users/" + authService.getCurrentUser().id + "/favorites";
        this.setState({ filteredContacts: this.state.workouts });
        axios.get(favoritesUrl, { headers: authHeader() })
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

    removeWorkout(workoutToRemove) {
        this.setState(prevState => {
            const workouts = prevState.workouts.filter(workout => workout.id !== workoutToRemove);
            return { workouts };
        });
    };

    removeFromFavorites(workoutId) {
        axios.delete(favoritesUrl+"/"+workoutId, {headers: authHeader()} )
            .then(res => {
                this.setState({success: true});
                this.removeWorkout(workoutId);
            }).catch(err => {
            this.setState({error: true});
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
    }

        render() {


            return (
                <div className="List">
                    <div className="SearchBar">
                        <Form className="SearchBarForm">
                            <Col xs="auto">
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder="Search by name"
                                />
                            </Col>
                            <Col xs="auto">
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
                    <div className="AccordionList">
                        {this.state.workouts.map(workout => (
                            <Accordion defaultActiveKey="1">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            {workout.id}. {workout.title}
                                        </Accordion.Toggle>
                                        <Button onClick={() => this.removeFromFavorites(workout.id)} id="FavoriteButton">Remove from favorites</Button>
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
            )
        }
    }