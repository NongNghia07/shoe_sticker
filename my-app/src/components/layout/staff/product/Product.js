import React, { useState, useEffect } from "react";
import axios from "axios";
import useTable from "../../../../customHook/UseTable"
import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import Tables from "../../../../customHook/UseTable";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../../../Firebase";

const Product = (props) => {
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const { data: dataProduct, isLoading } = useCallGetAPI(`http://localhost:8080/api/productData/findAllPage`)
    const [lstproductData, setLstProductData] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [lstMediasProduct, setLstMediasProduct] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [totalPageAndNumber, setTotalPageAndNumber] = useState({ totalPage: 0, numberPage: 0 })
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        if (dataProduct.content) {
            setupData(dataProduct.content)
            setTotalPageAndNumber({ totalPage: dataProduct.totalPages, numberPage: dataProduct.number })
        }
    }, [dataProduct])

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

    const loadData = async () => {
        const res = await axios.get(`http://localhost:8080/api/productData/findAllPage`)
        let data = res ? res.data : []
        if (data.content) {
            setupData(data.content)
            setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
        }
    }

    const findProductDetailsByIDProduct = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/productDetail/findAllByProductDataId?id=${id}`)
            let data = res ? res.data : []
            setProductDetails(data)
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

    const handleUpdateImages = (imageFiles) => {
        console.log(imageFiles);
        imageFiles.map((item) => {
            console.log(item.file);
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

    const setupData = (data) => {
        let fakeData = []
        data.map(p => fakeData.push({ id: p.id, name: p.name, quantity: p.quantity, category: p.categoryId, image: "" }))
        setLstProductData(fakeData)
    }

    const onCreate = () => {
        setIsCreateModal(!isCreateModal);
    };

    const onUpdate = (id) => {
        if (!isUpdateModal) {
            findProductDetailsByIDProduct(id)
            findMediaByProduct(id)
        }
        setIsUpdateModal(!isUpdateModal);
    };

    const onDelete = () => {
        setIsDeleteModal(!isDeleteModal);
    };

    const pageable = async (id) => {
        if (id <= 0) {
            id = 0
        } else if (id >= totalPageAndNumber.totalPage) {
            id = totalPageAndNumber.totalPage
        }
        const res = await axios.get(`http://localhost:8080/api/productData/findAllPage?page=${id}`)
        let data = res ? res.data : []
        setupData(data.content)
        setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
    }


    return (
        <>
            {lstproductData &&
                <Tables
                    title={"Product"}
                    list={lstproductData}
                    colNames={["ID", "Name", "Quantity", "Category", "Image"]}
                    pageable={pageable}
                    totalPage={totalPageAndNumber.totalPage}
                    onCreate={onCreate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            }
            <CreateProduct
                isCreateModal={isCreateModal}
                toggleModal={onCreate}
                loadData={loadData}
                handleUpdateImages={handleUpdateImages}
            />
            <UpdateProduct
                isUpdateModal={isUpdateModal}
                toggleModal={onUpdate}
                productDetails={productDetails}
                loadData={loadData}
                handleUpdateImages={handleUpdateImages}
                imageUrls={imageUrls}
                lstMediasProduct={lstMediasProduct}
            />
        </>
    )
}

export default Product;