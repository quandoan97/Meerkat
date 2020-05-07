import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

export default class NavigationBar extends Component {
    render() {
        return (

            <nav class="navbar navbar-expand-lg navbar-static-top">
                <div>
                    <Navbar.Brand >
                        <Link to="/"><img src="https://mdbootstrap.com/img/logo/mdb-transparent.png" height="30" alt="mdb logo"></img></Link>
                    </Navbar.Brand>
                    <ul class="nav navbar-nav navbar-right">
                    <ul class="nav nav-pills">
                    <li class="nav-item"><a href="/Register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                    <li class="nav-item"><a href="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                    </ul>
                    <div id="mySidenav" class="sidenav">
                        <a href="/userpage" id="profile">Profile</a>
                        <a href="/create" id="create">Create Room</a>
                        <a href="/View" id="view">View Rooms</a>
                        <a href="#" id="about">About Us</a>
                      </div>
                </div>

            </nav>
        )
    }
}
