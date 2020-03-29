
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
import LoadingLine from '../../atoms/LoadingLine';
import { HeaderLoading } from '../../../redux/modules/headerLoading';

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

type HeaderProps = {
    navMenus: NavMenu[]
    handleAddIconClick: React.MouseEventHandler
    headerLoading: HeaderLoading
}

const Header: React.FC<HeaderProps> = ({ navMenus, handleAddIconClick, headerLoading }) => {
    
    return (
        <AppBar position="sticky">
            <Toolbar>
            {/* <Nav> */}
                {/* <MenuList> */}
                    {navMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                {/* </MenuList> */}
            {/* </Nav> */}
                <Tooltip title="新しいアイテムを作成">
                    <Fab color="default" area-label="add" onClick={handleAddIconClick}>
                        <AddIcon />
                    </Fab>
                </ Tooltip>
            </Toolbar>
            <LoadingLine isLoading={headerLoading} />
        </AppBar>
    );
}

export default Header;