
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';
import { readLongos, promiseReadLongos } from '../../../redux/modules/longos';
import LongoList from '../../molecules/LongoList';
import AddDialog from '../../molecules/AddDialog';
import { AddDialogState, closeAddDialog } from '../../../redux/modules/addDialogState';
import UpdateDIalog from '../../molecules/UpdateDialog';
import RemoveDialog from '../../molecules/RemoveDialog';
import { Store } from 'redux';
import { setTrueIsMounted } from '../../../redux/modules/isMounted';
import SnackBar from '../../atoms/SnackBar';

const longosSeletor = (state: RootState) => state.longos;

const About: React.FC = () => {
    const dispatch = useDispatch();
    const longos = useSelector(longosSeletor);
    const isMounted = useSelector<RootState>(state => state.isMounted);
    const addDialogState = useSelector<RootState, AddDialogState>(state => state.addDialogState);

    useEffect(() => {
        if (isMounted) dispatch(readLongos());
    }, [])
    useEffect(() => {dispatch(setTrueIsMounted())}, [])


    const onDialogClose = () => { dispatch(closeAddDialog());}
    
    return (
        <PageTemplate>
            <AddDialog isOpen={addDialogState.isOpen} onClose={onDialogClose}/>
            <UpdateDIalog />
            <RemoveDialog/>
            <LongoList longos={longos} />
            <SnackBar />
        </PageTemplate>
    )
}

About.prototype.getInitialProps = async (store: Store) => {
    const fetchPromise = new Promise((resolve, reject) => {
        store.dispatch(promiseReadLongos({resolve, reject}))
    })
    await fetchPromise;
    return {}
}

export default About;
