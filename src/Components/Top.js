import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Top extends Component {

    onLogin(){
        this.props.onLogin();
    }

    onLogout(){
        this.props.onLogout();
    }

    render(){
        let page;
        if(this.props.accessToken){
            page = <Nav.Link id="nav-link" onClick={this.onLogout.bind(this)} href="#">Logout</Nav.Link>
        }else {
            page = <Nav.Link id="nav-link" onClick={this.onLogin.bind(this)} href="#">Login</Nav.Link>
        }

        return(
            <Navbar bg="light">
                {/* <Navbar.Header> */}
                    <Navbar.Brand className="pl-auto">Github Searcher</Navbar.Brand>
                {/* </Navbar.Header> */}
                <Nav className="mr-auto">
                    {page}
                </Nav>
            </Navbar>
        )
    }
}

export default Top;