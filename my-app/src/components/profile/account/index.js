import React, { useState } from "react";
import { makeStyles, Grid, Avatar } from '@material-ui/core';
import {
    Button, TextField, FormControl, IconButton,
} from '@mui/material';
import ImgAvatar from '../../../assets/images/avatar.jpg'

export default function Account(props) {
    const { account, setAcount } = props

    const handleOnchangeInput = (e, id) => {
        let newAccount = { ...account }
        newAccount[id] = e.target.value
        setAcount(newAccount)
    }

    return (
        <>
            <Grid container spacing={2} maxWidth={'md'}>
                <Grid item >
                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                        <Avatar style={{
                            height: '100%',
                            width: '70%'
                        }}
                            src={account?.image ? account?.image : ImgAvatar}
                        // className={classes.headerAvtar}
                        />
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                        reset
                    </FormControl>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                required
                                // error={errorValue?.name ? errorValue?.name?.length === 0 ? false : true : false}
                                // helperText={errorValue?.name}
                                value={account?.firstName ? account?.firstName : ''}
                                onChange={(e) =>
                                    handleOnchangeInput(e, "firstName")
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                required
                                // error={errorValue?.name ? errorValue?.name?.length === 0 ? false : true : false}
                                // helperText={errorValue?.name}
                                value={account?.lastName ? account?.lastName : ''}
                                onChange={(e) =>
                                    handleOnchangeInput(e, "lastName")
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
