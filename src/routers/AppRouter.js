import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';

import HomePage from '../components/HomePage';
import Ads from '../components/Ads';
import AuthCallback from '../components/AuthCallback';
import AdDetail from '../components/AdDetail';


const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/ad-detail/:id" component={AdDetail}  />
                <Route path="/auth" component={AuthCallback}  />
               
            </Switch>
    </BrowserRouter>
);

export default AppRouter;