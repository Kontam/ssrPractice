import React, { useEffect } from 'react';
import PageTemplate from '../../template/PageTemplate';
import { useDispatch } from 'react-redux';
import { setTrueIsMounted } from '../../../redux/modules/isMounted';

import GoogleLoginButton from '../../atoms/GoogleLoginButton';

const Home: React.FC = () => { 
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setTrueIsMounted()) }, []);
    return (
        <PageTemplate>
            Home
            <GoogleLoginButton />
        </PageTemplate>
    );
}

export default Home;
