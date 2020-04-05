import React, { useEffect } from 'react';
import { Store } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import AboutComponent from './About';
import { RootState } from '../../../redux/store';
import { readLongos, promiseReadLongos } from '../../../redux/modules/longos';
import { setTrueIsMounted, IsMounted } from '../../../redux/modules/isMounted';
import { Login } from '../../../redux/modules/login';
import { checkAuthorityLevel } from '../../../routes/checkAuthorityLevel';
import getAuthStatus from '../../../modules/getAuthStatus';
import { AppFAB } from '../../molecules/AppButtonContainer';
import BFFConst from '../../../modules/const';
import { openAddDialog } from '../../../redux/modules/addDialogState';

const longosSeletor = (state: RootState) => state.app.longos;

const About: React.FC = () => {
    const dispatch = useDispatch();
    const longos = useSelector(longosSeletor);
    const isMounted = useSelector<RootState, IsMounted>(state => state.isMounted);
    const login = useSelector<RootState, Login>(state => state.user.login);
    const authStatus = getAuthStatus(login, About.prototype.authorityLevel);
    const appButtons: AppFAB[] = [
        {
            name: '追加',
            color: 'default',
            onClick: (e) => { dispatch(openAddDialog())},
            IconComponent: <AddIcon />,
            description: "新しいアイテムを作成",
        }
    ]

    useEffect(() => {
        if (isMounted) {
            if (!checkAuthorityLevel(login.authority, About.prototype.authorityLevel)) return;
            dispatch(readLongos());
        } 
    }, [])
    useEffect(() => {dispatch(setTrueIsMounted())}, [])

    return (
        <AboutComponent
            longos={longos}
            authStatus={authStatus}
            appButtons={appButtons}
        />
    )
}

About.prototype.getInitialProps = async (store: Store<RootState>): Promise<any> => {
    console.log("getInitialProps");
    const own = store.getState().user.login.authority;
    if (!checkAuthorityLevel(own, About.prototype.authorityLevel)) return {};
    const fetchPromise = new Promise((resolve, reject) => {
        store.dispatch(promiseReadLongos({resolve, reject}))
    })
    await fetchPromise;
    return {}
}

About.prototype.authorityLevel = BFFConst.AUTHORITY_ADMIN;

export default About;
