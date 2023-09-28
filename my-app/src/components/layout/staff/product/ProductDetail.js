import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "../../../../Firebase";
import {
    useParams
} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from "reactstrap";

const ProductDetail = () => {
    let { id } = useParams();
    const [productDetailsOld, setProductDetailsOld] = useState([])
    const [sizes, setSizes] = useState([])
    const imagesListRef = ref(storage, "images/");
    const [imageUrls, setImageUrls] = useState([]);
    const [productDetails, setProductDetails] = useState([])
    const [lstMediasProduct, setLstMediasProduct] = useState([])
    const [productDetailSelected, setProductDetailSelected] = useState(null)
    const [lstImage, setImage] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [priceAndQuantity, setPriceAndQuantity] = useState({})

    useEffect(() => {
        setImageUrls([])
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                let nameImg = item.name;
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { nameImg, url }]);
                });
            });
        });
    }, [id])

    useEffect(() => {
        findProductDetailsByIDProduct(id)
        findMediaByProduct(id)
    }, [id])

    useEffect(() => {
        let arr = []
        lstMediasProduct.map(p => {
            if (imageUrls.map((image) => image.nameImg).includes(p.url)) {
                let base = imageUrls.filter((o) => o.nameImg == p.url)
                arr.push({ url: base[0].url, file: "", fileName: p.url, color: p.color, colorId: p.colorId })
            }
        })
        setImage([...arr])
    }, [imageUrls])

    // set  arr sizes
    useEffect(() => {
        setProductDetails([...productDetailsOld])
        let arrSizes = []
        productDetailsOld.map(p => {
            let arr = []
            p.sizes?.map(s => {
                return arr.push({ value: s.id, label: s.label, status: true })
            })
            return arrSizes = [...arrSizes, ...arr]
        })
        setTimeout(() => {
            let uniqueChars = [];
            arrSizes.forEach((c) => {
                if (!uniqueChars.map(p => p.value).includes(c.value)) {
                    uniqueChars.push(c);
                }
            });
            setSizes([...uniqueChars])
        }, 1000);
    }, [productDetailsOld])

    // update Arr sizes
    const updateSizes = (color_id) => {
        if (color_id) {
            let index = productDetails.map(p => p.id).indexOf(color_id)
            sizes.map(s => {
                if (productDetails[index].sizes?.map(o => o.id).includes(s.value)) {
                    return s.status = true
                } else {
                    return s.status = false
                }
            })
        } else {
            sizes.map(s => s.status = true)
        }
        setSizes([...sizes])
    }

    //update colorStatus
    const updateColoStatus = (size) => {
        if (size) {
            productDetails.map(p => {
                if (p.sizes?.map(s => s.id).includes(size)) {
                    return p.status = 1
                } else {
                    return p.status = 2
                }
            })
        } else {
            productDetails.map(p => p.status = 1)
        }
        setProductDetails([...productDetails])
    }

    const editPriceAndQuantity = () => {
        let btnColorActive = document.getElementsByClassName('active-color')
        let btnSizeActive = document.getElementsByClassName('active-size')
        if (btnColorActive.length >= 1) {
            let index = productDetails.map(p => p.id).indexOf(Number(btnColorActive[0].value))
            setPriceAndQuantity({ price: productDetails[index].price, quantity: "" })
            if (btnSizeActive.length >= 1) {
                productDetails[index].sizes.map(p => {
                    if (p.id === Number(btnSizeActive[0].value)) {
                        setPriceAndQuantity({ ...priceAndQuantity, quantity: p.quantity })
                    }
                })
            }
        }
    }

    // set sizeActive and update colorStatus
    const handleClickSize = (e, id) => {
        // find btn-size active
        let btnSizeActive = document.getElementsByClassName('active-size')
        if (btnSizeActive.length >= 1) {
            if (btnSizeActive[0].value == id) {
                e.target.classList.remove('active-size');
                updateColoStatus()
            } else {
                let btnSize = document.getElementsByClassName('btn-size')
                for (let i = 0; i < btnSize.length; i++) {
                    btnSize.item(i).classList.remove('active-size');
                }
                e.target.classList.add('active-size')
                updateColoStatus(id)
            }
        } else {
            e.target.classList.add('active-size')
            updateColoStatus(id)
        }
        editPriceAndQuantity()
    }

    // update Arr sizes and set imgColor
    const handleClickColor = (e, color) => {
        // find btn-color-active
        let btnColorActive = document.getElementsByClassName('active-color')
        if (btnColorActive.length >= 1) {
            if (btnColorActive[0]?.value == color.id) {
                e.target.classList.remove('active-color');
                setProductDetailSelected(null)
                updateSizes()
                return
            } else {
                let btnSize = document.getElementsByClassName('btn-color')
                for (let i = 0; i < btnSize.length; i++) {
                    btnSize.item(i).classList.remove('active-color');
                }
                e.target.classList.add('active-color')
                updateSizes(color.id)
            }
        } else {
            e.target.classList.add('active-color')
            updateSizes(color.id)
        }
        let media = lstMediasProduct.filter((m) => m.productDetailId === color.id)
        let base = imageUrls.filter((o) => o.nameImg === media[0]?.url)
        setProductDetailSelected({ ...color, url: base[0]?.url })
        editPriceAndQuantity()
    }

    // set imgColor
    const handleHoveColor = (color) => {
        let btnColorActive = document.getElementsByClassName('active-color')
        let media = lstMediasProduct.filter((m) => m.productDetailId === color.id)
        let base = imageUrls.filter((o) => o.nameImg === media[0]?.url)
        if (btnColorActive.length >= 1) {
            setProductDetailSelected({ ...productDetailSelected, url: base[0]?.url })
            return
        }
        setProductDetailSelected({ url: base[0]?.url })
    }

    const handleOutHoveColor = () => {
        let btnColorActive = document.getElementsByClassName('active-color')
        if (btnColorActive.length >= 1) {
            let media = lstMediasProduct.filter((m) => m.productDetailId == btnColorActive[0]?.value)
            let base = imageUrls.filter((o) => o.nameImg === media[0]?.url)
            setProductDetailSelected({ ...productDetailSelected, url: base[0]?.url })
            return
        }
        setProductDetailSelected(null)
    }

    const findProductDetailsByIDProduct = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/productDetail/findAllByProductDataId?id=${id}`)
            let data = res ? res.data : []
            setProductDetailsOld(data)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    const findMediaByProduct = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/media/findAllByProductData_Id/${id}`)
            let data = res ? res.data : []
            setLstMediasProduct(data)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    const onExiting = () => {
        setAnimating(true)
    }

    const onExited = () => {
        setAnimating(false)
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === lstImage.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? lstImage.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    let slides = lstImage.map((item) => {
        if (!productDetailSelected) {
            return (
                <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={item.url}
                >
                    <img src={item.url} alt={item.altText} />
                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            );
        } else {
            return (
                <CarouselItem
                    onExiting={onExiting}
                    onExited={onExited}
                    key={item.url}
                >
                    <img src={productDetailSelected.url} alt={item.altText} />
                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            )
        }
    });

    return (
        <>
            <Container
                className="bg-light border"
                fluid="sm"
            >
                {productDetails.length >= 1 &&
                    <Row>
                        <Col md={5} style={{ textAlign: "left" }}>
                            {lstImage.length >= 1 &&
                                <Carousel
                                    className="carousel-Prodetail"
                                    activeIndex={activeIndex}
                                    next={next}
                                    previous={previous}
                                    style={{
                                        // border: "1px solid",
                                        marginTop: "1%",
                                        marginBottom: "2%",
                                        width: "100%"
                                    }}
                                >
                                    <CarouselIndicators items={lstImage} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                </Carousel>
                            }
                            {/* <div className="cover object">
                                <img className="contain" src={imageUrls[0]?.url} alt="Paris" style={{ width: "100%", height: "350px" }} />
                            </div> */}
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={12} style={{ textAlign: "left", marginBottom: "3%" }}>
                                    <h1>{productDetails[0].productDataName}</h1>
                                </Col>
                                <Col md={12} style={{ textAlign: "left", marginBottom: "3%" }}>
                                    {priceAndQuantity.price &&
                                        <h5>Giá: {priceAndQuantity.price}</h5>
                                    }
                                    {!priceAndQuantity.price &&
                                        <h5>Giá: {productDetails[0].price}</h5>
                                    }
                                </Col>
                                <Col md={2} style={{ textAlign: "left" }}>
                                    <h5><span style={{ marginRight: "5%", marginBottom: "3%" }}>Color</span></h5>
                                </Col>
                                <Col md={10} style={{ textAlign: "left", marginBottom: "3%" }}>
                                    {productDetails.map((item) => {
                                        if (item.status === 1) {
                                            return <button key={item.id} style={{ marginRight: "2%" }} onClick={(e) => { handleClickColor(e, item) }} onMouseOver={() => handleHoveColor(item)} onMouseLeave={() => handleOutHoveColor()} value={item.id} className="btn-color">{item.label}</button>
                                        } else {
                                            return <button key={item.id} className="btn-color" style={{ marginRight: "2%", borderColor: 'white', color: '#b6b6b6fe' }} disabled >{item.label}</button>
                                        }
                                    })}
                                </Col>
                                <Col md={2} style={{ textAlign: "left", marginBottom: "3%" }}>
                                    <h5><span style={{ marginRight: "5%" }}>Size</span> </h5>
                                </Col>
                                <Col md={10} style={{ textAlign: "left", marginBottom: "3%" }}>
                                    {sizes.map((item) => {
                                        if (item.status === true) {
                                            return <button key={item.value} style={{ marginRight: "2%" }} onClick={(e) => { handleClickSize(e, item.value) }} value={item.value} className="btn-size">{item.label}</button>
                                        } else {
                                            return <button key={item.value} className="btn-size" style={{ marginRight: "2%", borderColor: 'white', color: '#b6b6b6fe' }} disabled >{item.label}</button>
                                        }
                                    })}
                                </Col>
                                <Col md={12} style={{ textAlign: "left" }}>
                                    {priceAndQuantity.quantity &&
                                        <p>Còn: {priceAndQuantity.quantity} sản phẩm</p>
                                    }
                                    {!priceAndQuantity.quantity &&
                                        <p>Còn: {productDetails[0].sizes[0].quantity} sản phẩm</p>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }
            </Container>
        </>
    )
}

export default ProductDetail;