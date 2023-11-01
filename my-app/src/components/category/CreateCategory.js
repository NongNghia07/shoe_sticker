import React, { useState } from "react";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import {
    Dialog, DialogActions, DialogContent, DialogTitle
    , Button, TextField, FormControl
} from '@mui/material';
import { Grid } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    createButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.primary[200],
        border: '1px solid',
        borderColor: theme.palette.primary[200],
        color: theme.palette.text.dark,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    cancelButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[500],
        border: '1px solid',
        borderColor: theme.palette.grey[500],
        color: theme.palette.text.dark,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.grey[600]
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
}));

export default function CreateCategory(props) {
    const [category, setCategory] = useState({})
    const { refreshData, isCreateModel, toggleCreateModal } = props
    const [errorValue, setErrorValue] = useState({})
    const { callPost } = useCallPostAPI()
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const createCategory = () => {
        const createCate = (user) => {
            const refresh = () => {
                refreshData()
                toggleCreateModal()
                enqueueSnackbar('Create success', { variant: 'success' })
            }
            let copyCategory = { ...category }
            let copyErrorValue = { ...errorValue }
            if (!copyCategory.name || copyCategory.name?.trim().length < 1) {
                copyErrorValue['name'] = 'Cần nhập thông tin'
            }
            setErrorValue({ ...copyErrorValue })
            if (Object.keys(copyErrorValue).length > 0) {
                enqueueSnackbar('Cần nhập đầy đủ thông tin', { variant: 'warning' })
                return
            }
            copyCategory["created"] = user.id
            callPost(`http://localhost:8080/api/category/create`, copyCategory, refresh)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", createCate)
    }

    const onClose = () => {
        setErrorValue({})
        toggleCreateModal()
    }

    return (
        <Dialog
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={'xs'}
            fullWidth={true}
            open={isCreateModel}
            onClose={onClose}
        >
            <DialogTitle id="scroll-dialog-title">Create Category</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} maxWidth={'md'}>
                    <Grid item md={12}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                                id="category"
                                label="Please enter Category"
                                error={errorValue.name ? errorValue?.name?.length === 0 ? false : true : false}
                                helperText={errorValue?.name}
                                required
                                value={category?.name}
                                onChange={(e) => { setCategory({ name: e.target.value }); setErrorValue({}) }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button className={classes.createButton} onClick={() => {
                    createCategory();
                }}>Add</Button>
                <Button className={classes.cancelButton} onClick={() => onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}