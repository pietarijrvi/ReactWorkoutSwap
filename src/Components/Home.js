import React from "react";
//import {Table} from 'react-bootstrap'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'

//const apiUrl = 'http://localhost:3001/notes';
const apiUrl = 'http://localhost:9000/api/json';

export default class Home extends React.Component {
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

    handleChange = event => {
        this.setState({noteContent: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const note = {
            content: this.state.noteContent,
            id: this.state.noteId
        };

        axios.post('http://localhost:3001/notes', {note})
            .then(res => {
                console.log(res);
                console.log(res.data);

            });
        window.location.reload();
        return false;
    };

    render() {
        return (
            <div className="Home">
                <div className="AccordionList">
                    {this.state.notes.map(note => (
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {note.id}. {note.name}
                                    </Accordion.Toggle>
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