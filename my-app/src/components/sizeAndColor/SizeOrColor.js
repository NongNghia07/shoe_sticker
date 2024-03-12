import React, { useEffect, useState } from "react";
import useCallGetAPI from "../../hooks/UseCallGetApi";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import Tables from "../../hooks/UseTable";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Button, TextField, FormControl
} from '@mui/material';
import {
    useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';

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

export default function SizeOrColor(props) {
    const { data } = props
    const { param } = useParams();
    const classes = useStyles();
    const [sizesOrColors, setSizesOrColors] = useState([])
    const [sizeOrColor, setSizeOrColor] = useState({})
    const [errorValue, setErrorValue] = useState({})
    const { callPost } = useCallPostAPI()
    const { callGet } = useCallGetAPI()
    const [isModel, setIsModel] = useState(false)
    const [isDeleteModel, setIsDeleteModel] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        refreshData()
    }, [param])


    useEffect(() => {
        let arr = []
        data?.map(p => arr.push({ id: p.id, name: p.name }))
        setSizesOrColors(arr)
    }, [data])

    const refreshData = () => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setSizesOrColors(arr)
        }
        callGet(`http://localhost:8080/api/${param}/findAll`, getData)
    }

    const saveSizeOrColor = (id) => {

        const refresh = () => {
            refreshData()
            enqueueSnackbar('Delete success', { variant: 'success' })
            onClose()
        }

        let copy = { ...sizeOrColor }
        let copyErrorValue = { ...errorValue }
        if (!copy.name || copy.name.trim().length < 1) {
            copyErrorValue['name'] = 'Cần nhập thông tin'
        }
        setErrorValue({ ...copyErrorValue })
        if (Object.keys(copyErrorValue).length > 0) {
            enqueueSnackbar('Cần nhập đầy đủ thông tin', { variant: 'warning' })
            return
        }
        callPost(`http://localhost:8080/api/${param}/save`, sizeOrColor, refresh)
    }

    const toggleDeleteModal = (id) => {
        setIsDeleteModel(!isDeleteModel)
        if (!isDeleteModel) {
            setSizeOrColor({ id: id })
            return
        }
        setSizeOrColor({})
    }

    const findSizeOrColorById = (id) => {
        const getData = (data) => {
            setSizeOrColor(data)
            setIsModel(!isModel)
        }
        callGet(`http://localhost:8080/api/${param}/find/${id}`, getData)
    }

    const deleteSizeOrColor = () => {
        const refresh = () => {
            refreshData()
            enqueueSnackbar('Delete success', { variant: 'success' })
            toggleDeleteModal()
        }
        callPost(`http://localhost:8080/api/${param}/delete/${sizeOrColor.id}`, "", refresh)
    }

    const onCreate = () => {
        setIsModel(!isModel)
    }

    const onUpdate = (id) => {
        findSizeOrColorById(id)
    }

    const onDelete = (id) => {
        toggleDeleteModal(id)
    }


    const onDetail = (id) => {

    }

    const sortDataAscending = (data) => {
        let newData = [...sizesOrColors]
        newData.sort((a, b) => a[data] > b[data] ? 1 : -1)
        setSizesOrColors(newData)
    }

    const sortDataGraduallySmaller = (data) => {
        let newData = [...sizesOrColors]
        newData.sort((a, b) => a[data] < b[data] ? 1 : -1)
        setSizesOrColors(newData)
    }

    const onClose = () => {
        setErrorValue({})
        setSizeOrColor({})
        setIsModel(!isModel)
    }


    return (
        <>
            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                open={isModel}
                onClose={onClose}
            >
                <DialogTitle id="scroll-dialog-title">{param}</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, width: 380 }}>
                        <TextField
                            id={param}
                            label={param}
                            required
                            error={errorValue.name ? errorValue?.name?.length === 0 ? false : true : false}
                            helperText={errorValue?.name}
                            value={sizeOrColor?.name}
                            onChange={(e) => { setSizeOrColor({ id: sizeOrColor.id, name: e.target.value }); setErrorValue({}) }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.createButton} onClick={() => { saveSizeOrColor(sizeOrColor.id); }}>Save</Button>
                    <Button className={classes.cancelButton} onClick={() => onClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                open={isDeleteModel}
                onClose={toggleDeleteModal}
            >
                <DialogTitle id="scroll-dialog-title">Thông báo</DialogTitle>
                <DialogContent>
                    Do you want delete?
                </DialogContent>
                <DialogActions>
                    <Button className={classes.deleteButton} onClick={() => { deleteSizeOrColor() }}>Delete</Button>
                    <Button className={classes.cancelButton} onClick={() => toggleDeleteModal()}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Tables
                title={param}
                list={sizesOrColors}
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