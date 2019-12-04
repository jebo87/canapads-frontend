import React from 'react';
import Oidc from 'oidc-client';


export default class LogoutCallback extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("entro al call back de logout");
        sessionStorage.removeItem('makako_token');
        window.location = 'http://www.canapads.ca'

    }

    render() {

        return (
            <div >
                Redirecting...
            </div>
        )


    }
}
