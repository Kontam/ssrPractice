
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';
import { Longo, setLongos } from '../../../redux/modules/longos';
import CreateArea from '../../auganisms/CreateArea';

const routeSelector = (state: RootState) => state.router;
const longosSeletor = (state: RootState) => state.longos;

const mockLongo: Longo = {
    text: "学びて時にこれを習う",
    meaning: "復習いいよね",
    comment: "やらねば",
}

const About: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setLongos([mockLongo]))}, [])
    console.log("About", useSelector(routeSelector));
    const longos = useSelector(longosSeletor);
    return (
        <PageTemplate>
            About with effect
            {longos.length>0 && longos[0].text || "ない"}
            <CreateArea />
        </PageTemplate>
    )
}

export default About;