import React from 'react';
import HeaderMenuItem from '../../atoms/HeaderMenuItem';

export type NavMenu = {
    text: string,
    href: string,
}

const Header: React.FC = () => {
    const NavMenus: NavMenu[] = [
        {
            text: "home",
            href: "/",
        },
        {
            text: "about",
            href: "/about"
        }

    ]
    return (
        <div>
            <nav>
                <ul>
                    {NavMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                </ul>
            </nav>
        </div>
    );
}

export default Header;