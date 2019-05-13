import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Chat from "./containers/Chat/Chat";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to='/login' />
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <ProtectedRoute isAllowed={user} path="/chat" exact component={Chat} />
        </Switch>
    );
};

export default Routes;