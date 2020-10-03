import React from "react";
import {Table} from 'react-bootstrap'
import axios from 'axios';

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
                <Table striped bordered hover size="sm" variant='dark'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.notes.map(note => (
                        <tr>
                            <td>{note.id}</td>
                            <td>{note.content}</td>
                            <td>{note.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
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