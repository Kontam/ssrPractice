import React from 'react';
import Header, { NavMenu } from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { closeAddDialog, AddDialogState, openAddDialog } from '../../../redux/modules/addDialogState';
import { HeaderLoading } from '../../../redux/modules/headerLoading';

const HeaderContainer: React.FC = () => {
    const dispatch = useDispatch();
    const addDialogState = useSelector<RootState, AddDialogState>(state => state.dialog.addDialogState);
    const headerLoading = useSelector<RootState, HeaderLoading>(state => state.headerLoading);
    const navMenus: NavMenu[] = [
        {
            text: "Top",
            href: "/",
            description: "ログイン中のユーザー情報が確認できます",
        },
        {
            text: "LongoList",
            href: "/about",
            description: "論語の一覧が見られます",
        }
    ];

    const handleAddIconClick: React.MouseEventHandler = () => { dispatch(addDialogState.isOpen ? closeAddDialog() : openAddDialog())};
    
    return (
        <Header
            navMenus={navMenus} 
            handleAddIconClick={handleAddIconClick}
            headerLoading={headerLoading}
        />
    );
}

export default HeaderContainer;
