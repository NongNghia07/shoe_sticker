import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";

export default function CarouselCustom(props) {
    const { items } = props
    if (Array.isArray(items)) {
        return (
            <Carousel duration={100}>
                {items.map(item => <Item key={item.id} item={item} />)}
            </Carousel>
        )
    } else {
        return (
            <Carousel duration={100}>
                <Item item={items} />
            </Carousel>
        )
    }
}