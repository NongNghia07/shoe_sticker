import React, { useState } from "react";
import {
    Table
} from 'reactstrap';
import PaginatedItems from "./UsePaginatedItem";

const Tables = (props) => {

    const {
        title, list, colNames, pageNum = 0, pageSize = 2,
        onUpdate,
        onDelete,
        onCreate,
        totalPage,
        pageable

    } = props;
    const [page, setPage] = useState(pageNum);
    const [formattedList, setFormattedList] = useState(list);
    const getColumnLength = () => {
        const hasActions = onDelete;
        return hasActions ? colNames.length + 1 : colNames.length;
    };

    const onBack = () => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    const onNext = () => {
        setPage(page + 1 < list.length / pageSize ? page + 1 : page);
    };

    // const groupBy = (colName) => {
    //     const groupedList = {};

    //     list.forEach((item) => {
    //         const value = item[colName] || "Unknown";
    //         if (!groupedList[value]) {
    //             groupedList[value] = [];
    //         }
    //         groupedList[value].push(item);
    //     });

    //     setFormattedList(Object.values(groupedList).flat(Infinity));
    // };

    return (
        <div>
            {list.length > 0 && (
                <Table
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
                                // onClick={() => groupBy(headerItem)}
                                >
                                    {headerItem.toUpperCase()}
                                </th>
                            ))}
                            <>
                                {onCreate &&
                                    <>
                                        <th>Actions</th>
                                        <th>
                                            <button
                                                class="btn btn-primary" type='buttom'
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
                        {list.map((obj) => (
                            <tr key={obj.id}>
                                {Object.values(obj).map((value, index2) => (
                                    <td
                                        key={index2}
                                        className="hoverable"
                                        onClick={() => onUpdate(obj)}
                                    >
                                        {value}
                                    </td>
                                ))}
                                {onUpdate && (
                                    <td>
                                        <button
                                            class="btn btn-primary update" type='buttom'
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
                                            class="btn btn-primary update" type='buttom'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <PaginatedItems
                itemsPerPage={totalPage}
                pageable={pageable}
            />
        </div>
    );
}



export default Tables;