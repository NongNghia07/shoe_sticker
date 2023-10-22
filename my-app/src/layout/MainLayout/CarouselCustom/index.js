import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";

export default function CarouselCustom(props) {
    const { items } = props
    return (
        <Carousel animation='slide'>
            {items.map((item, i) => <Item key={item.id} item={item} />)}
        </Carousel>
    )
}