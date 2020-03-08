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

const Item = styled.li`
    margin-top: 20px;
`;

const LongoList: React.FC<Props> = ({ longos }) => {
    return (
        <Container>
            {
                longos.map((longo) => (
                    <Item key={longo.id}>
                        <LongoCard longo={longo} />
                    </Item>
                ))
            }
        </Container>
    )
} 

export default LongoList;