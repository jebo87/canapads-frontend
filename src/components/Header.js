import React from 'react';
import Oidc from 'oidc-client';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:null
        }
        this.config = {
            authority: "http://localhost:5633",
            client_id: "MakakoAngular",
            redirect_uri: "http://localhost:5000/auth",
            response_type: "id_token token",
            scope:"openid profile",
            post_logout_redirect_uri : "http://localhost:5000/",
            automaticSilentRenew: false,
            DefaultStaleStateAge:5
        };
        
    }
    componentWillMount(){
        this.mgr = new Oidc.UserManager(this.config);
        console.log(this.mgr.settings.max_age);
        
        this.mgr.getUser().then( (user) =>{
            console.log(user);
            if (user&&!user.expired) {
                
                

                this.setState({user:user});
                
                console.log("User logged in", user.profile);
            }
            else {
                
                console.log("User not logged in");
                
                
                // this.login();
                
            }
        });
    }
    login =() => {
        this.mgr.signinRedirect();
    }
    logout=()=> {
        this.mgr.signoutRedirect();
    }


    
    render() {
       
        return (
            <div >
                Header
                {
                this.state.user === null?<button onClick={this.login}>Login</button>:<button onClick={this.logout}>logout</button>

                }
            </div>
        )


    }
}
