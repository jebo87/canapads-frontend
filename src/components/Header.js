import React from 'react';
import Oidc from 'oidc-client';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.config = {
            authority: "http://bouncer.canapads.ca",
            client_id: "MakakoWeb",
            redirect_uri: "http://www.canapads.ca/auth",
            response_type: "code",
            scope: "openid profile",
            post_logout_redirect_uri: "http://www.canapads.ca/logout",
            automaticSilentRenew: false,
            DefaultStaleStateAge: 5
        };

    }
    componentWillMount() {
        //If there is a logged in user we set it in state
        this.mgr = new Oidc.UserManager(this.config);
        this.mgr.getUser().then((user) => {
            if (user && !user.expired) {
                this.setState({ user: user });
                console.log("User logged in", user.profile);
            } else {
                console.log("User not logged in");
            }
        });
    }
    login = () => {
        //start the OIDC login process.
        this.mgr.signinRedirect();
    }
    logout = () => {
        //start the OIDC logout process
        this.mgr.signoutRedirect();
    }



    render() {

        return (
            <div className="header">
                <div className="header_logo"></div>
                <div className="header_title">
                    CANAPADS
                </div>
                <div className="menu">
                    <ul>
                        <li>   <a className="active" href="">apartments</a> </li>
                        <li>  <a href="">houses</a> </li>
                    </ul>
                </div>
                <div className="search_area">
                    <input placeholder="Search..." type="text" className="search_box" />
                </div>

                {
                    this.state.user === null ? <button className="blue_button" onClick={this.login}>Login</button> : <button className="blue_button" onClick={this.logout}>logout</button>

                }
            </div>
        )


    }
}
