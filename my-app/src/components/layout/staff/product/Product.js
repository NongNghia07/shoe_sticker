import React, { useState, useEffect } from "react";
import axios from "axios";
import useTable from "../../../../customHook/UseTable"
import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import Tables from "../../../../customHook/UseTable";

const Product = (props) => {
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const { data: dataProduct, isLoading } = useCallGetAPI(`http://localhost:8080/api/productData/findAllPage`)
    const [lstproductData, setLstProductData] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [totalPageAndNumber, setTotalPageAndNumber] = useState({ totalPage: 0, numberPage: 0 })

    useEffect(() => {
        if (dataProduct.content) {
            setupData(dataProduct.content)
            setTotalPageAndNumber({ totalPage: dataProduct.totalPages, numberPage: dataProduct.number })
        }
    }, [dataProduct])


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
            const res = await axios.get(`http://localhost:8080/api/productDetail/findAllByProductDataId?id=${1111}`)
            let data = res ? res.data : []
            setProductDetails(data)
        } catch (error) {
            if (error.response) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }

    }

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
            />
            <UpdateProduct
                isUpdateModal={isUpdateModal}
                toggleModal={onUpdate}
                productDetails={productDetails}
                loadData={loadData}
            />
        </>
    )
}

export default Product;