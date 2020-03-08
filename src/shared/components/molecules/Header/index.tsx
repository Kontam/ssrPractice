import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import HeaderMenuItem from '../../atoms/HeaderMenuItem';
import { Toolbar, Fab, Tooltip } from '@material-ui/core';

export type NavMenu = {
    text: string,
    href: string,
    description: string,
}

const Nav = styled.nav`
    height: 100%;
`;

const MenuList = styled.ul`
    height: 100%;
    display: flex;
`;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: "white",
    }
}))

const Header: React.FC = () => {
    const NavMenus: NavMenu[] = [
        {
            text: "home",
            href: "/",
            description: "現状は何もないホーム画面です",
        },
        {
            text: "LongoList",
            href: "/about",
            description: "論語の一覧が見られます",
        }

    ]
    return (
        <AppBar position="static">
            <Toolbar>
            {/* <Nav> */}
                {/* <MenuList> */}
                    {NavMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                {/* </MenuList> */}
            {/* </Nav> */}
                <Tooltip title="新しいアイテムを作成">
                    <Fab color="default" area-label="add">
                        <AddIcon />
                    </Fab>
                </ Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default Header;