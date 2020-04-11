import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../molecules/Header';
import { AppFAB } from '../../molecules/AppButtonContainer';
import { useDispatch } from 'react-redux';
import { setTrueIsMounted } from '../../../redux/modules/isMounted';

const Container = styled.div`
  width: 100%; 
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  width: 95%;
`;

type Props = {
    children: any,
    appButtons?: AppFAB[],
}

const PageTemplate: React.FC<Props> = ({ children, appButtons }) => {
    // このフラグがTrue = CSRとなり、dataFetchをCSで行うかの判定が可能になる 
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setTrueIsMounted())}, [])
    
    return (
      <div>
        <Header appButtons={appButtons && appButtons}/>
        <Container>
          <Wrapper>
            {children}
          </Wrapper>
        </Container>
      </div>
    )
}

export default PageTemplate;
