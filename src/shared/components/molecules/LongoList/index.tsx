import React from 'react';
import { Longos } from '../../../redux/modules/longos';
import LongoCard from '../../atoms/LongoCard';

type Props = {
    longos :Longos
}

const LongoList: React.FC<Props> = ({ longos }) => {
    return (
        <ul>
            {
                longos.map((longo) => <LongoCard key={longo.id} longo={longo} />)
            }
        </ul>
    )
} 

export default LongoList;