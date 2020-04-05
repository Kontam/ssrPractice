import React from 'react';
import styled from 'styled-components';
import Header from '../../molecules/Header';
import { AppFAB } from '../../molecules/AppButtonContainer';

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
