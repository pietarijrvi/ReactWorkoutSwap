import React from "react";
//import {Table} from 'react-bootstrap'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

//const apiUrl = 'http://localhost:3001/notes';
const apiUrl = 'http://localhost:9000/api/json';


export default class List extends React.Component {
    state = {
        notes: [],
        noteContent: '',
        noteId: ''
    };



    componentDidMount() {
        axios.get(apiUrl)
            .then(res => {
                console.log(res);
                this.setState({notes: res.data.notes});
                console.log("state", this.state.notes);
            });

    }

    render() {
        return (
            <div className="List">
                <div className="SearchBar">
                    <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                        <ButtonGroup className="mr-2" aria-label="First group">
                            <Button variant="secondary">1</Button>{' '}
                            <Button variant="secondary">2</Button>{' '}
                            <Button variant="secondary">3</Button>{' '}
                            <Button variant="secondary">4</Button>
                        </ButtonGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon">Search</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Search by name"
                                aria-label="Input group example"
                                aria-describedby="btnGroupAddon"
                            />
                        </InputGroup>
                    </ButtonToolbar>
                </div>
                <div className="AccordionList">
                    {this.state.notes.map(note => (
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {note.id}. {note.name}
                                    </Accordion.Toggle>
                                    <Button id="FavoriteButton">Add to favorites</Button>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {note.content}
                                        {note.date}
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