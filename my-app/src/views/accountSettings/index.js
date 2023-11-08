import React, { useState } from 'react';

import { Card, CardHeader, Divider, Grid } from '@material-ui/core';

import { gridSpacing } from '../../store/constant';

import Profile from '../../components/profile';

export default function ViewProduct() {

    return (
        <React.Fragment>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <Profile />
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
