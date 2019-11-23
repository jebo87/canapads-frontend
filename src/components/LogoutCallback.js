import React from 'react';
import Oidc from 'oidc-client';


export default class LogoutCallback extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("entro al call back de logout");
        localStorage.removeItem('makako_token');
        window.location = 'http://localhost:5000'

    }

    render() {

        return (
            <div >
                Redirecting...
            </div>
        )


    }
}
