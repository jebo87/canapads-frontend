import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';

import HomePage from '../components/HomePage';
import Ads from '../components/Ads';


const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/ads" component={Ads}  />
               
            </Switch>
    </BrowserRouter>
);

export default AppRouter;