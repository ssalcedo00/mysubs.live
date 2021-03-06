import 'bootstrap/dist/css/bootstrap.css';
import './Logo.css'
import { Navbar } from 'react-bootstrap';
import React, { Component } from "react";

const logo = require('../../static/images/logo-white.png');

export default class Logo extends Component { 
    render() {
        return (
            <Navbar.Brand>
                <img
                    alt='mysubs.live'
                    src={logo}
                    className="d-inline-block align-middle"
                    height='20'
                />
            </Navbar.Brand>
        );
    }
}