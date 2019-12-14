import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('../components/Auth'), {
    ssr: false,
    loading: () => <p>Loading auth</p>
})

const AuthCallback = () => {

    return (
        <div >
            <Auth />
        </div>
    );
};


export default AuthCallback;