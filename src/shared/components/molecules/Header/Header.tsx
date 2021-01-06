
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import HeaderMenuItem from '../../atoms/HeaderMenuItem';
import { Toolbar } from '@material-ui/core';
import LoadingLine from '../../atoms/LoadingLine';
import { HeaderLoading } from '../../../redux/modules/headerLoading';
import AppButtonContainer, { AppFAB } from '../AppButtonContainer';

export type NavMenu = {
    text: string,
    href: string,
    description: string,
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: "white",
    }
}))

export type HeaderProps = {
    navMenus: NavMenu[]
    headerLoading: HeaderLoading
    appButtons?: AppFAB[],
}

const Header: React.FC<HeaderProps> = ({ navMenus, headerLoading, appButtons }) => {
    
    return (
        <AppBar position="sticky">
            <Toolbar>
            {/* <Nav> */}
                {/* <MenuList> */}
                    {navMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                {/* </MenuList> */}
            {/* </Nav> */}
            { appButtons && <AppButtonContainer appButtons={appButtons}/> }
            </Toolbar>
            <LoadingLine isLoading={headerLoading} />
        </AppBar>
    );
}

export default Header;
