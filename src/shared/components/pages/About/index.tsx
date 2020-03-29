
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

const longosSeletor = (state: RootState) => state.longos;

const About: React.FC = () => {
    const dispatch = useDispatch();
    const longos = useSelector(longosSeletor);
    const isMounted = useSelector<RootState, IsMounted>(state => state.isMounted);
    const login = useSelector<RootState, Login>(state => state.login);

    useEffect(() => {
        if (isMounted) {
            if (!checkAuthorityLevel(login.authority, About.prototype.authorityLevel)) return;
            dispatch(readLongos());
        } 
    }, [])
    useEffect(() => {dispatch(setTrueIsMounted())}, [])

    return (
        <PageTemplate>
            <AddDialog />
            <UpdateDialog />
            <RemoveDialog/>
            <LongoList longos={longos} />
            <SnackBar />
        </PageTemplate>
    )
}

About.prototype.getInitialProps = async (store: Store<RootState>): Promise<any> => {
    console.log("About:getInitialProps");
    const own = store.getState().login.authority;
    if (!checkAuthorityLevel(own, About.prototype.authorityLevel)) return {};
    console.log("getInitialAuth", checkAuthorityLevel(own, About.prototype.authorityLevel));
    const fetchPromise = new Promise((resolve, reject) => {
        store.dispatch(promiseReadLongos({resolve, reject}))
    })
    await fetchPromise;
    console.log("end About:getInitialProps");
    return {}
}

About.prototype.authorityLevel = BFFConst.AUTHORITY_ADMIN;

export default About;
