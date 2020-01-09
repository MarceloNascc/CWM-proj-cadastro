import React from 'react';
import './Nav.css';

import NavLink from '../../NavLink';

export default props => (
    <aside className="menu-area">
        <nav className="menu">
            <NavLink direction="/" icon="fa fa-home" label="Início"/>
            <NavLink direction="/users" icon="fa fa-users" label="Usuários" />
        </nav>
    </aside>
);