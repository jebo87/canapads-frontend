import React, { useEffect } from 'react';

const LogoutCallback = () => {
    useEffect(() => {
        console.log("entro al call back de logout");
        sessionStorage.removeItem('makako_token');
        window.location = 'https://www.canapads.ca'

    }, []);

    return (
        <div >
            Redirecting...
        </div>
    );
};

export default LogoutCallback;