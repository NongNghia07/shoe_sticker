import React, { useState } from "react";
import {
    Table,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';
import PaginatedItems from "./UsePaginatedItem";
import "../css/Carousel.css"

const Tables = (props) => {

    const {
        title, list, colNames, pageNum = 0, pageSize = 2,
        onUpdate,
        onDelete,
        onCreate,
        onDetail,
        totalPage,
        pageable

    } = props;
    // const [page, setPage] = useState(pageNum);
    // const [formattedList, setFormattedList] = useState(list);
    const getColumnLength = () => {
        const hasActions = onDelete;
        return hasActions ? colNames.length + 1 : colNames.length;
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const onExiting = () => {
        setAnimating(true)
    }

    const onExited = () => {
        setAnimating(false)
    }

    const next = (lstImage) => {
        // if (animating) return;
        // const nextIndex = activeIndex === lstImage.length - 1 ? 0 : activeIndex + 1;
        // setActiveIndex(nextIndex);
    }

    const previous = (lstImage) => {
        // if (animating) return;
        // const nextIndex = activeIndex === 0 ? lstImage.length - 1 : activeIndex - 1;
        // setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slidesImg = (lstImage) => {
        let slides = lstImage.map((item) => {
            return (
                <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={item.id}
                >
                    <img src={item.urlbase} alt={item.altText} style={{ height: "220px" }} />
                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            );
        })
        return slides
    };

    return (
        <div>
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
        </div>
    );
}



export default Tables;