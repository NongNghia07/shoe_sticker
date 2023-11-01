import React, { useState } from 'react';

import { Card, CardHeader, Divider, Grid } from '@material-ui/core';
import {
    useParams
} from "react-router-dom";

import { gridSpacing } from '../../../../store/constant';
import SizeAndColor from '../../../../components/sizeAndColor/SizeOrColor';
import SearchSection from '../../../../layout/MainLayout/Header/SearchSection';


export default function ViewCategory() {
    const [data, setData] = useState([])
    const { param } = useParams();

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
                                    <SearchSection
                                        url={`http://localhost:8080/api/${param}/searchAllByName?keyword=`}
                                        getDataSearch={getDataSearch}
                                    />
                                </>
                            } />
                        <Divider />
                        <SizeAndColor data={data} />
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
