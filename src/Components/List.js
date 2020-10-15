import React from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Dropdown from "react-bootstrap/Dropdown";
import authService from "../services/auth.service";
import authHeader from "../services/auth-header";
import Alert from 'react-bootstrap/Alert'

/**
 * API Call URL for all workouts
 * @type {string}
 */
const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";

/**
 * API Call URL for a specific user's favorites
 * @type {string}
 */
const addFavoritesUrl = "http://localhost:9000/api/v1/users/?/favorites";

/**
 * Component for listing workouts from API. The user can click the workouts to open more information about them.
 * They can also add a workout in their favorites which saves the workout in another list containing only
 * the user's favorites.
 * @extends React.Component
 */
export default class List extends React.Component {

    state = {
        workouts: [],
        searchText: "",
        equipmentRequired: false,
        favorite: false
    };


    /**
     * A react lifecycle method called when the component did mount.
     * Gets 50 workouts from the database
     */
    componentDidMount() {
        this.setState({filteredContacts: this.state.workouts});
        this.searchWorkouts();
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({[name]: value});
    };

    /**
     * Method for success alert when adding to favorites
     */
    onShowAddedFavorite = () => {
        this.setState({favorite: true}, () => {
            window.setTimeout(() => {
                this.setState({favorite: false})
            }, 3000)
        });
    };

    /**
     * Method for error alert when adding to favorites (e.g. workout is already in favorites)
     */
    onShowError = () => {
        this.setState({error: true}, () => {
            window.setTimeout(() => {
                this.setState({error: false})
            }, 3000)
        });
    };

    /**
     * Method for posting a workout into favorites
     * @param workoutId
     */
    addToFavorites(workoutId) {
        const favoritesUrl = addFavoritesUrl.replace("?", authService.getCurrentUser().id);
        axios.post(favoritesUrl, {workoutId: workoutId}, { headers: authHeader() })
            .then(res => {
                this.setState({success: true});
                this.onShowAddedFavorite()
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
    }

    /**
     * Method for filtering the workout list
     */
    searchWorkouts(){
        const searchText = this.state.searchText;
        const equipment = this.state.equipmentRequired ? 1 : 0;
        const limit = 50;
        axios.get(apiWorkoutsUrl, { params: { limit: limit, title:searchText, equipment: equipment} })
            .then(res => {
                console.log(res);
                this.setState({workouts: res.data});
                console.log("state", this.state.workouts);
            }).catch(err => {
            console.log(err);
        });
    }

    /**
     * Render function for the list component
     * @returns the list
     */
    render() {


        return (
            <div className="List">
                {this.state.error && <Alert className="FavoriteErrorAlert" variant="danger" isopen="true">
                    Error adding to favorites!
                </Alert>}
                {this.state.favorite && <Alert className="FavoriteSuccessAlert" variant="success" isopen="true">
                    Added to favorites!
                </Alert>}
                <div className="AccordionList">
                    <div className="SearchBar">
                        <Form className="SearchBarForm">
                            <Col xs="auto">
                                <Form.Control
                                    name="searchText"
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder="Search by name"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col className="CheckboxColumn" xs="auto">
                                <Form.Check
                                    name="equipmentRequired"
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Equipment required"
                                    onChange={this.handleChange}
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
                                <Button onClick={() =>this.searchWorkouts()} id="ListFilterButton" variant="success" className="mb-2">
                                    Search
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
                                        <Button onClick={() => this.addToFavorites(workout.id)} id="FavoriteButton">Add to favorites</Button>
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