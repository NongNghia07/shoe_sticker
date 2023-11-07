import React, { useState, useEffect } from "react";
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "../../Firebase";
import {
    useParams
} from "react-router-dom";
import useCallGetAPI from "../../hooks/UseCallGetApi";
import CarouselCustom from "../../layout/MainLayout/CarouselCustom";
import { Grid } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';
import {
    Typography, ToggleButton, ToggleButtonGroup, FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import "../../assets/css/Carousel.scss"

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: theme.palette.background.default,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            // borderRadius: theme.palette.borderRadius,
        },
        '&:first-of-type': {
            // borderRadius: theme.palette.borderRadius,
        },
    },
}));

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
    const [priceAndQuantity, setPriceAndQuantity] = useState({})
    const { callGet } = useCallGetAPI()
    const [colorSelected, setColorSelected] = useState();
    const [sizeSelected, setSizeSelected] = useState();

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
                arr.push({ url: base[0].url, file: base[0].url, fileName: p.url, color: p.color, colorId: p.colorId })
            }
        })
        setImage([...arr])
    }, [imageUrls, id])

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
    const updateSizes = (id) => {
        if (id) {
            let index = productDetails.map(p => p.id).indexOf(id)
            sizes.map(s => {
                if (productDetails[index]?.sizes?.map(o => o.id).includes(s.value)) {
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
                    return p.status = true
                } else {
                    return p.status = false
                }
            })
        } else {
            productDetails.map(p => p.status = true)
        }
        setProductDetails([...productDetails])
    }

    const editPriceAndQuantity = (color, size) => {
        if (color) {
            let index = productDetails.map(p => p.colorId).indexOf(Number(color?.colorId))
            setPriceAndQuantity({ price: productDetails[index]?.price, quantity: "" })
            if (size) {
                productDetails[index]?.sizes?.map(p => {
                    if (p.id === Number(size)) {
                        setPriceAndQuantity({ price: productDetails[index]?.price, quantity: p.quantity })
                    }
                })
            }
        }
    }

    // set sizeActive and update colorStatus
    const handleClickSize = (e, id) => {
        setSizeSelected(id)
        updateColoStatus(id)
        editPriceAndQuantity(colorSelected, id)
    }

    // update Arr sizes and set imgColor
    const handleClickColor = (e, color) => {
        setColorSelected(color)
        if (!color) {
            setProductDetailSelected(null)
            updateSizes()
            return
        }
        updateSizes(color.id)
        let media = lstMediasProduct.filter((m) => m.colorId === color.colorId)
        let base = imageUrls.filter((o) => o.nameImg === media[0]?.url)
        setProductDetailSelected({ ...color, file: base[0]?.url })
        editPriceAndQuantity(color, sizeSelected)
    }

    // set imgColor
    const handleHoveColor = (color) => {
        let media = lstMediasProduct.filter((m) => m.colorId === color.colorId)
        let base = imageUrls.filter((o) => o.nameImg === media[0]?.url)
        if (colorSelected) {
            return
        }
        setProductDetailSelected({ url: base[0]?.url, file: base[0]?.url })
    }

    const handleOutHoveColor = () => {
        if (colorSelected) {
            return
        }
        setProductDetailSelected(null)
    }

    const findProductDetailsByIDProduct = async (id) => {
        const getData = (data) => {
            setProductDetailsOld(data)
        }
        callGet(`http://localhost:8080/api/productDetail/findAllByProductDataId?id=${id}`, getData)
    }

    const findMediaByProduct = async (id) => {
        const getData = (data) => {
            setLstMediasProduct(data)
        }
        callGet(`http://localhost:8080/api/media/findAllByProductData_Id/${id}`, getData)
    }

    return (
        <>
            {productDetails.length >= 1 &&
                <Grid container spacing={gridSpacing} maxWidth={'md'}>
                    <Grid item md={5}>
                        <FormControl fullWidth sx={{ m: 1, p: 2, minWidth: 80 }}>
                            {lstImage.length >= 1 && !productDetailSelected &&
                                <CarouselCustom items={lstImage} />
                            }
                            {lstImage.length >= 1 && productDetailSelected &&
                                <CarouselCustom items={productDetailSelected} />
                            }
                        </FormControl>
                    </Grid>
                    <Grid item md={7}>
                        <Grid item container spacing={gridSpacing}>
                            <Grid item md={12}>
                                <FormControl fullWidth sx={{ mt: 3, minWidth: 80 }}>
                                    <Typography variant="h1" component="h2" >
                                        {productDetails[0].productDataName}
                                    </Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} >
                                {priceAndQuantity.price &&
                                    <Typography variant="h3">
                                        Giá: {priceAndQuantity.price}
                                    </Typography>
                                }
                                {!priceAndQuantity.price &&
                                    <Typography variant="h3">
                                        Giá: {productDetails[0].price}
                                    </Typography>
                                }
                            </Grid>
                            <Grid item md={2} sx={{ mt: 1.2 }}>
                                <Typography variant="h3">
                                    Color
                                </Typography>
                            </Grid>
                            <Grid item md={10}>
                                <StyledToggleButtonGroup
                                    size="small"
                                    color="primary"
                                    value={colorSelected}
                                    exclusive
                                    onChange={handleClickColor}
                                    aria-label="text alignment"
                                >
                                    {productDetails.map((item) => {
                                        if (item.status) {
                                            return (
                                                <ToggleButton sx={{
                                                    color: 'black', '&:hover': {
                                                        backgroundColor: '#ebebeb'
                                                    },
                                                }} onMouseOver={() => handleHoveColor(item)}
                                                    onMouseLeave={() => handleOutHoveColor()}
                                                    value={item} aria-label="left aligned">
                                                    {item.label}
                                                </ToggleButton>
                                            )
                                        } else {
                                            return (
                                                <ToggleButton disabled
                                                    value={item} aria-label="left aligned">
                                                    {item.label}
                                                </ToggleButton>
                                            )
                                        }
                                    })}
                                </StyledToggleButtonGroup>
                            </Grid>
                            <Grid item md={2} sx={{ mt: 1.2 }}>
                                <Typography variant="h3">
                                    Size
                                </Typography>
                            </Grid>
                            <Grid item md={10}>
                                <StyledToggleButtonGroup
                                    size="small"
                                    color="primary"
                                    value={sizeSelected}
                                    exclusive
                                    onChange={handleClickSize}
                                    aria-label="text alignment"
                                >
                                    {sizes.map((item) => {
                                        if (item.status) {
                                            return (
                                                <ToggleButton sx={{
                                                    color: 'black', '&:hover': {
                                                        backgroundColor: '#ebebeb'
                                                    },
                                                }}
                                                    value={item.value} aria-label="left aligned">
                                                    {item.label}
                                                </ToggleButton>
                                            )
                                        } else {
                                            return (
                                                <ToggleButton disabled
                                                    value={item.value} aria-label="left aligned">
                                                    {item.label}
                                                </ToggleButton>
                                            )
                                        }
                                    })}
                                </StyledToggleButtonGroup>
                            </Grid>
                            <Grid item md={12}>
                                {priceAndQuantity.quantity &&
                                    <p>Còn: {priceAndQuantity.quantity} sản phẩm</p>
                                }
                                {!priceAndQuantity.quantity &&
                                    <p>Còn: {productDetails[0].sizes[0].quantity} sản phẩm</p>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default ProductDetail;