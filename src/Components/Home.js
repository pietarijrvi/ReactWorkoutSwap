import React from "react";

import UserService from "../services/user.service";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        const {currentUser} = this.state;
        return (
            <div className="Home">
                <Container id="HomepageContainer">

                    <h1 id="HomeHeader">WorkoutSwap</h1>
                    <h5>
                        Vaihda treeniohjelmia muiden käyttäjien kanssa
                    </h5>
                    <br/>
                    <h5>
                        Lisää mieluisimmat suosikkeihisi ja tarkastele niitä omalla sivulla
                    </h5>
                    <br/>
                    <h5>
                        Hae päiväyksen, otsikon tai välinetarpeen perusteella
                    </h5>
                    <br/>
                    {!currentUser &&(
                        <div>
                    <Button id="LoginButton" href="/login">Login</Button> <Button id="RegisterButton" href="/register">Sign up</Button>
                        </div>
                        )}
                </Container>
            </div>
        )
    }
}