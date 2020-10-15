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

/**
 * Component for the app. Contains navbar and routing, renders components based on route
 * @extends React.Component
 */
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

    /**
     * A react lifecycle method called when the component did mount.
     * Sets the state of the user's role
     */
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

    /**
     * Calls AuthService method logout
     */
    logOut() {
        AuthService.logout();
    }

    /**
     * Render function for the app
     */
    render() {
        const {currentUser} = this.state;

        return (
            <Router>
                <div className="App">
                    <div className="Header">
                        <Navbar bg="transparent" variant="light">
                            <Navbar.Brand as={Link} to="/home">
                                WorkoutSwap
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                {currentUser &&(
                                <NavItem>
                                    <Nav.Link as={Link} to="/list">
                                        List
                                    </Nav.Link>
                                </NavItem>
                                )}
                                {currentUser &&(
                                <NavItem>
                                    <Nav.Link as={Link} to="/add">
                                        Add
                                    </Nav.Link>
                                </NavItem>
                                )}
                                {currentUser &&(
                                <NavItem>
                                    <Nav.Link as={Link} to="/favorites">
                                        Favorites
                                    </Nav.Link>
                                </NavItem>
                                )}
                                {currentUser ? (
                                        <NavItem>
                                            <Nav.Link as={Link} to="/profile">
                                                Profile
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
                            <Route exact path={["/home", "/"]}>
                                <Home/>
                            </Route>
                            <Route exact path="/list">
                                <List/>
                            </Route>
                            <Route exact path="/add">
                                <Add/>
                            </Route>
                            <Route exact path="/favorites">
                                <Favorites/>
                            </Route>
                        </Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                    </div>
                </div>
            </Router>
        );
    }
}
