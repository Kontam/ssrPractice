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
            text: "Top",
            href: "/",
            description: "ログイン中のユーザー情報が確認できます",
        },
        {
            text: "LongoList",
            href: "/about",
            description: "論語の一覧が見られます",
        },
        {
            text: "Choice",
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
