import React from 'react';
import styled from 'styled-components';
import { Longos } from '../../../redux/modules/longos';
import LongoCard from '../../atoms/LongoCard';

type Props = {
    longos :Longos
}

const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const LongoList: React.FC<Props> = ({ longos }) => {
    return (
        <Container>
            {
                longos.map((longo) => <LongoCard key={longo.id} longo={longo} />)
            }
        </Container>
    )
} 

export default LongoList;