
import React, { ReactChildren } from 'react';
import styled from 'styled-components';
import Header from '../../molecules/Header';

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
}

const PageTemplate: React.FC<Props> = ({ children }) => {
    return (
      <div>
        <Header />
        <Container>
          <Wrapper>
            {children}
          </Wrapper>
        </Container>
      </div>
    )
}

export default PageTemplate;
