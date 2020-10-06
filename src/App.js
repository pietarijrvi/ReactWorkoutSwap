import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./Components/Home";
import AuthService from "./services/auth.service";

import "bootstrap/dist/css/bootstrap.min.css";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Add from "./Components/Add";
import List from "./Components/List";
import Favorites from "./Components/Favorites";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import BoardUser from "./Components/Board-user";
import BoardModerator from "./Components/Board-moderator";
import BoardAdmin from "./Components/Board-admin";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <Router>
                <div className="App">
                    <div className="Header">
                        <Navbar bg="transparent" variant="light">
                            <Navbar.Brand as={Link} to="/home">
                                WorkoutSwap
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <NavItem>
                                    <Nav.Link as={Link} to="/list">
                                        List
                                    </Nav.Link>
                                </NavItem>
                                <NavItem>
                                    <Nav.Link as={Link} to="/add">
                                        Add
                                    </Nav.Link>
                                </NavItem>
                                <NavItem>
                                    <Nav.Link as={Link} to="/favorites">
                                        Favorites
                                    </Nav.Link>
                                </NavItem>
                                {showModeratorBoard && (
                                    <NavItem>
                                        <Nav.Link as={Link} to="/mod">
                                            Moderator Board
                                        </Nav.Link>
                                    </NavItem>
                                )}
                                {showAdminBoard && (
                                    <NavItem>
                                        <Nav.Link as={Link} to="/admin">
                                            Admin Board
                                        </Nav.Link>
                                    </NavItem>
                                )}
                                {currentUser && (
                                    <NavItem>
                                        <Nav.Link as={Link} to="/user">
                                            User
                                        </Nav.Link>
                                    </NavItem>
                                )}
                                {currentUser ? (
                                        <NavItem>
                                            <Nav.Link as={Link} to="/profile">
                                                {currentUser.username}
                                            </Nav.Link>
                                        </NavItem>
                                ) : (
                                        <NavItem>
                                            <Nav.Link as={Link} to="/login">
                                                Login
                                            </Nav.Link>
                                        </NavItem>
                                )}
                                {currentUser ? (

                                        <NavItem>
                                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                                LogOut
                                            </a>
                                        </NavItem>
                                ) : (
                                        <NavItem>
                                            <Nav.Link as={Link} to="/register">
                                                Sign Up
                                            </Nav.Link>
                                        </NavItem>
                                )}
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
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>
                        <Route path="/admin" component={BoardAdmin}/>
                    </div>
                </div>
            </Router>
        );
    }
}
