import React, { Component } from 'react';
import { Container,Row,Col } from 'reactstrap';


export default class Header extends Component {

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        
            <Container>
                <Row>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} /> 
                </Row>
          </Container>

      </header>
    );
  }
}
