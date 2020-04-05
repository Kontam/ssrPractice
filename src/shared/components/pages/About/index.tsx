import React, { useEffect } from 'react';
import { Store } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import About from './About';
import { RootState } from '../../../redux/store';
import { readLongos, promiseReadLongos } from '../../../redux/modules/longos';
import { setTrueIsMounted, IsMounted } from '../../../redux/modules/isMounted';
import { Login } from '../../../redux/modules/login';
import { checkAuthorityLevel } from '../../../routes/checkAuthorityLevel';
import getAuthStatus from '../../../modules/getAuthStatus';
import { AppFAB } from '../../molecules/AppButtonContainer';
import BFFConst from '../../../modules/const';

const longosSeletor = (state: RootState) => state.app.longos;

const AboutContainer: React.FC = () => {
    const dispatch = useDispatch();
    const longos = useSelector(longosSeletor);
    const isMounted = useSelector<RootState, IsMounted>(state => state.isMounted);
    const login = useSelector<RootState, Login>(state => state.user.login);
    const authStatus = getAuthStatus(login, AboutContainer.prototype.authorityLevel);
    const appButtons: AppFAB[] = [
        {
            name: '追加',
            color: 'default',
            onClick: (e) => {},
            IconComponent: <AddIcon />,
            description: "新しいアイテムを作成",
        }
    ]

    useEffect(() => {
        if (isMounted) {
            if (!checkAuthorityLevel(login.authority, AboutContainer.prototype.authorityLevel)) return;
            dispatch(readLongos());
        } 
    }, [])
    useEffect(() => {dispatch(setTrueIsMounted())}, [])

    return (
        <About
            longos={longos}
            authStatus={authStatus}
            appButtons={appButtons}
        />
    )
}

AboutContainer.prototype.getInitialProps = async (store: Store<RootState>): Promise<any> => {
    const own = store.getState().user.login.authority;
    if (!checkAuthorityLevel(own, About.prototype.authorityLevel)) return {};
    const fetchPromise = new Promise((resolve, reject) => {
        store.dispatch(promiseReadLongos({resolve, reject}))
    })
    await fetchPromise;
    return {}
}

AboutContainer.prototype.authorityLevel = BFFConst.AUTHORITY_ADMIN;

export default AboutContainer;
