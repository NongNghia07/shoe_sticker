import React, { useState } from 'react';

import { Card, CardHeader, Divider, Grid } from '@material-ui/core';

import { gridSpacing } from '../../../../store/constant';
import Product from '../../../../components/product/Product'
import SearchSection from '../../../../layout/MainLayout/Header/SearchSection';


export default function TableBasic() {
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
                                    Product
                                    <SearchSection
                                        url={'http://localhost:8080/api/productData/searchAllByName?keyword='}
                                        getDataSearch={getDataSearch}
                                    />
                                </>
                            } />
                        <Divider />
                        <Product data={data} />
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
