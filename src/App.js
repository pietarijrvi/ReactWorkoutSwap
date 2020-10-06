import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./Components/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Add from "./Components/Add";
import List from "./Components/List";
import Favorites from "./Components/Favorites";


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="Header">
                        <Navbar bg="transparent" variant="light">
                            <Navbar.Brand href="/home" as={Link} to="/home">
                                WorkoutSwap
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <NavItem eventkey={1} href="/list">
                                    <Nav.Link as={Link} to="/list">
                                        List
                                    </Nav.Link>
                                </NavItem>
                                <NavItem eventkey={12} href="/add">
                                    <Nav.Link as={Link} to="/add">
                                        Add
                                    </Nav.Link>
                                </NavItem>
                                <NavItem eventkey={12} href="/favorites">
                                    <Nav.Link as={Link} to="/favorites">
                                        Favorites
                                    </Nav.Link>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </div>
                    <div className="Main">
                        <Switch>
                            <Route path="/home">
                                <Home/>
                            </Route>
                            <Route path="/list">
                                <List/>
                            </Route>
                            <Route path="/add">
                                <Add/>
                            </Route>
                            <Route path="/favorites">
                                <Favorites/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
