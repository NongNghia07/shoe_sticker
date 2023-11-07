import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';


const Error404 = lazy(() => import('../views/error/404'));

const LoginRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/404']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <NavMotion>

                        <Route path="/404" component={Error404} />

                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default LoginRoutes;
