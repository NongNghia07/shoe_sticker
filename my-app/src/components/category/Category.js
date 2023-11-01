import React, { useEffect, useState } from "react";
import useCallGetAPI from "../../hooks/UseCallGetApi";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import Tables from "../../hooks/UseTable";
import CreateCategory from "./CreateCategory";
import { useSnackbar } from 'notistack';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Button, TextField, FormControl
} from '@mui/material';
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
    deleteButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.error.main,
        border: '1px solid',
        borderColor: theme.palette.error.main,
        color: theme.palette.text.dark,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
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

export default function Category(props) {
    const { data } = props
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [errorValue, setErrorValue] = useState({})
    const { callPost } = useCallPostAPI()
    const { callGet } = useCallGetAPI()
    const [isUpdateModel, setIsUpdateModel] = useState(false)
    const [isCreateModel, setIsCreateModel] = useState(false)
    const [isDeleteModel, setIsDeleteModel] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        refreshData()
    }, [])

    useEffect(() => {
        let arr = []
        data?.map(p => arr.push({ id: p.id, name: p.name }))
        setCategories(arr)
    }, [data])

    const refreshData = () => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setCategories(arr)
        }
        callGet(`http://localhost:8080/api/category/findAll`, getData)
    }

    const updateCategory = (id) => {
        const updateCate = (user) => {
            const refresh = () => {
                refreshData()
                if (id) toggleUpdateModal()
                enqueueSnackbar('Update success', { variant: 'success' })
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
            copyCategory["updated"] = user.id
            callPost(`http://localhost:8080/api/category/update`, copyCategory, refresh)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", updateCate)
    }

    const toggleUpdateModal = () => {
        setIsUpdateModel(!isUpdateModel)
        if (isUpdateModel) {
            setCategory({})
        }
    }

    const toggleCreateModal = () => {
        setIsCreateModel(!isCreateModel)
        if (isCreateModel) {
            setCategory({})
        }
    }

    const toggleDeleteModal = () => {
        setIsDeleteModel(!isDeleteModel)
    }

    const findCategoryById = (id) => {
        const getData = (data) => {
            setCategory(data)
            toggleUpdateModal()
        }
        callGet(`http://localhost:8080/api/category/find/${id}`, getData)
    }

    const deleteCategory = () => {
        const refresh = () => {
            refreshData()
            enqueueSnackbar('Delete success', { variant: 'success' })
            toggleDeleteModal()
        }
        callPost(`http://localhost:8080/api/category/delete/${category.id}`, "", refresh)
    }

    const onCreate = (id) => {
        toggleCreateModal()
    }

    const onUpdate = (id) => {
        findCategoryById(id)
    }

    const onDelete = (id) => {
        toggleDeleteModal()
        setCategory({ id: id })
    }

    const sortDataAscending = (data) => {
        let newData = [...categories]
        if (!newData.map(p => p[data])) return
        newData.sort((a, b) => a[data] > b[data] ? 1 : -1)
        setCategories(newData)
    }

    const sortDataGraduallySmaller = (data) => {
        let newData = [...categories]
        if (!newData.map(p => p[data])) return
        newData.sort((a, b) => a[data] < b[data] ? 1 : -1)
        setCategories(newData)
    }

    const onDetail = (id) => {

    }

    const onClose = () => {
        setErrorValue({})
        toggleUpdateModal()
    }

    return (
        <>
            <CreateCategory
                isCreateModel={isCreateModel}
                toggleCreateModal={toggleCreateModal}
                refreshData={refreshData}
            />
            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                open={isUpdateModel}
                onClose={onClose}
            >
                <DialogTitle id="scroll-dialog-title">Update Category</DialogTitle>
                <DialogContent >
                    <FormControl sx={{ m: 1, width: 380 }}>
                        <TextField
                            id="category"
                            label="Category"
                            required
                            error={errorValue.name ? errorValue?.name?.length === 0 ? false : true : false}
                            helperText={errorValue?.name}
                            value={category.name}
                            onChange={(e) => { setCategory({ id: category.id, name: e.target.value }); setErrorValue({}) }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.createButton} onClick={() => { updateCategory(category.id) }}>Update</Button>
                    <Button className={classes.cancelButton} onClick={() => onClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                open={isDeleteModel}
                onClose={toggleDeleteModal}
            >
                <DialogTitle id="scroll-dialog-title">Thông báo</DialogTitle>
                <DialogContent>
                    Do you want delete?
                </DialogContent>
                <DialogActions>
                    <Button className={classes.deleteButton} onClick={() => { deleteCategory() }}>Delete</Button>
                    <Button className={classes.cancelButton} onClick={() => toggleDeleteModal()}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Tables
                title={"Category"}
                list={categories}
                colNames={[{ title: "ID", id: "id" }, { title: "Name", id: "name" }]}
                onCreate={onCreate}
                onDetail={onDetail}
                onUpdate={onUpdate}
                onDelete={onDelete}
                sortDataAscending={sortDataAscending}
                sortDataGraduallySmaller={sortDataGraduallySmaller}
            />
        </>
    )
}