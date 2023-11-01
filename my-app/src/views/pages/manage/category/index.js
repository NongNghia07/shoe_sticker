import React, { useState } from 'react';

import { Card, CardHeader, Divider, Grid } from '@material-ui/core';

import { gridSpacing } from '../../../../store/constant';
import Category from '../../../../components/category/Category';
import SearchSection from '../../../../layout/MainLayout/Header/SearchSection';


export default function ViewCategory() {
    const [data, setData] = useState([])

    const getDataSearch = (data) => {
        setData(data)
    }

    return (
        <React.Fragment>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title={
                                <>
                                    Category
                                    <SearchSection
                                        url={'http://localhost:8080/api/category/searchAllByName?keyword='}
                                        getDataSearch={getDataSearch}
                                    />
                                </>
                            } />
                        <Divider />
                        <Category data={data} />
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
