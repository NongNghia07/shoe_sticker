import React, { useState } from "react";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import {
    Dialog, DialogActions, DialogContent, DialogTitle
    , Button, TextField, FormControl
} from '@mui/material';
import { Grid } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';

export default function CreateCategory(props) {
    const [category, setCategory] = useState({})
    const { refreshData, isCreateModel, toggleCreateModal } = props
    const { callPost } = useCallPostAPI()

    const createCategory = () => {
        const createCate = (user) => {
            const refresh = () => {
                refreshData()
                toggleCreateModal()
            }
            let copyCategory = { ...category }
            copyCategory["created"] = user.id
            callPost(`http://localhost:8080/api/category/create`, copyCategory, refresh)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", createCate)
    }

    return (
        <Dialog
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={'xs'}
            fullWidth={true}
            open={isCreateModel}
            onClose={toggleCreateModal}
        >
            <DialogTitle id="scroll-dialog-title">Create Category</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} maxWidth={'md'}>
                    <Grid item md={12}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                                id="category"
                                label="Please enter Category"
                                required
                                value={category?.name}
                                onChange={(e) => setCategory({ name: e.target.value })}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    createCategory();
                }}>Add</Button>
                <Button onClick={() => toggleCreateModal()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}