import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import MainLayout from './../layout/MainLayout';



const DashboardDefault = lazy(() => import('../views/dashboard/Default'));

const AccountSettings = lazy(() => import('../views/accountSettings'));


const Product = lazy(() => import('../views/pages/manage/product'));
const ProductDetail = lazy(() => import('../views/pages/manage/product/productDetail'));
const Category = lazy(() => import('../views/pages/manage/category'));
const SizeOrColor = lazy(() => import('../views/pages/manage/sizeAndColor'));

const TableDense = lazy(() => import('../views/forms/tables/TableDense'));

const UtilsTypography = lazy(() => import('../views/utilities/typography'));
const UtilsColor = lazy(() => import('../views/utilities/color'));
const UtilsShadow = lazy(() => import('../views/utilities/shadow'));
const UtilsMaterialIcons = lazy(() => import('../views/utilities/icons/MaterialIcons'));
const UtilsTablerIcons = lazy(() => import('../views/utilities/icons/TablerIcons'));

const SamplePage = lazy(() => import('../views/sample-page'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/account-settings',
                '/admin/product',
                '/admin/product-detail/:id',
                '/admin/category',
                '/admin/sizeOrColor/:param',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',

                '/sample-page'
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch >
                    <Route path="/dashboard/default" component={DashboardDefault} />

                    <Route path="/account-settings" component={AccountSettings} />

                    <Route path="/admin/product" component={Product} />
                    <Route path="/admin/product-detail/:id" component={ProductDetail} />
                    <Route path="/admin/category" component={Category} />
                    <Route path="/admin/sizeOrColor/:param" component={SizeOrColor} />

                    <Route path="/utils/util-typography" component={UtilsTypography} />
                    <Route path="/utils/util-color" component={UtilsColor} />
                    <Route path="/utils/util-shadow" component={UtilsShadow} />
                    <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                    <Route path="/icons/material-icons" component={UtilsMaterialIcons} />

                    <Route path="/sample-page" component={SamplePage} />

                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
