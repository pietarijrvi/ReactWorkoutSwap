import React from "react";
import axios from 'axios';

export default class Add extends React.Component {
    state = {
        notes: [],
        noteContent: '',
        noteId: ''
    };

    handleChange = event => {
        this.setState({noteContent: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const note = {
            content: this.state.noteContent,
            id: this.state.noteId
        };

        axios.post('http://localhost:9000/api/json', {note})
            .then(res => {
                console.log(res);
                console.log(res.data);

            });
    };

    render() {
        return (
            <div className="Add">
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