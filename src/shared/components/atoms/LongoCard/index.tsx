import React from 'react';
import { Longo } from '../../../redux/modules/longos';

type Prop = {
    longo: Longo
}

const LongoCard: React.FC<Prop> = ({ longo }) => {
    return (
        <li key={longo.id}>
            <p>ID: {longo.id}</p>
            <p>Text: {longo.text}</p>
            <p>Meaning: {longo.meaning}</p>
            <p>Comment: {longo.comment}</p>
        </li>
    )
}

export default LongoCard;