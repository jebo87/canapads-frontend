import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header'
import HomePage from '../components/HomePage';
import AdminPage from '../components/AdminPage';
import LeaderBoardPage from '../components/LeaderBoardPage';
import MatchScores from '../components/MatchScores';

const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
               
            </Switch>
    </BrowserRouter>
);

export default AppRouter;