import React, { useState, useEffect } from "react";
import {
    Typography, Tabs, Tab, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { AccountCircle, LockOpen, Info } from '@mui/icons-material';
import useCallPostAPI from "../../hooks/UseCallPostApi";
import Account from './account'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Profile() {
    const [tab, setTab] = useState(0);
    const [account, setAcount] = useState({})
    const { callPost } = useCallPostAPI()

    useEffect(() => {
        const getData = (data) => {
            setAcount(data)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", getData)
    }, [])

    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
            >
                <Tab icon={<AccountCircle />} iconPosition="start" label="Account" {...a11yProps(0)} />
                <Tab icon={<LockOpen />} iconPosition="start" label="Security"{...a11yProps(1)} />
                <Tab icon={<Info />} iconPosition="start" label="Info" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={tab} index={0} >
                <Account
                    account={account}
                    setAcount={setAcount}
                />
            </TabPanel>
            <TabPanel value={tab} index={1} >
                Item Two
            </TabPanel>
            <TabPanel value={tab} index={2} >
                Item Three
            </TabPanel>
        </>
    );
}
