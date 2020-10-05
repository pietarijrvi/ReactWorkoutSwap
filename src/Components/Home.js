import React from "react";
//import {Table} from 'react-bootstrap'
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const apiWorkoutsUrl = "http://localhost:9000/api/v1/workouts/";

export default class Home extends React.Component {
  state = {
    notes: [],
    noteContent: "",
    noteId: ""
  };

  componentDidMount() {
    axios
      .get(apiWorkoutsUrl)
      .then(res => {
        console.log(res);
        this.setState({ notes: res.data.notes });
        console.log("state", this.state.notes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({ noteContent: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("noteIdPost", this.state.noteId);
    const note = {
      content: this.state.noteContent,
      id: this.state.noteId
    };

    axios
      .post(apiWorkoutsUrl, note)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("post error with code", err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("communication error", err.request);
        } else {
          // anything else
          console.log("Post error");
        }
      });
    //window.location.reload();
    return false;
  };

  render() {
    return <p>moro</p>;
  }
}
