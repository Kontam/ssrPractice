
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';
import { readLongos, promiseReadLongos } from '../../../redux/modules/longos';
import LongoList from '../../molecules/LongoList';
import AddDialog from '../../molecules/AddDialog';
import UpdateDialog from '../../molecules/UpdateDialog';
import RemoveDialog from '../../molecules/RemoveDialog';
import { Store } from 'redux';
import { setTrueIsMounted, IsMounted } from '../../../redux/modules/isMounted';
import SnackBar from '../../atoms/SnackBar';
import BFFConst from '../../../modules/const';
import { checkAuthorityLevel } from '../../../routes/checkAuthorityLevel';
import { Login } from '../../../redux/modules/login';
import getAuthStatus from '../../../modules/getAuthStatus';
import Const from '../../../modules/const';
import UnAuthrizedMessage from '../../molecules/UnauthrizedMessage';
import { AppFAB } from '../../molecules/AppButtonContainer';
import AddIcon from '@material-ui/icons/Add';

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
            onClick: (e) => {},
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
        <PageTemplate appButtons={appButtons}>
          { authStatus === Const.AUTHSTATUS_ENOUGH 
            ? (
            <>
              <AddDialog />
              <UpdateDialog />
              <RemoveDialog/>
              <LongoList longos={longos} />
              <SnackBar />
            </>
          ) : <UnAuthrizedMessage authStatus={authStatus}/>
             }
        </PageTemplate>
    )
}

About.prototype.getInitialProps = async (store: Store<RootState>): Promise<any> => {
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
