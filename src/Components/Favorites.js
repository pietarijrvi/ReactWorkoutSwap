import React from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import authHeader from "../services/auth-header";
import authService from '../services/auth.service';

let favoritesUrl;

/**
 * Component for the favorite list
 * @component
 * @extends React.Component
 */
export default class Favorites extends React.Component {

    state = {
        workouts: [],
    };

    /**
     * A react lifecycle method called when the component did mount.
     * Gets favorites from the database
     */
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

    /**
     * Method used in removing a workout from favorites
     * @param workoutToRemove - workout that the user wants to remove from favorites
     */
    removeWorkout(workoutToRemove) {
        this.setState(prevState => {
            const workouts = prevState.workouts.filter(workout => workout.id !== workoutToRemove);
            return { workouts };
        });
    };

    /**
     * Method for removing a workout from the user's favorites. Deletes the workout from the favorites table in the database.
     * @param workoutId - Id of the workout that the user wants to remove from favorites
     */
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

    /**
     * Render function for the favorites list
     * @returns div with favorites list
     */
    render() {


            return (
                <div className="List">

                    <div className="AccordionList">
                        <div className="Scrollbar">

                            {this.state.workouts.map(workout => (
                                <Accordion defaultActiveKey="1">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                {workout.title}
                                            </Accordion.Toggle>
                                            <div className="divider"/>
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

                </div>
            )
        }
    }