import React, { useState } from "react";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import {
    Button,
    makeStyles,
} from '@material-ui/core';
import "../assets/css/Carousel.scss"
import CarouselCustom from "../layout/MainLayout/CarouselCustom";

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
    updateButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.warning.main,
        border: '1px solid',
        borderColor: theme.palette.warning.main,
        color: theme.palette.text.dark,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
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
    }
}));


const Tables = (props) => {
    const classes = useStyles();
    const {
        title,
        list,
        colNames,
        onUpdate,
        onDelete,
        onCreate,
        onDetail,
        sortDataAscending,
        sortDataGraduallySmaller
    } = props;
    const [isSort, setIsSort] = useState(false)

    const sortData = (id) => {
        if (!id) return
        setIsSort(!isSort)
        if (!isSort) {
            sortDataGraduallySmaller(id)
        } else {
            sortDataAscending(id)
        }
    }

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }} className="table-container">
                    <Table title aria-label={title}>
                        <TableHead>
                            <TableRow>
                                {colNames.map((headerItem, index) => (
                                    <TableCell key={index}
                                        onClick={() => sortData(headerItem.id)}
                                    >
                                        {headerItem.title.toUpperCase()}
                                    </TableCell>
                                ))}
                                <>
                                    {onCreate &&
                                        <>
                                            <TableCell>Actions</TableCell>
                                            <TableCell>
                                                <Button
                                                    className={classes.createButton}
                                                    type='submit'
                                                    onClick={() => { onCreate() }}
                                                >
                                                    ADD
                                                </Button></TableCell>
                                        </>
                                    }
                                </>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length > 0 &&
                                list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj) => {
                                    let id = obj.id
                                    return (
                                        <TableRow key={obj.id}>
                                            {Object.values(obj).map((value, index2) => {
                                                if (!Array.isArray(value)) {
                                                    return (
                                                        <TableCell
                                                            key={index2}

                                                            onClick={() => onDetail(id)}
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    )
                                                } else {
                                                    return (
                                                        <TableCell
                                                            sx={{ width: 230 }}
                                                            key={index2}
                                                            onClick={() => onDetail(id)}
                                                        >
                                                            {value.length > 0 &&
                                                                <CarouselCustom items={value} />
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                            })}
                                            {onUpdate && (
                                                <TableCell style={{ width: 60 }} align="right">
                                                    <Button
                                                        className={classes.updateButton} type='buttom'
                                                        onClick={() => onUpdate(obj.id)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            )}
                                            {onDelete && (
                                                <TableCell align="right" style={{ width: 60 }}>
                                                    <Button
                                                        onClick={() => onDelete(obj.id)}
                                                        type='buttom'
                                                        className={classes.deleteButton}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )
                                }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component='div'
                    count={list.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default Tables;