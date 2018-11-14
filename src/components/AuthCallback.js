import React from 'react';
import Oidc from 'oidc-client';


export default class AuthCallback extends React.Component {
    constructor(props) {
        super(props);
       
        
    }
    componentWillMount(){
        new Oidc.UserManager().signinRedirectCallback().then(function () {
            window.location = "http://localhost:5000";
        }).catch(function (e) {
            console.error(e);
        });
    }
    
    render() {
       
        return (
            <div >
              Redirecting...
            </div>
        )


    }
}
