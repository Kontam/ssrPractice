
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';
import { Longo, setLongos, readLongos } from '../../../redux/modules/longos';
import CreateArea from '../../auganisms/CreateArea';
import LongoList from '../../molecules/LongoList';

const longosSeletor = (state: RootState) => state.longos;

const About: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(readLongos())}, [])
    const longos = useSelector(longosSeletor);
    return (
        <PageTemplate>
            <CreateArea />
            <LongoList longos={longos} />
        </PageTemplate>
    )
}

export default About;