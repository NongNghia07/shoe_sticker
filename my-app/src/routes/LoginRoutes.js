import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';


const AuthLogin = lazy(() => import('../views/pages/authentication/login'));
const AuthRegister = lazy(() => import('../views/pages/authentication/register'));

const LoginRoutes = () => {
    const location = useLocation();

    return (
        <Route path={[
            '/login',
            '/register'
        ]}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <NavMotion>
                        <Route path="/login" component={AuthLogin} />
                        <Route path="/register" component={AuthRegister} />
                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default LoginRoutes;
