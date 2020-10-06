import React from "react";
import Container from "react-bootstrap/Container";

export default class Home extends React.Component {


    render() {
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

                </Container>
            </div>
        )
    }
}