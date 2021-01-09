import React from 'react';
import Header, { NavMenu } from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { HeaderLoading } from '../../../redux/modules/headerLoading';
import { AppFAB } from '../AppButtonContainer';

type Props = {
    appButtons?: AppFAB[],
}

const HeaderContainer: React.FC<Props> = ({ appButtons }) => {
    const headerLoading = useSelector<RootState, HeaderLoading>(state => state.headerLoading);
    const navMenus: NavMenu[] = [
        {
            text: "User",
            href: "/",
            description: "ログイン中のユーザー情報が確認できます",
        },
        {
            text: "Study",
            href: "/about",
            description: "Study機能のデータを管理します",
        },
        {
            text: "Groups",
            href: "/choice",
            description: "ランダム選別機能のデータを管理します",
        }
    ];

    return (
        <Header
            appButtons={appButtons}
            navMenus={navMenus} 
            headerLoading={headerLoading}
        />
    );
}

export default HeaderContainer;
