import React, { useEffect } from 'react';
import PageTemplate from '../../template/PageTemplate';
import { useDispatch } from 'react-redux';
import { setTrueIsMounted } from '../../../redux/modules/isMounted';

import LoginForm from '../../molecules/LoginForm';

const Home: React.FC = () => { 
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setTrueIsMounted()) }, []);
    return (
        <PageTemplate>
            <LoginForm />
        </PageTemplate>
    );
}

export default Home;
