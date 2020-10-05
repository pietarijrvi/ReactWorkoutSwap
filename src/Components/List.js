import React from "react";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";


export default class List extends React.Component {

    state = {
        workouts: [],
    };

    componentDidMount() {
        this.setState({ filteredContacts: this.state.workouts });
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
                <div className="SearchBar">
                    <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon">Search</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Search by name"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                                className="FilterByName"
                                onChange={e => this.handleChange(e)}
                            />
                        </InputGroup>
                    </ButtonToolbar>
                </div>
                <div className="AccordionList">
                    {this.state.workouts.map(workout => (
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {workout.id}. {workout.title}
                                    </Accordion.Toggle>
                                    <Button id="FavoriteButton">Add to favorites</Button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {workout.description}
                                        {workout.duration}
                                        {workout.equipmentRequired}
                                        {workout.rating}
                                        {workout.createDate}
                                        {workout.createdBy}
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