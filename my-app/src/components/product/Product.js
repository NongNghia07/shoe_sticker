import React, { useState, useEffect } from "react";
import useCallGetAPI from "../../hooks/UseCallGetApi";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import Tables from "../../hooks/UseTable";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@mui/material';
import { storage } from "../../Firebase";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const Product = (props) => {
    const { data } = props
    const classes = useStyles();
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const { response, callGet } = useCallGetAPI(undefined, false);
    const { callPost } = useCallPostAPI()
    const { enqueueSnackbar } = useSnackbar();
    const [lstproductData, setLstProductData] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [lstMediasProduct, setLstMediasProduct] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    // const [totalPageAndNumber, setTotalPageAndNumber] = useState({ totalPage: 0, numberPage: 0 })
    const imagesListRef = ref(storage, "images/");
    const navigate = useHistory()
    const [product, setProduct] = useState({})
    const [lstCategory, setLstCategory] = useState([]);

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
    }, [])

    useEffect(() => {
        loadData()
        refreshDataCategory()
    }, [imageUrls])

    useEffect(() => {
        setupData(data)
    }, [data])

    const loadData = () => {
        const getData = (data) => {
            if (data) {
                setupData(data)
            }
        }
        callGet(`http://localhost:8080/api/productData/findAll`, getData)
    }

    const refreshDataCategory = () => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ value: p.id, label: p.name }))
            setLstCategory([...arr])
        }
        callGet(`http://localhost:8080/api/category/findAll`, getData)
    }


    const findProductDetailsByIDProduct = (id) => {
        const getData = (data) => {
            setProductDetails(data)
        }
        callGet(`http://localhost:8080/api/productDetail/findAllByProductDataId?id=${id}`, getData)
    }

    const findProduct = (id) => {
        const getData = (data) => {
            setProduct(data)
        }
        callGet(`http://localhost:8080/api/productData/find/${id}`, getData)
    }

    const findMediaByProduct = (id) => {
        const getData = (data) => {
            setLstMediasProduct(data)
        }
        callGet(`http://localhost:8080/api/media/findAllByProductData_Id/${id}`, getData)
    }

    const handleUpdateImages = (imageFiles) => {
        imageFiles.map((item) => {
            uploadImageAsPromise(item.file);
        });
    };
    //Handle waiting to upload each file using promise
    const uploadImageAsPromise = (imageFile) => {
        // return new Promise(function () {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        //Upload file
        uploadBytes(imageRef, imageFile).then((snapshot) => {
            let nameImg = imageFile.name;
            getDownloadURL(snapshot.ref).then((url) => {
                let copy = [...imageUrls, { nameImg, url }];
                const key = "nameImg";
                const arrayUniqueByKey = [
                    ...new Map(copy.map((item) => [item[key], item])).values(),
                ];
                setImageUrls(arrayUniqueByKey);
            });
        });
    };

    const onDetail = (id) => {
        navigate.push(`product-detail/${id}`)
    }

    const setupData = (data) => {
        let fakeData = []
        data.map(p => {
            let images = []
            p.listMediaDTO.map(img => {
                if (imageUrls.length < 1) return
                if (imageUrls.map((image) => image.nameImg).includes(img.url)) {
                    let base = imageUrls.filter((o) => o.nameImg == img.url)
                    images.push({ ...img, file: base[0].url })
                }
            })
            fakeData.push({ id: p.id, name: p.name, quantity: p.quantity, category: p.categoryId, img: images })
        })
        setLstProductData(fakeData)
    }

    const onCreate = () => {
        setIsCreateModal(!isCreateModal);
    };

    const onUpdate = (id) => {
        if (!isUpdateModal) {
            findProduct(id)
            findProductDetailsByIDProduct(id)
            findMediaByProduct(id)
        }
        setIsUpdateModal(!isUpdateModal);
    };

    const onDelete = (id) => {
        setIsDeleteModal(!isDeleteModal);
        if (!isDeleteModal) {
            setProduct({ id: id })
            return
        }
        setProduct({})
    };

    const sortDataAscending = (data) => {
        let newData = [...lstproductData]
        if (!newData?.map(p => p[data])) return
        newData?.sort((a, b) => a[data] > b[data] ? 1 : -1)
        setLstProductData(newData)
    }

    const sortDataGraduallySmaller = (data) => {
        let newData = [...lstproductData]
        if (!newData?.map(p => p[data])) return
        newData?.sort((a, b) => a[data] < b[data] ? 1 : -1)
        setLstProductData(newData)
    }


    const deleteProductData = () => {
        const deletePro = (data) => {
            const deleteProductAllDetailByProductDataId = () => {
                const refresh = () => {
                    loadData()
                    enqueueSnackbar('Delete success', { variant: 'success' })
                    onDelete()
                }
                callPost(`http://localhost:8080/api/productDetail/deleteAllByProductData/${product.id}`, "", refresh)
            }
            callPost(`http://localhost:8080/api/productData/delete/${product.id}?userId=${data.id}`, "", deleteProductAllDetailByProductDataId)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", deletePro)
    }

    // const pageable = async (id) => {
    //     if (id <= 0) {
    //         id = 0
    //     } else if (id >= totalPageAndNumber.totalPage) {
    //         id = totalPageAndNumber.totalPage
    //     }
    //     const getData = (data) => {
    //         setupData(data)
    //     }
    //     callGet(`http://localhost:8080/api/productData/findAll`, getData)
    // }

    return (
        <>
            <Tables
                title={"Product"}
                list={lstproductData}
                colNames={[{ title: "Id", id: "id" }, { title: "name", id: "name" }, { title: "quantity", id: "quantity" }, { title: "category", id: "categoryId" }, { title: "Image" }]}
                // pageable={pageable}
                // totalPage={totalPageAndNumber.totalPage}
                onDetail={onDetail}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                sortDataAscending={sortDataAscending}
                sortDataGraduallySmaller={sortDataGraduallySmaller}
            />
            <CreateProduct
                isCreateModal={isCreateModal}
                toggleModal={onCreate}
                loadData={loadData}
                handleUpdateImages={handleUpdateImages}
                callGet={callGet}
                refreshDataCategory={refreshDataCategory}
                lstCategory={lstCategory}
                enqueueSnackbar={enqueueSnackbar}
            />
            <UpdateProduct
                isUpdateModal={isUpdateModal}
                toggleModal={onUpdate}
                product={product}
                productDetails={productDetails}
                loadData={loadData}
                handleUpdateImages={handleUpdateImages}
                imageUrls={imageUrls}
                lstMediasProduct={lstMediasProduct}
                callGet={callGet}
                refreshDataCategory={refreshDataCategory}
                lstCategory={lstCategory}
                enqueueSnackbar={enqueueSnackbar}
            />
            <Dialog
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth={true}
                open={isDeleteModal}
                onClose={onDelete}
            >
                <DialogTitle id="scroll-dialog-title">Thông báo</DialogTitle>
                <DialogContent>
                    Do you want delete?
                </DialogContent>
                <DialogActions>
                    <Button className={classes.deleteButton} onClick={() => { deleteProductData() }}>Delete</Button>
                    <Button className={classes.cancelButton} onClick={() => onDelete()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Product;