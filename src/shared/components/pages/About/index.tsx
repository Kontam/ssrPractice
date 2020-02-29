
import React from 'react';
import { useSelector } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';

const routeSelector = (state: RootState) => state.router;

const About: React.FC = () => {
    console.log("About", useSelector(routeSelector));
    return (
        <PageTemplate>
            About
        </PageTemplate>
    )
}

export default About;