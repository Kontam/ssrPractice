import React from 'react';
import { Link } from 'react-router-dom';
import { NavMenu } from '../../molecules/Header';

const HeaderMenuItem: React.FC<{ menu: NavMenu }> = ({ menu }) => {

    return (
        <li>
            <Link to={menu.href}>{menu.text}</Link>
        </li>
    );
}

export default HeaderMenuItem;