import React, { useEffect } from 'react';
import PageTemplate from '../../template/PageTemplate';
import { useDispatch } from 'react-redux';
import { setTrueIsMounted } from '../../../redux/modules/isMounted';

import LoginForm from '../../molecules/LoginForm';
import ProfileCard from '../../molecules/ProfileCard';

const Home: React.FC = () => { 
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setTrueIsMounted()) }, []);
    return (
        <PageTemplate>
            <LoginForm />
            <ProfileCard />
        </PageTemplate>
    );
}

export default Home;
