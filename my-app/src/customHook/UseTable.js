import React, { useState } from "react";
import "../css/Carousel.css"
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const Tables = (props) => {

    const {
        title, list, colNames, pageNum = 0, pageSize = 2,
        onUpdate,
        onDelete,
        onCreate,
        onDetail,
        totalPage,
        pageable,
        sortDataAscending,
        sortDataGraduallySmaller
    } = props;

    // const getColumnLength = () => {
    //     const hasActions = onDelete;
    //     return hasActions ? colNames.length + 1 : colNames.length;
    // };
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                                                <button
                                                    className="btn btn-primary" type='buttom'
                                                    onClick={() => { onCreate() }}
                                                >
                                                    ADD
                                                </button></TableCell>
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
                                                            className="hoverable"
                                                            onClick={() => onDetail(id)}
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    )
                                                }
                                            })}
                                            {onUpdate && (
                                                <TableCell style={{ width: 60 }} align="right">
                                                    <button
                                                        className="btn btn-primary update" type='buttom'
                                                        onClick={() => onUpdate(obj.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </TableCell>
                                            )}
                                            {onDelete && (
                                                <TableCell align="right" style={{ width: 60 }}>
                                                    <button
                                                        onClick={() => onDelete(obj.id)}
                                                        className="btn btn-primary update" type='buttom'
                                                    >
                                                        Delete
                                                    </button>
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


            {/* <Table
                bordered
                cellSpacing="0"
            >
                <thead>
                    <tr>
                        <th colSpan={getColumnLength() + 2}>
                            <h3>{title}</h3>
                        </th>
                    </tr>
                    <tr>
                        {colNames.map((headerItem, index) => (
                            <th key={index}
                                onClick={() => sortData(headerItem.id)}
                            >
                                {headerItem.title.toUpperCase()}
                            </th>
                        ))}
                        <>
                            {onCreate &&
                                <>
                                    <th>Actions</th>
                                    <th>
                                        <button
                                            className="btn btn-primary" type='buttom'
                                            onClick={() => { onCreate() }}
                                        >
                                            ADD
                                        </button></th>
                                </>
                            }
                        </>
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 &&
                        list.map((obj) => {
                            let id = obj.id
                            return (
                                <tr key={obj.id}>
                                    {Object.values(obj).map((value, index2) => {
                                        if (!Array.isArray(value)) {
                                            return (
                                                <td
                                                    key={index2}
                                                    className="hoverable"
                                                    onClick={() => onDetail(id)}
                                                >
                                                    {value}
                                                </td>
                                            )
                                        } else {
                                            let index = 0
                                            return (
                                                <td
                                                    key={index2}
                                                    className="hoverable"
                                                    style={{
                                                        width: "400px"
                                                    }}
                                                >
                                                    <Carousel
                                                        activeIndex={index}
                                                        next={next}
                                                        previous={previous}
                                                    >
                                                        <CarouselIndicators items={value} activeIndex={index} onClickHandler={goToIndex} />
                                                        {slidesImg(value)}
                                                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => index === 0 ? value.length - 1 : index--} />
                                                        <CarouselControl direction="next" directionText="Next" onClickHandler={() => index === 0 ? value.length - 1 : index--} />
                                                    </Carousel>
                                                </td>
                                            )
                                        }
                                    })}
                                    {onUpdate && (
                                        <td>
                                            <button
                                                className="btn btn-primary update" type='buttom'
                                                onClick={() => onUpdate(obj.id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    )}
                                    {onDelete && (
                                        <td>
                                            <button
                                                onClick={() => onDelete(obj.id)}
                                                className="btn btn-primary update" type='buttom'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </Table>
            <PaginatedItems
                itemsPerPage={totalPage}
                pageable={pageable}
            />
        </div> */}
        </>
    );
}

export default Tables;