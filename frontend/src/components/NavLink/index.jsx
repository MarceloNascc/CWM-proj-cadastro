import React from 'react';
import { Link } from 'react-router-dom';
import './NavLink.css';

export default props => (
    <Link to={props.direction}>
        <i className={props.icon}></i> {props.label}
    </Link>
);