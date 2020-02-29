
import React, { ReactChildren } from 'react';
import Header from '../../molecules/Header';

type Props = {
    children: any,
}

const PageTemplate: React.FC<Props> = ({ children }) => {
    console.log(children);
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default PageTemplate;