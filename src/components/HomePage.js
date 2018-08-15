import React from 'react'
import {getAds} from '../backend_interface/api_if'

class HomePage extends React.Component {
    state = {
        ads:[]
    }
   
    async componentDidMount(){
        let ads = await getAds();
        this.setState({ads});
        
        
    }
    render() {
        return (
            <React.Fragment>
                {
                    
                    this.state.ads.map((ad)=>{
                        return (<p key={ad.id}>{ad.title}</p>)
                    })
                }
               
                
            </React.Fragment> 
        )
    }
}
export default HomePage;