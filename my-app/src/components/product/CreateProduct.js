import { React, useState, useEffect } from "react";
import {
    Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText
    , Button, TextField, Select, FormControl, IconButton,
    OutlinedInput, InputAdornment, InputLabel, Checkbox, MenuItem, ListItemText
} from '@mui/material';
import { makeStyles, Grid } from '@material-ui/core';
import { gridSpacing } from '../../store/constant';

import AddIcon from '@mui/icons-material/Add';
import "../../assets/css/Carousel.scss"
import useCallPostAPI from "../../hooks/UseCallPostApi";
import CreateCategory from "../category/CreateCategory";
import CarouselCustom from "../../layout/MainLayout/CarouselCustom";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const CreateProduct = (props) => {
    const {
        isCreateModal,
        toggleModal,
        loadData,
        callGet,
        handleUpdateImages,
        refreshDataCategory,
        lstCategory,
        enqueueSnackbar
    } = props;
    const classes = useStyles();
    const [scroll, setScroll] = useState('paper');
    const [productData, setProductData] = useState({})
    const { callPost } = useCallPostAPI()
    const [errorValue, setErrorValue] = useState({})
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
        let copyErrorValue = { ...errorValue }
        if (items.length > 0) {
            delete copyErrorValue['color']
        }
        for (let i in items) {
            let item = items[i];
            if (typeof item == 'object') {
                if (!copyLstColorSelected.map((p) => p.value).includes(item.value)) {
                    copyLstColorSelected.push({ value: item.value, label: item.label, price: '', sizes: [], length: 0 });
                } else {
                    let key
                    let index = copyLstColorSelected.findIndex(v => v.value === item.value)
                    if (copyLstColorSelected[index]?.sizes?.length > 0) {
                        copyLstColorSelected[index]?.sizes?.map((x) => {
                            for (key in copyErrorValue) {
                                delete copyErrorValue['quantity' + x.label + item.label]
                            }
                        })
                    }
                    copyLstColorSelected.splice(index, 1);
                    for (key in copyErrorValue) {
                        delete copyErrorValue[item.label]
                        delete copyErrorValue['price' + item.label]
                    }
                }
            }
        }
        setLstColorSelected(copyLstColorSelected)
        setErrorValue({ ...copyErrorValue })
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
        let copyErrorValue = { ...errorValue }
        let index = copyLstColorSelected.map(p => p.label).indexOf(color)
        if (items.length > 0) {
            delete copyErrorValue[color]
        }
        for (let i in items) {
            let item = items[i];
            if (typeof item == 'object') {
                if (!copyLstColorSelected[index].sizes.map((o) => o.value).includes(item.value)) {
                    copyLstColorSelected[index].sizes.push({ value: item.value, label: item.label })
                    copyLstColorSelected[index].length = copyLstColorSelected[index].sizes.length
                } else {
                    copyLstColorSelected[index].sizes.splice(copyLstColorSelected[index].sizes.findIndex(v => v.value === item.value), 1);
                    delete copyErrorValue['quantity' + item.label + color]
                }
            }
        }
        setLstColorSelected(copyLstColorSelected);
        setErrorValue({ ...copyErrorValue })
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
            enqueueSnackbar('Success created product!', { variant: 'success' })
            onClose()
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
        let copyErrorValue = { ...errorValue }
        if (!productData?.name || productData?.name?.trim().length < 1) {
            copyErrorValue['name'] = 'Name is not null'
        }
        if (!productData?.categoryId || productData?.categoryId?.length < 1) {
            copyErrorValue['category'] = 'Category is not null'
        }
        if (lstColorSelected.length < 1) {
            copyErrorValue['color'] = 'Color is not null'
        }
        if (lstColorSelected.length > 0) {
            lstColorSelected.map((p) => {
                if (p.sizes?.length < 1) {
                    copyErrorValue[p.label] = 'Size is not null'
                }
                if (!p.price || p.price < 1) {
                    copyErrorValue['price' + p.label] = 'Price is not null and > >= 1VND'
                }
                if (p.sizes?.length > 0) {
                    p.sizes.map((size) => {
                        if (!size.quantity || size.quantity < 1) {
                            copyErrorValue['quantity' + size.label + p.label] = 'Quantiy need >= 1'
                        }
                    })
                }
                if (!lstImage.map(img => img.color).includes(p.label)) {
                    copyErrorValue['image' + p.label] = 'Image not null'
                }
            })
        }
        if (lstImage.length < 1) {
            copyErrorValue['images'] = 'Image not null'
        }
        setErrorValue({ ...copyErrorValue })
        if (Object.keys(copyErrorValue).length > 0) {
            enqueueSnackbar('Cần nhập đầy đủ thông tin', { variant: 'warning' })
            return
        }
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
        let copyErrorValue = { ...errorValue }
        if (id === 'name') {
            if (e.target.value?.trim()?.length > 0) {
                delete copyErrorValue[id]
            }
            copyProductData[id] = e.target.value;
            setProductData({ ...copyProductData });
        } else if (id === 'category') {
            if (e.target.value !== null || e.target.value !== '' || e.target.value !== 'undefined') {
                delete copyErrorValue[id]
            }
            copyProductData["categoryId"] = e.target.value;
            setProductData({ ...copyProductData });
        } else {
            let index = copyLstColorSelected.map(p => p.label).indexOf(color)
            if (id === 'quantity') {
                copyLstColorSelected[index].sizes.map(p => {
                    if (p.label === size) {
                        p['quantity'] = e.target.value
                        if (e.target.value >= 1) {
                            delete copyErrorValue['quantity' + size + color]
                        }
                    }
                })
            } else if (id === 'price') {
                copyLstColorSelected[index].price = e.target.value;
                if (e.target.value >= 1) delete copyErrorValue['price' + color]
            }
            setLstColorSelected([...copyLstColorSelected])
        }
        setErrorValue({ ...copyErrorValue })
    }

    //Image_______________________________________________________________________
    const [lstImage, setImage] = useState([])

    const handleImages = (e, color, colorId) => {
        let copyErrorValue = { ...errorValue }
        if (color !== 'imgAll') {
            let coppy = [...lstImage]
            if (e.target.files.length <= 0) {
                let index = coppy.map(p => p.color).indexOf(color)
                if (index !== -1) {
                    coppy.splice(index, 1)
                    setImage(coppy)
                    return
                }
            } else {
                let imageFile = e.target.files[0];
                let fileType = imageFile['type'];
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if (!validImageTypes.includes(fileType)) {
                    enqueueSnackbar('File không phải là ảnh', { variant: 'warning' })
                    return
                }
                if (imageFile.size > 5242880) {
                    enqueueSnackbar('Image files need to be less than 5MB', { variant: 'warning' })
                    return
                }
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
                if (e.target.files.length > 0) {
                    delete copyErrorValue['image' + color]
                    delete copyErrorValue['images']
                }
            }
        } else {
            setImage([]);
            if (e.target.files.length > 0) delete copyErrorValue['images']
            let fileNoImage = 0
            let fileSizeToBig = 0
            for (let i = 0; i < e.target.files.length; i++) {
                let imageFile = e.target.files[i];
                let fileType = imageFile['type'];
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if (validImageTypes.includes(fileType)) {
                    setImage((prev) => [...prev, { file: imageFile, fileName: imageFile.name, color: "", colorId: colorId }]);
                    if (imageFile.size > 5242880) fileSizeToBig++
                } else {
                    fileNoImage++
                }
            }
            if (fileNoImage > 0) enqueueSnackbar(fileNoImage + ' file không phải là ảnh', { variant: 'warning' })
            if (fileSizeToBig > 0) {
                enqueueSnackbar(fileSizeToBig + ' image files need to be less than 5MB', { variant: 'warning' })
            }
        }
        setErrorValue({ ...copyErrorValue })
    };

    const onClose = () => {
        setImage([])
        setErrorValue({})
        setLstColorSelected([])
        toggleModal()
    }

    const colorImg = (color) => {
        let text = 'img' + color + 'Product'
        document.getElementById(text).click()
    }
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
                onClose={onClose}
            >
                <DialogTitle id="scroll-dialog-title">Create Product</DialogTitle>
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
                                            error={errorValue.name ? errorValue?.name?.length === 0 ? false : true : false}
                                            helperText={errorValue?.name}
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
                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue.category ? errorValue?.category?.length === 0 ? false : true : false}>
                                                <InputLabel id="category">Category</InputLabel>
                                                <Select
                                                    labelId="category"
                                                    id="category"
                                                    onChange={(event) =>
                                                        handleOnchangeInput(event, "category")
                                                    }
                                                >
                                                    {lstCategory.map((item) => {
                                                        return (
                                                            <MenuItem value={item.value}>{item.label}</MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                                {errorValue?.category && <FormHelperText>{errorValue?.category}</FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item
                                            md={2}
                                            style={{
                                                padding: "0px 12px 0px 0px",
                                                marginLeft: "0%",
                                            }}
                                        >
                                            <FormControl fullWidth sx={{ mt: 4.5, marginLeft: 2.5 }}>
                                                <IconButton sx={{
                                                    backgroundColor: '#90CAF9',
                                                    '&:hover': {
                                                        backgroundColor: '#2196F3'
                                                    }
                                                }} onClick={() => toggleCreateCateModal()} aria-label="menu">
                                                    <AddIcon />
                                                </IconButton>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={gridSpacing}>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue.color ? errorValue?.color?.length === 0 ? false : true : false}>
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
                                        {errorValue?.color && <FormHelperText>{errorValue?.color}</FormHelperText>}
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
                            <Grid item container spacing={1}>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ m: 1, minWidth: 80 }}>
                                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload file
                                            <VisuallyHiddenInput multiple onChange={(e) => { handleImages(e, "imgAll") }} type="file" />
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    <FormControl fullWidth sx={{ marginLeft: 1, marginRight: 1, minWidth: 80 }} error={errorValue['images'] ? errorValue['images'].length === 0 ? false : true : false}>
                                        {lstImage.length >= 1 &&
                                            <CarouselCustom items={lstImage} />
                                        }
                                        {errorValue['images'] && <FormHelperText>{errorValue['images']}</FormHelperText>}
                                    </FormControl>
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
                                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue[item.label] ? errorValue[item.label].length === 0 ? false : true : false}>
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
                                                                {errorValue[item.label] && <FormHelperText>{errorValue[item.label]}</FormHelperText>}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item md={4} >
                                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue['price' + item.label] ? errorValue['price' + item.label].length === 0 ? false : true : false}>
                                                                <InputLabel htmlFor="price">Price</InputLabel>
                                                                <OutlinedInput
                                                                    id="price"
                                                                    startAdornment={<InputAdornment position="start">VNĐ</InputAdornment>}
                                                                    label="price"
                                                                    value={item.price}
                                                                    onChange={(e) => handleOnchangeInput(e, 'price', item.label)}
                                                                />
                                                                {errorValue['price' + item.label] && <FormHelperText>{errorValue['price' + item.label]}</FormHelperText>}
                                                            </FormControl>
                                                        </Grid>
                                                        {item?.sizes?.length >= 1 &&
                                                            item.sizes.map(size => {
                                                                return (
                                                                    <Grid item md={3} key={size.value}>
                                                                        <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue['quantity' + size.label + item.label] ? errorValue['quantity' + size.label + item.label].length === 0 ? false : true : false}>
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
                                                                            {errorValue['quantity' + size.label + item.label] && <FormHelperText>{errorValue['quantity' + size.label + item.label]}</FormHelperText>}
                                                                        </FormControl>
                                                                    </Grid>
                                                                )
                                                            })}
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={4} style={{ borderTop: "1px solid #e5e5e5" }}>
                                                    <Grid item container spacing={gridSpacing}>
                                                        <Grid item md={12}>
                                                            <FormControl fullWidth sx={{ m: 1, minWidth: 80 }} error={errorValue['image' + item.label] ? errorValue['image' + item.label].length === 0 ? false : true : false}>
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
                                                                {errorValue['image' + item.label] && <FormHelperText>{errorValue['image' + item.label]}</FormHelperText>}
                                                            </FormControl>
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
                    <Button className={classes.createButton} onClick={(e) => { createProduct(e) }}>Add</Button>
                    <Button className={classes.cancelButton} onClick={() => onClose()}>Cancel</Button>
                </DialogActions>
                <CreateCategory
                    isCreateModel={isCreateCateModal}
                    toggleCreateModal={toggleCreateCateModal}
                    refreshData={refreshDataCategory}
                />
            </Dialog>
        </>
    )
}

export default CreateProduct;