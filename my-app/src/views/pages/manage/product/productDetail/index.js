import React from 'react';

import { Card, Divider, Grid } from '@material-ui/core';

import { gridSpacing } from '../../../../../store/constant';
import ProductDetail from '../../../../../components/product/ProductDetail'

export default function ViewProductDetail() {
    return (
        <React.Fragment>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <Divider />
                        <ProductDetail />
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
