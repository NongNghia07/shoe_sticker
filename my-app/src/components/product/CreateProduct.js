import { React, useState, useEffect } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from "reactstrap";
import {
    Dialog, DialogActions, DialogContent, DialogTitle
    , Button, TextField, Select, FormControl,
    OutlinedInput, InputAdornment, InputLabel, Checkbox, MenuItem, ListItemText
} from '@mui/material';

import { Grid } from '@material-ui/core';

import { gridSpacing } from '../../store/constant';
import makeAnimated from 'react-select/animated';
import useCallPostAPI from "../../hooks/UseCallPostApi";
import CreateCategory from "../category/CreateCategory";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const animatedComponents = makeAnimated();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateProduct = (props) => {

    const {
        isCreateModal,
        toggleModal,
        loadData,
        callGet,
        handleUpdateImages,
        refreshDataCategory,
        lstCategory
    } = props;
    const [scroll, setScroll] = useState('paper');
    const [productData, setProductData] = useState({})
    const { callPost } = useCallPostAPI()
    let userId = null
    //Category_______________________________________________________________

    const [isCreateCateModal, setIsCreateCateModal] = useState(false)

    useEffect(() => {
        refreshDataCategory()
    }, [])


    const toggleCreateCateModal = () => {
        setIsCreateCateModal(!isCreateCateModal)
    }

    //_______________________________________________________________________


    //Color__________________________________________________________________________
    const [lstColor, setLstColor] = useState([]);
    const [lstColorSelected, setLstColorSelected] = useState([]);

    useEffect(() => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ value: p.id, label: p.name }))
            setLstColor([...arr])
        }
        callGet(`http://localhost:8080/api/color/findAll`, getData)
    }, [])

    const handleOnChangeColor = (e) => {
        let items = e.target.value
        let copyLstColorSelected = [...lstColorSelected];
        for (let i in items) {
            let item = items[i];
            if (typeof item == 'object') {
                if (!copyLstColorSelected.map((p) => p.value).includes(item.value)) {
                    copyLstColorSelected.push({ value: item.value, label: item.label, price: '', sizes: [], length: 0 });
                } else {
                    copyLstColorSelected.splice(copyLstColorSelected.findIndex(v => v.value === item.value), 1);
                }
            }
        }
        setLstColorSelected(copyLstColorSelected)
    }
    //End Color ________________________________________________________________________


    //Size__________________________________________________________________________
    const [lstSize, setLstSize] = useState([]);
    useEffect(() => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ value: p.id, label: p.name }))
            setLstSize([...arr])
        }
        callGet(`http://localhost:8080/api/size/findAll`, getData)

    }, [])

    const handleOnChangeSize = (e, color) => {
        let items = e.target.value
        let copyLstColorSelected = [...lstColorSelected];
        let index = copyLstColorSelected.map(p => p.label).indexOf(color)
        for (let i in items) {
            let item = items[i];
            if (typeof item == 'object') {
                if (!copyLstColorSelected[index].sizes.map((o) => o.value).includes(item.value)) {
                    copyLstColorSelected[index].sizes.push({ value: item.value, label: item.label })
                    copyLstColorSelected[index].length = copyLstColorSelected[index].sizes.length
                    console.log(copyLstColorSelected[index]);
                } else {
                    copyLstColorSelected[index].sizes.splice(copyLstColorSelected[index].sizes.findIndex(v => v.value === item.value), 1);
                }
            }
        }
        setLstColorSelected(copyLstColorSelected);
    }
    //End Size ________________________________________________________________________

    const createProductDetail = (data) => {
        // create media
        const createImages = (poductDetail) => {
            let lstMedia = []
            lstImage.map(p => {
                if (poductDetail.map(o => o.colorId).includes(p.colorId)) {
                    let index = poductDetail.map(x => x.colorId).indexOf(p.colorId)
                    lstMedia.push({ productDataId: data.id, productDetailId: poductDetail[index].id, created: userId, type: 1, url: p.fileName })
                } else {
                    lstMedia.push({ productDataId: data.id, productDetailId: "", created: userId, type: 1, url: p.fileName })
                }
            })
            callPost(`http://localhost:8080/api/media/createAll`, lstMedia);
            handleUpdateImages(lstImage)
            toggleModal()
        }

        // create productDetail
        let copyLstProductDetail = []
        lstColorSelected.map(p => {
            p.sizes.map(s => copyLstProductDetail.push({ productDataId: data.id, colorId: p.value, sizeId: s.value, quantity: s.quantity, price: p.price, created: userId }))
        })
        callPost(`http://localhost:8080/api/productDetail/createAll`, copyLstProductDetail, createImages);
        loadData()
    }



    //Product________________________________________________________________
    const createProduct = (e) => {
        e.preventDefault()
        //create productData
        const createPro = (data) => {
            userId = data.id
            let copyProductData = { ...productData }
            let totalProductQuantity = 0
            lstColorSelected.map(p => p.sizes.map(size => {
                totalProductQuantity += Number(size.quantity)
            }))
            copyProductData['quantity'] = totalProductQuantity
            copyProductData['created'] = userId
            setProductData({ ...copyProductData })
            // call api create pro
            callPost(`http://localhost:8080/api/productData/create`, copyProductData, createProductDetail);
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", createPro)
        //__________________
    }

    const handleOnchangeInput = (e, id, color, size) => {
        let copyLstColorSelected = [...lstColorSelected];
        let copyProductData = { ...productData };
        if (id === 'name') {
            copyProductData[id] = e.target.value;
            setProductData({ ...copyProductData });
        } else if (id === 'category') {
            copyProductData["categoryId"] = e.target.value;
            setProductData({ ...copyProductData });
        } else {
            let index = copyLstColorSelected.map(p => p.label).indexOf(color)
            if (id === 'quantity') {
                copyLstColorSelected[index].sizes.map(p => {
                    if (p.label === size) {
                        p['quantity'] = e.target.value
                    }
                })
            } else if (id === 'price') {
                copyLstColorSelected[index].price = e.target.value;
            }
            setLstColorSelected([...copyLstColorSelected])
        }
    }

    //Image_______________________________________________________________________
    const [lstImage, setImage] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const handleImages = (e, color, colorId) => {
        if (color !== 'imgAll') {
            let coppy = [...lstImage]
            if (e.target.files.length <= 0) {
                let index = coppy.map(p => p.color).indexOf(color)
                if (index !== -1) {
                    coppy.splice(index, 1)
                    setImage(coppy)
                    setActiveIndex(0)
                    return
                }
            } else {
                let imageFile = e.target.files[0];
                let index = coppy.map(p => p.fileName).indexOf(imageFile.name)
                if (index !== -1) {
                    coppy.map(p => { if (p.color === color) return p.color = "", p.colorId = "" })
                    coppy[index].color = color
                    coppy[index].colorId = colorId
                    setImage(coppy)
                } else {
                    coppy.map(p => { if (p.color === color) return p.color = "", p.colorId = "" })
                    coppy.push({ file: imageFile, fileName: imageFile.name, color: color, colorId: colorId })
                    setImage(coppy)
                }
            }
        } else {
            setImage([]);
            //Get files
            for (let i = 0; i < e.target.files.length; i++) {
                // if(!".jpg" in e.target.files[i]){
                //     continue;
                // }
                let imageFile = e.target.files[i];
                setImage((prev) => [...prev, { file: imageFile, fileName: imageFile.name, color: "", colorId: colorId }]);
            }
            setActiveIndex(0)
        }
    };

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

    const colorImg = (color) => {
        let text = 'img' + color + 'Product'
        document.getElementById(text).click()
    }

    let slides = lstImage.map((item) => {
        return (
            <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={item.name}
            >
                <img src={URL.createObjectURL(item.file)} alt={item.altText} />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        );
    });

    //_____________________________________________________________________________

    return (
        <>
            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                scroll={scroll}
                maxWidth={'md'}
                fullWidth={true}
                open={isCreateModal}
                onClose={toggleModal}
            >
                <DialogTitle id="scroll-dialog-title">Add</DialogTitle>
                <DialogContent dividers={scroll === 'paper'} >
                    <Grid container spacing={gridSpacing} maxWidth={'md'}>
                        <Grid item md={7}>
                            <Grid item container spacing={gridSpacing}>
                                <Grid item md={6}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            required
                                            value={productData.name}
                                            onChange={(e) =>
                                                handleOnchangeInput(e, "name")
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6}>
                                    <Grid item container spacing={gridSpacing}>
                                        <Grid item md={10}>
                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                                <InputLabel id="category">Category</InputLabel>
                                                <Select

                                                    labelId="category"
                                                    id="category"
                                                    // label="Category *"
                                                    onChange={(event) =>
                                                        handleOnchangeInput(event, "category")
                                                    }
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {lstCategory.map((item) => {
                                                        return (
                                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item
                                            md={2}
                                            style={{
                                                padding: "0px 12px 0px 0px",
                                                marginLeft: "0%",
                                            }}
                                        >
                                            <p for="category">Add</p>
                                            <button
                                                type="button"
                                                style={{
                                                    border: "1px solid",
                                                    width: "100%",
                                                    borderRadius: "15px",
                                                }}
                                                onClick={() => toggleCreateCateModal()}
                                            >
                                                +
                                            </button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item container spacing={gridSpacing}>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel id="multiple-checkbox-label">Color</InputLabel>
                                        <Select
                                            labelId="multiple-checkbox-label"
                                            id="multiple-checkbox"
                                            multiple
                                            value={lstColorSelected.map((color) => color.label)}
                                            onChange={(event) => handleOnChangeColor(event)}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {lstColor.length > 0 && lstColor.map((p) => (
                                                <MenuItem key={p.value} value={p}>
                                                    <Checkbox checked={lstColorSelected.map(o => o.value).indexOf(p.value) > -1} />
                                                    <ListItemText primary={p.label} />
                                                </MenuItem>
                                            )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label="Mô tả"
                                            multiline
                                            maxRows={4}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={5}>
                            <Grid item container spacing={gridSpacing}>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput multiple onChange={(e) => { handleImages(e, "imgAll") }} type="file" />
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    {lstImage.length >= 1 &&
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={next}
                                            previous={previous}
                                            style={{
                                                border: "1px solid",
                                                marginTop: "1%",
                                                marginBottom: "2%"
                                            }}
                                        >
                                            <CarouselIndicators items={lstImage} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                            {slides}
                                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                        </Carousel>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        {lstColorSelected.length >= 1 && (
                            <Grid item md={12} >
                                <Grid item container spacing={gridSpacing}>
                                    {lstColorSelected.map((item) => {
                                        let arrSize = [...item.sizes]
                                        return (
                                            <>
                                                <Grid item md={8} style={{ borderTop: "1px solid #e5e5e5" }}>
                                                    <Grid item container spacing={gridSpacing}>
                                                        <Grid item md={8} >
                                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                                                <InputLabel id="Size">Size {item.label}</InputLabel>
                                                                <Select
                                                                    labelId="Size"
                                                                    id="Size"
                                                                    multiple
                                                                    value={arrSize.map((size) => size.label)}
                                                                    onChange={(event) => handleOnChangeSize(event, item.label)}
                                                                    input={<OutlinedInput label="Tag" />}
                                                                    renderValue={(selected) => selected.join(', ')}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {lstSize.map((p) => (
                                                                        <MenuItem key={p.value} value={p}>
                                                                            <Checkbox checked={arrSize.map(o => o.value).indexOf(p.value) > -1} />
                                                                            <ListItemText primary={p.label} />
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={4} >
                                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                                                <InputLabel htmlFor="price">Price</InputLabel>
                                                                <OutlinedInput
                                                                    id="price"
                                                                    startAdornment={<InputAdornment position="start">VNĐ</InputAdornment>}
                                                                    label="price"
                                                                    value={item.price}
                                                                    onChange={(e) => handleOnchangeInput(e, 'price', item.label)}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                        {item?.sizes?.length >= 1 &&
                                                            item.sizes.map(size => {
                                                                return (
                                                                    <Grid item md={3} key={size.value}>
                                                                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                                                            <TextField
                                                                                id="outlined-number"
                                                                                label={"Quantity Size:" + size.label}
                                                                                type="Number"
                                                                                InputLabelProps={{
                                                                                    shrink: true,
                                                                                }}
                                                                                value={size.quantity}
                                                                                onChange={(e) => handleOnchangeInput(e, 'quantity', item.label, size.label)}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                )
                                                            })}
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={4} style={{ borderTop: "1px solid #e5e5e5" }}>
                                                    <Grid item container spacing={gridSpacing}>
                                                        <Grid item md={12}>
                                                            <input
                                                                type="file"
                                                                id={`img${item.label}Product`}
                                                                onChange={(e) => { handleImages(e, item.label, item.value) }}
                                                                style={{
                                                                    border: "1px solid",
                                                                    width: "100%",
                                                                    borderRadius: "5px",
                                                                    display: 'none'
                                                                }}
                                                            />
                                                            {lstImage.length >= 1 && lstImage.map(p => p.color).includes(item.label) &&
                                                                lstImage.map(img => {
                                                                    if (img.color == item.label) {
                                                                        return (
                                                                            <img src={URL.createObjectURL(img.file)}
                                                                                width="100%"
                                                                                height="242rem"
                                                                                style={{
                                                                                    borderRadius: "15px",
                                                                                    border: "1px solid",
                                                                                    marginTop: "3%",
                                                                                    marginRight: "2%",
                                                                                }}
                                                                                onClick={(e) => colorImg(item.label)}
                                                                            />
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                            {lstImage.length >= 1 && !lstImage.map(p => p.color).includes(item.label) &&
                                                                <img src=""
                                                                    width="100%"
                                                                    height="242rem"
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        border: "1px solid",
                                                                        marginTop: "3%",
                                                                        marginRight: "2%",
                                                                    }}
                                                                    onClick={(e) => colorImg(item.label)}
                                                                />
                                                            }
                                                            {lstImage.length < 1 &&
                                                                <img src=""
                                                                    width="100%"
                                                                    height="242rem"
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        border: "1px solid",
                                                                        marginTop: "3%",
                                                                        marginRight: "2%",
                                                                    }}
                                                                    onClick={(e) => colorImg(item.label)}
                                                                />
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        );
                                    }
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => { createProduct(e) }}>Add</Button>
                    <Button onClick={() => { toggleModal(); setImage([]) }}>Cancel</Button>
                </DialogActions>
                {/* <CreateCategory
                    isCreateModel={isCreateCateModal}
                    toggleCreateModal={toggleCreateCateModal}
                    refreshData={refreshDataCategory}
                /> */}
            </Dialog>
        </>
    )
}

export default CreateProduct;