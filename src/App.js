import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link,
} from "react-router-dom";
import Home from "./Components/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="Header">
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="/home" as={Link} to="/home">
                                WorkoutSwap
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <NavItem eventkey={1} href="/Page">
                                    <Nav.Link as={Link} to="/Page">Page</Nav.Link>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </div>
                    <div className="Main">
                        <Switch>
                            <Route path="/home">
                                <Home />
                            </Route>
                            <Route path="/page">
                                moroo
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}