import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

export default class NavigationBar extends Component {
    render() {
        return (
            
            <nav className="navbar navbar-expand-lg navbar-static-top">
                <div>
                    <Navbar.Brand > 
                        <Link to="/"><img src="https://mdbootstrap.com/img/logo/mdb-transparent.png" height="30" alt="mdb logo"></img></Link>
                    </Navbar.Brand>
                </div>
                <div >
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link" href="/userpage">Profile</a>
                        </li>
                        <li className="nav-item" id="createRoom">
                            <a className="nav-link" href="/create">Create Room</a>
                        </li>
                    </ul>
                </div>
                
            </nav>
        )
    }
}

