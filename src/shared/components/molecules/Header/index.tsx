import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import HeaderMenuItem from '../../atoms/HeaderMenuItem';
import { Toolbar, Fab, Tooltip } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeAddDialog, AddDialogState, openAddDialog } from '../../../redux/modules/addDialogState';

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
    const addDialogState = useSelector<RootState, AddDialogState>(state => state.addDialogState);
    const dispatch = useDispatch();

    const NavMenus: NavMenu[] = [
        {
            text: "Top",
            href: "/",
            description: "現状は何もないホーム画面です",
        },
        {
            text: "LongoList",
            href: "/about",
            description: "論語の一覧が見られます",
        }
    ];

    const handleAddIconClick: React.MouseEventHandler = () => { dispatch(addDialogState.isOpen ? closeAddDialog() : openAddDialog())};
    
    return (
        <AppBar position="sticky">
            <Toolbar>
            {/* <Nav> */}
                {/* <MenuList> */}
                    {NavMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                {/* </MenuList> */}
            {/* </Nav> */}
                <Tooltip title="新しいアイテムを作成">
                    <Fab color="default" area-label="add" onClick={handleAddIconClick}>
                        <AddIcon />
                    </Fab>
                </ Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
